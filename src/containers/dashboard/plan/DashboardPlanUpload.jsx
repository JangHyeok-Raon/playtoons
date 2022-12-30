import {
  getFromDataJson,
  getRatingToChecked,
  initButtonInStatus,
  showOneButtonPopup,
} from "@/common/common";
import Button from "@/components/dashboard/Button";
import ImageUpload from "@/components/dashboard/ImageUpload";
import Input from "@/components/dashboard/Input";
import Price from "@/components/dashboard/Price";
import Textarea from "@/components/dashboard/Textarea";
import { setContainer } from "@/modules/redux/ducks/container";
import {
  initSubscribeTierAction,
  initSubscribeTierUploadAction,
  setSubscribeTierAction,
} from "@/modules/redux/ducks/dashboard";
import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const text = {
  add_plan: "支援を追加",
  product_name: "商品名",
  summary: "説明",
  image: "イメージ",
  drag_drop: "ドラッグ＆ドロップ",
  setting_age: "年齢設定",
  r_19: "R-19",
  price: "価格",
  register: "登録する",
  please_input_image: "イメージを入力してください。",
  please_input_product_name: "商品名を入力してください。",
  please_input_description: "説明を入力してください。",
  please_input_price: "価格を入力してください。",
  error_title: "お知らせ",
  done_upload_plan: "支援を追加しました。",
};

export default function DashboardPlanUpload(props) {
  const reduxAuthors = useSelector(({ post }) => post.authorMine?.authors);
  const reduxPlanUpload = useSelector(
    ({ dashboard }) => dashboard.subscribeTiersUpload
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const refForm = useRef();
  const refProductName = useRef();
  const refDescription = useRef();
  const refThumbnailImage = useRef();
  const refRating = useRef();
  const refPrice = useRef();
  const refRegister = useRef();

  //==============================================================================\
  // header
  //==============================================================================\

  const handleContainer = useCallback(() => {
    const container = {
      headerClass: "header",
      containerClass: "container sub series bg moty1",
      isHeaderShow: true,
      isMenuShow: true,
      headerType: null,
      menuType: "DASHBOARD",
      isDetailView: false,
      backTitle: "支援を追加",
      activeMenu: "plan",
      isFooterShow: false,
    };
    dispatch(setContainer(container));
  }, [dispatch]);

  //==============================================================================
  // function
  //==============================================================================

  //==============================================================================
  // api
  //==============================================================================

  //==============================================================================
  // event
  //==============================================================================

  const handleClickRegister = (event) => {
    let json = getFromDataJson(refForm);
    //필드 확인
    if (refProductName.current.isEmpty()) {
      initButtonInStatus(refRegister);
      refProductName.current.setError(text.please_input_product_name);
      return;
    }

    if (refDescription.current.isEmpty()) {
      initButtonInStatus(refRegister);
      refDescription.current.setError(text.please_input_description);
      return;
    }

    if (refThumbnailImage.current.getImageFile() === undefined) {
      initButtonInStatus(refRegister);
      refThumbnailImage.current.setError(text.please_input_image);
      return;
    } else {
      json = {
        ...json,
        fileInfoThumbnailImage: refThumbnailImage.current.getImageFile(),
      };
    }

    if (refPrice.current.isEmpty()) {
      initButtonInStatus(refRegister);
      refPrice.current.setError(text.please_input_price);
      return;
    }

    json = {
      ...json,
      tier: 0,
      authorId: reduxAuthors[0].id,
      status: "enabled",
      price: parseInt(refPrice.current.getValue()),
      // rating: getRatingToChecked(refRating),
    };

    dispatch(setSubscribeTierAction(json));
  };

  //==============================================================================
  // render & hook
  //==============================================================================
  useEffect(() => {
    handleContainer();

    return () => dispatch(initSubscribeTierAction());
  }, []);

  useEffect(() => {
    if (reduxPlanUpload) {
      initButtonInStatus(refRegister);
      if (reduxPlanUpload?.status === 201) {
        //success
        showOneButtonPopup(dispatch, text.done_upload_plan, () =>
          navigate("/dashboard/plan")
        );
      } else {
        //error 처리
        if (reduxPlanUpload?.type === "image") {
          refThumbnailImage.current.setError(String(reduxPlanUpload?.data));
        } else {
          showOneButtonPopup(dispatch, String(reduxPlanUpload?.data));
        }
      }
    }

    return () => dispatch(initSubscribeTierUploadAction());
  }, [reduxPlanUpload]);

  return (
    <div className="contents">
      <div className="inr-c">
        <div className="box_area">
          <section className="bbs_write">
            <div className="hd_titbox hide-m">
              <h2 className="h_tit1">{text.add_plan}</h2>
            </div>

            <form ref={refForm}>
              <div className="col">
                <h3 className="tit1">{text.product_name}</h3>
                <Input
                  ref={refProductName}
                  type="text"
                  name="name"
                  className="inp_txt w100p"
                />
              </div>

              <div className="col">
                <h3 className="tit1">{text.summary}</h3>
                <Textarea
                  ref={refDescription}
                  name="description"
                  id=""
                  className="textarea1"
                ></Textarea>
              </div>

              <div className="col">
                <h3 className="tit1">{text.image}</h3>
                <ImageUpload
                  ref={refThumbnailImage}
                  className={"box_drag half"}
                  id={"filebox1"}
                  name={"thumbnailImage"}
                  text={text.drag_drop}
                />
              </div>

              <div className="col">
                <h3 className="tit1">{text.setting_age}</h3>
                <label className="inp_chktx">
                  <input type="checkbox" ref={refRating} />
                  <span>{text.r_19}</span>
                </label>
              </div>

              <div className="col">
                <h3 className="tit1">{text.price}</h3>
                <Price ref={refPrice} type="text" name="price" className="" />
              </div>
            </form>
          </section>

          <div id="btnReg" className="bbs_write_botm">
            <Button
              ref={refRegister}
              className={"btn-pk n blue"}
              text={text.register}
              onClick={handleClickRegister}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
