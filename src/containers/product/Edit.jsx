import React, { useEffect, useCallback, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setProduct } from "@/modules/redux/ducks/product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faMinus,
  faPlus,
  faTrashXmark,
} from "@fortawesome/pro-solid-svg-icons";
import Calendar from "@COMPONENTS/dashboard/Calendar";
import { showOneButtonPopup } from "@/common/common";
import ImageUpload from "@/components/dashboard/ImageUpload";
import { setFileMultiToServer, setFileToServer } from "@API/dashboardService";
import { updateProduct } from "@API/storeService";
import { updateFileInfo } from "@API/fileService";

const Edit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { authors } = useSelector(({ post }) => post.authorMine);
  const currentProduct = useSelector(({ product }) => product.currentProduct);
  const productTypes = useSelector(({ product }) => product.productTypes);
  const productCategories = useSelector(
    ({ product }) => product.productCategories
  );
  const [name, setName] = useState(currentProduct?.name);
  const [description, setDescription] = useState(currentProduct?.description);
  const [price, setPrice] = useState(currentProduct?.price);
  const [saleRatio, setSaleRatio] = useState(currentProduct?.saleRatio * 100);
  const [selectType, setSelectType] = useState(null);
  const [category, setCategory] = useState(null);
  const [selectTarget, setSelectTarget] = useState(currentProduct?.target);
  const [previewProducts, setPreviewProducts] = useState(null);
  const [selectAge, setSelectAge] = useState(false);
  const [rating, setRating] = useState(null);
  const calendarStartRef = useRef(null);
  const calendarEndRef = useRef(null);
  const saleStartRef = useRef(null);
  const saleEndRef = useRef(null);
  const thumbnailRef = useRef(null);
  const productsRef = useRef(null);

  const targetList = [
    {
      code: "all",
      name: "すべて",
    },
    {
      code: "follower",
      name: "フォロワー",
    },
    {
      code: "indivisual",
      name: "個人",
    },
  ];

  useEffect(() => {
    if (params?.id) {
      dispatch(setProduct(params.id));
    }
  }, [dispatch, params]);

  useEffect(() => {
    if (currentProduct) {
      setSelectType(currentProduct.type);
    }
  }, [currentProduct]);

  useEffect(() => {
    if (currentProduct.rating === "R-18") {
      setSelectAge(true);
    } else {
      setSelectAge(false);
    }
  }, [currentProduct.rating]);

  useEffect(() => {
    if (selectAge) {
      setRating("R-18");
    } else {
      setRating("G");
    }
  }, [selectAge]);

  useEffect(() => {
    const hashs = currentProduct?.images.map((item) => item.hash);
    setPreviewProducts(hashs?.join(","));
  }, [currentProduct.images]);

  const handleCategoryChange = useCallback(
    (code) => {
      const selectCategory = productCategories.find(
        (item) => item.code === code
      );
      setCategory(selectCategory);
    },
    [productCategories]
  );

  const handleClickCalendar = (name, date) => {
    const startDate =
      name === "start" ? date : calendarStartRef.current.getDate();
    const endDate = name === "end" ? date : calendarEndRef.current.getDate();

    if (endDate === undefined) {
      return true;
    }

    if (startDate.getTime() >= endDate.getTime()) {
      showOneButtonPopup(dispatch, "開始日は終了日より大きくできません。");
      return false;
    }

    return true;
  };

  const handleSaleDate = (name, date) => {
    const startDate = name === "start" ? date : saleStartRef.current.getDate();
    const endDate = name === "end" ? date : saleEndRef.current.getDate();

    if (endDate === undefined) {
      return true;
    }

    if (startDate.getTime() >= endDate.getTime()) {
      showOneButtonPopup(dispatch, "開始日は終了日より大きくできません。");
      return false;
    }

    return true;
  };

  const handleSaleRatio = useCallback((value) => {
    if (value <= 100 && value >= 0) {
      setSaleRatio(value);
    } else {
      if (value > 100) {
        setSaleRatio(100);
      } else if (value < 0) {
        setSaleRatio(0);
      }
    }
  }, []);

  const handleUpload = useCallback(async () => {
    // Validate form inputs
    if (!name) {
      console.error("Name is required");
      return;
    }
    if (!category) {
      console.error("Category is required");
      return;
    }
    if (!selectType) {
      console.error("Type is required");
      return;
    }
    if (!description) {
      console.error("Description is required");
      return;
    }
    if (!price) {
      console.error("Price is required");
      return;
    }
    if (!rating) {
      console.error("Rating is required");
      return;
    }
    if (!selectTarget) {
      console.error("Target is required");
      return;
    }

    // Check if there is a thumbnail image
    if (!thumbnailRef.current.getImageFile()) {
      console.error("Thumbnail image is required");
      return;
    }

    // Check if there is at least one product image
    if (!productsRef.current.getImageFile()) {
      console.error("Product image(s) are required");
      return;
    }

    const authorId = authors?.[0]?.id;
    if (!authorId) {
      console.error("Author id not found");
      return;
    }

    try {
      // Create form data for thumbnail
      const thumbnailFD = new FormData();
      thumbnailFD.append("authorId", authorId);
      thumbnailFD.append("type", "image");
      thumbnailFD.append("usage", "thumbnail");
      thumbnailFD.append("loginRequired", false);
      thumbnailFD.append("licenseRequired", false);
      thumbnailFD.append("rating", rating);
      thumbnailFD.append("file", thumbnailRef.current.getImageFile());

      // Create form data for products
      const productFD = new FormData();
      productFD.append("authorId", authorId);
      productFD.append("type", "image");
      productFD.append("usage", "product");
      productFD.append("loginRequired", false);
      productFD.append("licenseRequired", false);
      productFD.append("rating", rating);
      const productFiles = productsRef?.current?.getImageFile();
      productFD.append("files", Object.values(productFiles));

      // Upload thumbnail and product images
      const [thumbnailResp, productResp] = await Promise.all([
        setFileToServer(thumbnailFD),
        setFileMultiToServer(productFD),
      ]);

      if (thumbnailResp?.status === 201 && productResp?.status === 201) {
        const thumbnailHash = thumbnailResp?.data?.hash;
        const mediaHashes = productResp?.data?.hashses;
        const insertProductParams = {
          name,
          thumbnailImage: thumbnailHash,
          description,
          price: Number(price),
          authorId,
          typeId: selectType.id,
          categoryId: category.id,
          status: "enabled",
          target: selectTarget,
          startAt: calendarStartRef.current.getDate(),
          endAt: calendarEndRef.current.getDate(),
          saleStartAt: saleStartRef.current.getDate(),
          saleEndAt: saleEndRef.current.getDate(),
          saleRatio: saleRatio / 100,
          rating,
          mediaHashes,
        };
        const response = await updateProduct(insertProductParams);
        if (response?.status === 201) {
          const productId = response.data?.id;
          await updateFileInfo(thumbnailHash, { productId });
          for await (const hash of mediaHashes) {
            await updateFileInfo(hash, { productId });
          }
          navigate("/dashboard/product");
        }
      }
    } catch (e) {
      console.log(e);
    }
  }, [
    name,
    category,
    selectType,
    description,
    price,
    rating,
    saleRatio,
    authors,
    selectTarget,
    calendarStartRef,
    calendarEndRef,
    saleStartRef,
    saleEndRef,
    thumbnailRef,
    productsRef,
    navigate,
  ]);

  return (
    <>
      {currentProduct && (
        <div className="inr-c">
          <div className="box_area bdn">
            <form action="">
              <section className="bbs_write">
                <div className="hd_titbox">
                  <h2 className="h_tit1">登録</h2>
                </div>

                <div className="col">
                  <h3 className="tit1">タイプ</h3>
                  <div className="lst_txchk">
                    {productTypes.map((item, index) => {
                      return (
                        <label
                          className="inp_txchk"
                          key={`type_${index}`}
                          onClick={() => setSelectType(item)}
                        >
                          <input
                            type="radio"
                            name="radio01"
                            checked={item.code === selectType?.code}
                            readOnly
                          />
                          <span>{item.name}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div className="col">
                  <h3 className="tit1">カテゴリ</h3>
                  <select
                    className="select1 wid1"
                    onChange={(e) => handleCategoryChange(e.target.value)}
                  >
                    {productCategories?.map((item, index) => (
                      <option key={`category_${index}`} value={item?.code}>
                        {item?.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col">
                  <h3 className="tit1">
                    商品名 <span className="i_emp">*</span>
                  </h3>
                  <input
                    type="text"
                    className="inp_txt w100p"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="col">
                  <h3 className="tit1">
                    サムネイル
                    <button type="button" className="btn_help" title="ヘルプ">
                      <FontAwesomeIcon icon={faCircleInfo} />
                    </button>
                  </h3>

                  <ImageUpload
                    ref={thumbnailRef}
                    previewHash={currentProduct?.thumbnailImage}
                    className={"box_drag"}
                    id={"filebox1"}
                    name={"thumbnailImage"}
                    text="ドラッグ＆ドロップ"
                  />
                </div>

                <div className="col">
                  <h3 className="tit1">
                    説明 <span className="i_emp">*</span>
                  </h3>
                  <textarea
                    className="textarea1"
                    onChange={(e) => setDescription(e.target.value)}
                    defaultValue={description}
                  ></textarea>
                </div>

                <div className="col">
                  <h3 className="tit1">価格</h3>
                  <div className="inp_txt sch">
                    <input
                      type="text"
                      className=""
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                    <span className="won">PC</span>
                  </div>
                </div>

                <div className="col">
                  <h3 className="tit1">有料オプション追加</h3>

                  {/*<!-- 리스트 -->*/}
                  <ul className="lst_option_wrap1">
                    <li>
                      <div className="lst_option1">
                        <div className="first">
                          <p className="h1">オプション名</p>
                          <input
                            type="text"
                            className="inp_txt w100p"
                            placeholder="オプション名"
                          />
                        </div>
                        <div className="fx mb0">
                          <p className="h1">オプションの内容</p>
                          <p className="h1">値段</p>
                        </div>
                        <div className="fx">
                          <input
                            type="text"
                            className="inp_txt w100p"
                            placeholder="内容"
                          />
                          <input
                            type="text"
                            className="inp_txt w100p"
                            placeholder="値段"
                          />
                        </div>
                        <div className="fx">
                          <input
                            type="text"
                            className="inp_txt w100p"
                            placeholder="内容"
                          />
                          <input
                            type="text"
                            className="inp_txt w100p"
                            placeholder="値段"
                          />
                          <button
                            type="button"
                            className="btns btn_subtraction"
                          >
                            <span>
                              <FontAwesomeIcon icon={faMinus} />
                            </span>
                          </button>
                        </div>
                        <div className="fx">
                          <input
                            type="text"
                            className="inp_txt w100p"
                            placeholder="内容"
                          />
                          <input
                            type="text"
                            className="inp_txt w100p"
                            placeholder="値段"
                          />
                          <button
                            type="button"
                            className="btns btn_subtraction"
                          >
                            <span>
                              <FontAwesomeIcon icon={faMinus} />
                            </span>
                          </button>
                        </div>
                        <div className="fx">
                          <button
                            type="button"
                            className="btn-pk gray2 n w100p"
                          >
                            <span>
                              <FontAwesomeIcon icon={faPlus} />
                            </span>
                          </button>
                        </div>
                      </div>

                      <button type="button" className="btn_option">
                        <span>
                          <FontAwesomeIcon icon={faTrashXmark} />
                          オプション削除
                        </span>
                      </button>
                    </li>
                    <li>
                      <div className="lst_option1">
                        <div className="first">
                          <p className="h1">オプション名</p>
                          <input
                            type="text"
                            className="inp_txt w100p"
                            placeholder="オプション名"
                          />
                        </div>
                        <div className="fx mb0">
                          <p className="h1">オプションの内容</p>
                          <p className="h1">値段</p>
                        </div>
                        <div className="fx">
                          <input
                            type="text"
                            className="inp_txt w100p"
                            placeholder="内容"
                          />
                          <input
                            type="text"
                            className="inp_txt w100p"
                            placeholder="値段"
                          />
                        </div>
                        <div className="fx">
                          <input
                            type="text"
                            className="inp_txt w100p"
                            placeholder="内容"
                          />
                          <input
                            type="text"
                            className="inp_txt w100p"
                            placeholder="値段"
                          />
                          <button
                            type="button"
                            className="btns btn_subtraction"
                          >
                            <span>
                              <FontAwesomeIcon icon={faMinus} />
                            </span>
                          </button>
                        </div>
                        <div className="fx">
                          <button
                            type="button"
                            className="btn-pk gray2 n w100p"
                          >
                            <span>
                              <FontAwesomeIcon icon={faPlus} />
                            </span>
                          </button>
                        </div>
                      </div>

                      <button type="button" className="btn_option">
                        <span>
                          <FontAwesomeIcon icon={faTrashXmark} />
                          オプション削除
                        </span>
                      </button>
                    </li>
                  </ul>

                  <button type="button" className="btn-pk n blue2 options">
                    <span>
                      <FontAwesomeIcon icon={faPlus} />
                      有料オプション追加
                    </span>
                  </button>
                </div>

                <div className="col">
                  <h3 className="tit1">
                    商品アップロード <span className="i_emp">*</span>
                  </h3>

                  <ImageUpload
                    ref={productsRef}
                    id={"filebox2"}
                    className={"box_drag"}
                    name={"content"}
                    text="ドラッグ＆ドロップ"
                    multiple={true}
                    isProduct={true}
                    previewHash={previewProducts}
                  />
                </div>

                <div className="col">
                  <h3 className="tit1">年齢設定</h3>
                  <label className="inp_chktx">
                    <input
                      type="checkbox"
                      checked={selectAge}
                      onClick={() => setSelectAge(!selectAge)}
                      readOnly
                    />
                    <span>すべての年齢</span>
                  </label>
                </div>

                <div className="col">
                  <h3 className="tit1">販売対象</h3>
                  <div className="lst_txchk">
                    {targetList?.map((item, index) => {
                      return (
                        <label
                          key={`target_${index}`}
                          className="inp_txchk"
                          onClick={() => setSelectTarget(item?.code)}
                        >
                          <input
                            type="radio"
                            name="radio02"
                            checked={item?.code === selectTarget}
                            readOnly
                          />
                          <span>{item?.name}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div className="col">
                  <h3 className="tit1">販売期限</h3>
                  <div className="inp_cal">
                    <div>
                      <label htmlFor="calendar_first1">開始日</label>
                      <Calendar
                        ref={calendarStartRef}
                        name={"start"}
                        callback={handleClickCalendar}
                        type="none"
                        value={new Date(currentProduct?.startAt) || null}
                      />
                    </div>
                    <div>
                      <label htmlFor="calendar_last1">終了日</label>
                      <Calendar
                        ref={calendarEndRef}
                        name={"end"}
                        callback={handleClickCalendar}
                        type="none"
                        value={new Date(currentProduct?.endAt) || null}
                      />
                    </div>
                  </div>
                </div>

                <div className="col">
                  <h3 className="tit1">セール設定</h3>

                  <div className="inp_txt sch mw100">
                    <input
                      type="number"
                      className="ta-c"
                      value={saleRatio}
                      onChange={(e) => handleSaleRatio(e.target.value)}
                    />
                    <span className="won">%</span>
                  </div>
                  <div className="inp_cal">
                    <div>
                      <label htmlFor="calendar_first1">開始日</label>
                      <Calendar
                        ref={saleStartRef}
                        name={"start"}
                        callback={handleSaleDate}
                        type="none"
                        value={new Date(currentProduct?.saleStartAt) || null}
                      />
                    </div>
                    <div>
                      <label htmlFor="calendar_last1">終了日</label>
                      <Calendar
                        ref={saleEndRef}
                        name={"end"}
                        callback={handleSaleDate}
                        type="none"
                        value={new Date(currentProduct?.saleEndAt) || null}
                      />
                    </div>
                  </div>
                </div>
              </section>

              <div className="bbs_write_botm">
                <div>
                  <p className="t_info">
                    当サイトでは、直近５年間の長崎県公報の
                    <br className="view-m" />
                    全文を掲載しています。
                  </p>
                </div>

                <a href="#" className="btn-pk n blue">
                  <span>登録する</span>
                </a>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Edit;
