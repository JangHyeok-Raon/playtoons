import {
  getFromDataJson, initButtonInStatus,
  showOneButtonPopup
} from "@/common/common";
import Button from "@/components/dashboard/Button";
import ImageUpload from "@/components/dashboard/ImageUpload";
import Input from "@/components/dashboard/Input";
import Price from "@/components/dashboard/Price";
import Textarea from "@/components/dashboard/Textarea";
import { setContainer } from "@/modules/redux/ducks/container";
import { editSubscribeTierAction, initSubscribeTierAction, initSubscribeTierUploadAction } from "@/modules/redux/ducks/dashboard";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const text = {
  edit_plan: "支援を編集する",
  product_name: "商品名",
  summary: "説明",
  image: "イメージ",
  drag_drop: "ドラッグ＆ドロップ",
  setting_age: "年齢設定",
  r_19: "R-19",
  price: "価格",
  register: "登録する",
  description_next_month: "(既存支援者には翌月から反映されます。)",
  please_input_image: "イメージを入力してください。",
  please_input_product_name: "商品名を入力してください。",
  please_input_description: "説明を入力してください。",
  please_input_price: "価格を入力してください。",
  error_title: "お知らせ",
  done_edit_plan: '支援を編集しました。',
};

export default function DashboardPlanEdit(props) {
  const [stateData, setStateData] = useState(undefined);
  const reduxSubscribeTiers = useSelector(({ dashboard }) => dashboard.subscribeTiers);
  const reduxPlanUpload = useSelector(({ dashboard }) => dashboard.subscribeTiersUpload);
  const reduxAuthors = useSelector(({ post }) => post.authorMine?.authors);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const refForm = useRef();
  const refProductName = useRef();
  const refDescription = useRef();
  const refImage = useRef();
  const refRating = useRef();
  const refPrice = useRef();
  const refRegister = useRef();

  const handleContainer = useCallback(() => {
    const header = {
      headerClass: "header",
      containerClass: "container sub series bg moty1",
      isHeaderShow: true,
      isMenuShow: true,
      headerType: null,
      menuType: "DASHBOARD",
      isDetailView: false,
      backTitle: "支援を編集する",
      activeMenu: "plan",
      isFooterShow: false,
    };
    dispatch(setContainer(header));
  }, [dispatch]);

  useEffect(() => {
    handleContainer();
  }, []);

  //==============================================================================
  // function
  //==============================================================================
  const setChckecToRating = () => {
    return stateData?.rating === "G" ? true : false;
  };

  const findPlan = () => {
    for (let i = 0; i < reduxSubscribeTiers?.length; i++) {
      if (reduxSubscribeTiers[i].id === params.id) {
        setStateData(reduxSubscribeTiers[i]);
        break;
      }
    }
  };

  //==============================================================================
  // api
  //==============================================================================

  //==============================================================================
  // event
  //==============================================================================

  const handleClickRegister = (event) => {
    // //thumbnail 업로드, plan update
    // //upload 할 이미지가 없다면
    // if (refImage.current.getImageFile() === undefined) {
    //   callbackImage();
    // } else {
    //   //이미지 업로드 후 image url
    //   setImageToServer(refImage, "cover");
    // }
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

    if (refImage.current.checkToEmpty()) {
      initButtonInStatus(refRegister);
      refImage.current.setError(text.please_input_image);
      return;
    } else{
      //upload 할 파일이 있는지 확인 
      if( refImage.current.getImageFile() === undefined ){
        json = {
          ...json,
          thumbnailImage: stateData.thumbnailImage,
        };
      } else {
        json = {
          ...json,
          fileInfoThumbnailImage: refImage.current.getImageFile(),
        };
      }
    }

    if (refPrice.current.isEmpty()) {
      initButtonInStatus(refRegister);
      refPrice.current.setError(text.please_input_price);
      return;
    }
    
    json = {
      ...json,
      authorId: reduxAuthors[0].id,
      price: parseInt(json.price),
      subscribeTierId: params.id,
    };

    dispatch( editSubscribeTierAction(json) );
  };

  //==============================================================================
  // Hook & render
  //==============================================================================

  useLayoutEffect(() => {
    findPlan();

    return () => dispatch( initSubscribeTierAction() );
  }, []);

  useEffect(() => {
    if( reduxPlanUpload ){
      initButtonInStatus(refRegister);
      if( reduxPlanUpload?.status === 200 ){
        //success
        showOneButtonPopup(dispatch, text.done_edit_plan, () => navigate("/dashboard/plan"));
      }
      else{
        //error 처리
        if( reduxPlanUpload?.type === 'image' ){
          refImage.current.setError(String(reduxPlanUpload?.data));
        } else {
          showOneButtonPopup(dispatch,  String(reduxPlanUpload?.data)  );
        }
      }
    }
    
    return () => dispatch( initSubscribeTierUploadAction() );
  }, [reduxPlanUpload]);

  return (
    <div className="contents">
      <div className="inr-c">
        <div className="box_area">
          <section className="bbs_write">
            <div className="hd_titbox hide-m">
              <h2 className="h_tit1">{text.edit_plan}</h2>
            </div>

            <form ref={refForm}>
              <div className="col">
                <h3 className="tit1">{text.product_name}</h3>
                <Input
                  ref={refProductName}
                  type="text"
                  name="name"
                  className="inp_txt w100p"
                  defaultValue={stateData?.name}
                />
              </div>

              <div className="col">
                <h3 className="tit1">{text.summary}</h3>
                <Textarea
                  ref={refDescription}
                  name="description"
                  className="textarea1"
                  defaultValue={stateData?.description}
                ></Textarea>
              </div>

              <div className="col">
                <h3 className="tit1">{text.image}</h3>
                <ImageUpload
                  ref={refImage}
                  className={"box_drag half"}
                  previewHash={stateData?.thumbnailImage}
                  id={"filebox1"}
                  name={"thumbnailImage"}
                  text={text.drag_drop}
                />
              </div>

              <div className="col">
                <h3 className="tit1">
                  {text.setting_age}{" "}
                  <span className="plan_desc">
                    {text.description_next_month}
                  </span>
                </h3>
                <label className="inp_chktx">
                  <input
                    ref={refRating}
                    type="checkbox"
                    defaultChecked={setChckecToRating}
                  />
                  <span>{text.r_19}</span>
                </label>
              </div>

              <div className="col">
                <h3 className="tit1">
                  {text.price}{" "}
                  <span className="plan_desc">
                    {text.description_next_month}
                  </span>
                </h3>
                <Price
                  ref={refPrice}
                  type="text"
                  className=""
                  name="price"
                  defaultValue={stateData?.price}
                />
              </div>
            </form>
          </section>

          <div id="btn" className="bbs_write_botm">
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
