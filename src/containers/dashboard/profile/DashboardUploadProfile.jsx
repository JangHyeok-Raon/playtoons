import {
  getFromDataJson,
  getRatingToChecked,
  showOneButtonPopup,
} from "@/common/common";
import Button from "@/components/dashboard/Button";
import ImageUpload from "@/components/dashboard/ImageUpload";
import Input from "@/components/dashboard/Input";
import Tag from "@/components/dashboard/Tag";
import Textarea from "@/components/dashboard/Textarea";
import ToolTip from "@/components/dashboard/ToolTip";
import { setContainer } from "@/modules/redux/ducks/container";
import {
  editProfileAction,
  initProfileAction,
} from "@/modules/redux/ducks/dashboard";
import { getAuthorMineAction } from "@/modules/redux/ducks/post";
import { useCallback, useLayoutEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const text = {
  profile_management: "プロフィル管理",
  nickname: "ニックネーム",
  name: "名前",
  introduction: "紹介",
  register_profile_image: "プロフィル写真登録",
  register_profile_image_message: "プロファイル写真を登録してください。",
  register_cover_image: "カバー写真登録",
  setting_age: "年齢設定",
  setting_tag: "タグ設定",
  setting_tag_message:
    "タグ入力は、老眼鏡アイコンクリックまたはエンタをご利用ください。",
  tag_name: "タグ名",
  description_policy:
    "当サイトでは、直近５年間の長崎県公報の全文を掲載しています。",
  register: "登録する",
  drag_n_drop: "ドラッグ＆ドロップ",
  r_19: "R-19",
  not_creator: "クリエーターじゃないんです。",
  done_modify: "プロフィルを変更しました。",
};

export default function DashboardUploadProfile(props) {
  const reduxProfile = useSelector(({ dashboard }) => dashboard.profile);
  const reduxAuthors = useSelector(({ post }) => post.authorMine?.authors);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const refNickname = useRef();
  const refName = useRef();
  const refDescription = useRef();
  const refBackground = useRef();
  const refProfile = useRef();
  const refTags = useRef();
  const refForm = useRef();
  const refR19 = useRef();
  const refButton = useRef();

  //==============================================================================
  // haeader
  //==============================================================================
  const handleContainer = useCallback(() => {
    const container = {
      headerClass: "header",
      containerClass: "container bg profile",
      isHeaderShow: true,
      isMenuShow: true,
      headerType: null,
      menuType: "DASHBOARD",
      isDetailView: false,
      backTitle: null,
      activeMenu: "profile",
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

  const getAuthorProfile = async () => {
    const params = {
      id: reduxAuthors[0].id,
    };

    dispatch(getAuthorMineAction(params));
  };

  //==============================================================================
  // event
  //==============================================================================

  const handleClickRegister = (event, fnSetButtonStatus) => {
    if (refNickname.current.isEmpty()) {
      refNickname.current.setError("ニックネームが必要です。");
      return;
    }

    if (refName.current.isEmpty()) {
      refName.current.setError("名前が必要です。");
      return;
    }

    if (refDescription.current.isEmpty()) {
      refDescription.current.setError("紹介が必要です。");
      return;
    }

    if (refProfile.current.checkToEmpty()) {
      refProfile.current.setError("プロフィル写真が必要です。");
      return false;
    }

    if (refBackground.current.checkToEmpty()) {
      refBackground.current.setError("カバー写真が必要です。");
      return false;
    }

    //==============================================================================
    // redux test
    //==============================================================================
    refButton.current.setStatus("loading");
    let json = getFromDataJson(refForm);

    json = {
      ...json,
      rating: getRatingToChecked(refR19),
      tagIds: refTags.current.getTagsJsonObject(),
      authorId: reduxAuthors[0].id,
      fileInfoProfile: refProfile.current.getImageFile(),
      fileInfoBackground: refBackground.current.getImageFile(),
    };

    dispatch(editProfileAction(json));
  };

  //==============================================================================
  // Hook & render
  //==============================================================================

  useLayoutEffect(() => {
    handleContainer();

    //chekc author
    if (reduxAuthors && reduxAuthors?.length > 0) {
      //get accounts info
      getAuthorProfile();
    } else {
      showOneButtonPopup(dispatch, text.not_creator, () =>
        navigate("/author/register")
      );
    }
  }, []);

  useLayoutEffect(() => {
    if (reduxProfile) {
      if (reduxProfile?.status === 200) {
        getAuthorProfile();
        showOneButtonPopup(dispatch, text.done_modify);
      } else {
        //error 처리
        if (reduxProfile?.type === "profile") {
          refProfile.current.setError(String(reduxProfile?.data));
        } else if (reduxProfile?.type === "background") {
          refBackground.current.setError(String(reduxProfile?.data));
        } else {
          showOneButtonPopup(dispatch, String(reduxProfile?.data));
        }
      }
      refButton.current.setStatus(undefined);
    }

    return () => dispatch(initProfileAction());
  }, [reduxProfile]);

  return (
    <div className="contents">
      <div className="inr-c">
        <div className="box_area">
          <div className="hd_titbox hd_mst1">
            <h2 className="h_tit1">
              <span>{text.profile_management}</span>
            </h2>
          </div>

          <div className="top_profile">
            <ImageUpload
              className={"bg_file"}
              previewHash={reduxAuthors?.[0]?.backgroundImage}
              id={"filebox1"}
            />

            <ImageUpload
              className={"profile_file"}
              previewHash={reduxAuthors?.[0]?.profileImage}
              id={"filebox2"}
            />
          </div>

          <form ref={refForm}>
            <section className="bbs_write">
              <div className="col">
                <h3 className="tit1">{text.nickname}</h3>
                <Input
                  ref={refNickname}
                  type="text"
                  name="nickname"
                  className="inp_txt w100p"
                  defaultValue={reduxAuthors?.[0]?.nickname}
                />
              </div>

              <div className="col">
                <h3 className="tit1">{text.name}</h3>
                <Input
                  ref={refName}
                  type="text"
                  name="name"
                  className="inp_txt w100p"
                  defaultValue={reduxAuthors?.[0]?.name}
                />
              </div>

              <div className="col">
                <h3 className="tit1">{text.introduction}</h3>
                <Textarea
                  ref={refDescription}
                  name="description"
                  className="textarea1"
                  defaultValue={reduxAuthors?.[0]?.description}
                />
              </div>

              <div className="col">
                <h3 className="tit1">
                  {text.register_profile_image}{" "}
                  <button type="button" className="btn_help" title="ヘルプ">
                    <ToolTip
                      title={text.register_profile_image}
                      text={text.register_profile_image_message}
                    />
                  </button>
                </h3>
                <ImageUpload
                  ref={refProfile}
                  className={"box_drag square"}
                  previewHash={reduxAuthors?.[0]?.profileImage}
                  id={"filebox1"}
                  name={"profileImage"}
                />
              </div>

              <div className="col">
                <h3 className="tit1">{text.register_cover_image}</h3>
                <ImageUpload
                  ref={refBackground}
                  className={"box_drag"}
                  previewHash={reduxAuthors?.[0]?.backgroundImage}
                  id={"filebox2"}
                  name={"backgroundImage"}
                  text={text.drag_n_drop}
                />
              </div>

              <div className="col">
                <h3 className="tit1">{text.setting_age}</h3>
                <label className="inp_chktx">
                  <input type="checkbox" ref={refR19} />
                  <span>{text.r_19}</span>
                </label>
              </div>

              <div className="col">
                <h3 className="tit1">
                  {text.setting_tag}{" "}
                  <button type="button" className="btn_help" title="ヘルプ">
                    <ToolTip
                      title={text.setting_tag}
                      text={text.setting_tag_message}
                    />
                  </button>
                </h3>
                <Tag
                  ref={refTags}
                  name={"tagIds"}
                  className={"inp_txt sch"}
                  list={reduxAuthors?.[0]?.tags}
                  placeholder={text.tag_name}
                />
              </div>

              <div className="col">
                <p className="t_info">
                  {text.description_policy}
                  <br className="view-m" />
                </p>
              </div>
            </section>
          </form>

          <div className="bbs_write_botm">
            <Button
              ref={refButton}
              onClick={handleClickRegister}
              className="btn-pk n blue"
            >
              <span>{text.register}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
