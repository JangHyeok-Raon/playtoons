import React, { useState, useCallback, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faPlus } from "@fortawesome/pro-solid-svg-icons";
import {
  getProductType as getProductTypeAPI,
  getProductCategory as getProductCategoryAPI,
  insertProduct,
} from "@API/storeService";
import Calendar from "@COMPONENTS/dashboard/Calendar";
import { showOneButtonPopup } from "@/common/common";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setFileMultiToServer, setFileToServer } from "@API/dashboardService";
import { updateFileInfo } from "@API/fileService";
import { useNavigate } from "react-router-dom";
import ImageUpload from "@/components/dashboard/ImageUpload";

const Upload = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authors } = useSelector(({ post }) => post.authorMine);
  const [typeList, setTypeList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [selectType, setSelectType] = useState(null);
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
  const [selectTarget, setSelectTarget] = useState("all");
  const [selectAge, setSelectAge] = useState(false);
  const [products, setProducts] = useState([]);
  const [productFiles, setProductFiles] = useState([]);
  const handlePreviewDelete = useCallback(
    (id) => {
      setProducts(products.filter((item) => item?.id !== id));
    },
    [products]
  );

  const getProductType = useCallback(async () => {
    const response = await getProductTypeAPI();
    if (response?.status === 200) {
      setTypeList(response.data?.productTypes);
    }
  }, []);

  const getProductCategory = useCallback(async () => {
    const response = await getProductCategoryAPI(selectType?.id);
    if (response?.status === 200) {
      setCategoryList(response.data?.productCategories);
    }
  }, [selectType]);

  useEffect(() => {
    getProductType();
  }, []);

  useEffect(() => {
    if (typeList?.length && selectType === null) {
      setSelectType(typeList[0]);
    }
  }, [typeList, selectType]);

  useEffect(() => {
    if (selectType !== null) {
      getProductCategory();
    }
  }, [selectType]);

  useEffect(() => {
    if (categoryList?.length) {
      setCategory(categoryList[0]);
    }
  }, [categoryList]);

  useEffect(() => {
    if (selectAge) {
      setRating("R-18");
    } else {
      setRating("G");
    }
  }, [selectAge]);

  const [name, setName] = useState("");
  const [category, setCategory] = useState(null);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(null);
  const [rating, setRating] = useState("G");
  const [saleRatio, setSaleRatio] = useState(0);
  const calendarStartRef = useRef(null);
  const calendarEndRef = useRef(null);
  const saleStartRef = useRef(null);
  const saleEndRef = useRef(null);
  const thumbnailRef = useRef(null);
  const productsRef = useRef(null);

  const handleCategoryChange = useCallback(
    (code) => {
      const selectCategory = categoryList.find((item) => item.code === code);
      setCategory(selectCategory);
    },
    [categoryList]
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
    if (value < 100 && value >= 0) {
      setSaleRatio(value);
    } else {
      if (value >= 100) {
        setSaleRatio(99);
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
      Object.values(productFiles).forEach((file) => {
        productFD.append("files[]", file);
      });

      // Upload thumbnail and product images
      const [thumbnailResp, productResp] = await Promise.all([
        setFileToServer(thumbnailFD),
        setFileMultiToServer(productFD),
      ]);

      if (thumbnailResp?.status === 201 && productResp?.status === 201) {
        // Extract thumbnail and product hashes
        const thumbnailHash = thumbnailResp?.data?.hash;
        const mediaHashes = productResp?.data?.hashses;

        // Create params for inserting product
        const insertProductParams = {
          name,
          thumbnailImage: thumbnailHash,
          description,
          price: Number(price),
          authorId,
          typeId: selectType?.id,
          categoryId: category?.id,
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

        // Insert product
        const response = await insertProduct(insertProductParams);
        if (response?.status === 201) {
          const productId = response.data?.id;

          // Update file info for thumbnail and products
          await Promise.all([
            updateFileInfo(thumbnailHash, { productId }),
            ...mediaHashes.map((hash) => updateFileInfo(hash, { productId })),
          ]);
          navigate("/dashboard/product");
        }
      }
    } catch (e) {
      console.error(e);
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
                {typeList.map((item, index) => {
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
                {categoryList?.map((item, index) => (
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
                onChange={(e) => setName(e.target.value)}
                value={name}
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
              ></textarea>
            </div>

            <div className="col">
              <h3 className="tit1">価格</h3>
              <div className="inp_txt sch">
                <input
                  type="number"
                  className=""
                  onChange={(e) => setPrice(e.target.value)}
                />
                <span className="won">PC</span>
              </div>
            </div>

            <div className="col">
              <h3 className="tit1">有料オプション</h3>
              <button type="button" className="btn-pk n blue2">
                <span>
                  <FontAwesomeIcon icon={faPlus} className="mr10" />
                  有料オプション追加
                </span>
              </button>
            </div>

            <div className="col">
              <h3 className="tit1">
                商品アップロード <span className="i_emp">*</span>
              </h3>

              {/*
                  
              <Dropzone
                accept={{
                  "image/jpeg": [],
                  "image/png": [],
                  "image/jpg": [],
                }}
                onDrop={(acceptedFiles) => {
                  handleMediaFiles(acceptedFiles);
                  acceptedFiles.map((file) =>
                    Object.assign(file, {
                      preview: URL.createObjectURL(file),
                    })
                  );
                  setProducts(acceptedFiles);
                }}
              >
                {({ getRootProps, getInputProps }) => (
                  <div className="box_drag" {...getRootProps()}>
                    <input
                      type="file"
                      id="filebox2"
                      multiple={true}
                      {...getInputProps()}
                    />
                    <label htmlFor="filebox2" className="filetxt">
                      <div className="txt">
                        <div className="ico">
                          <FontAwesomeIcon icon={faCirclePlus} />
                        </div>
                        <p className="t">ドラッグ＆ドロップ</p>
                      </div>
                    </label>
                  </div>
                )}
              </Dropzone>
                  */}

              <ImageUpload
                ref={productsRef}
                id={"filebox2"}
                className={"box_drag"}
                name={"content"}
                text="ドラッグ＆ドロップ"
                multiple={true}
                isProduct={true}
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
              {/*
              <button type="button" className="btn-pk n blue2">
                <span>
                  <FontAwesomeIcon icon={faPlus} className="mr10" />
                  販売期限を追加
                </span>
              </button>
              */}
              <div className="inp_cal">
                <div>
                  <label htmlFor="calendar_first1">開始日</label>
                  <Calendar
                    ref={calendarStartRef}
                    name={"start"}
                    className={""}
                    callback={handleClickCalendar}
                    type=""
                    isMaxDate={false}
                  />
                </div>
                <div>
                  <label htmlFor="calendar_last1">終了日</label>
                  <Calendar
                    ref={calendarEndRef}
                    name={"end"}
                    className={""}
                    callback={handleClickCalendar}
                    type=""
                    isMaxDate={false}
                  />
                </div>
              </div>
            </div>

            <div className="col">
              <h3 className="tit1">セール設定</h3>
              {/*
              <button type="button" className="btn-pk n blue2">
                <span>
                  <FontAwesomeIcon icon={faPlus} className="mr10" />
                  セールを追加
                </span>
              </button>
              */}
              <div className="inp_txt sch mw100">
                <input
                  type="number"
                  className="ta-c"
                  onChange={(e) => handleSaleRatio(e.target.value)}
                  value={saleRatio}
                />
                <span className="won">%</span>
              </div>
              <div className="inp_cal">
                <div>
                  <label htmlFor="calendar_first1">開始日</label>
                  <Calendar
                    ref={saleStartRef}
                    name={"start"}
                    className={""}
                    callback={handleSaleDate}
                    type=""
                    isMaxDate={false}
                  />
                </div>
                <div>
                  <label htmlFor="calendar_last1">終了日</label>
                  <Calendar
                    ref={saleEndRef}
                    name={"end"}
                    className={""}
                    callback={handleSaleDate}
                    type=""
                    isMaxDate={false}
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
            <Link to="" className="btn-pk n blue" onClick={handleUpload}>
              <span>登録する</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Upload;
