import {
  getFromDataJson,
  getRatingToChecked,
  initButtonInStatus,
  showOneButtonPopup,
} from "@/common/common";
import Button from "@/components/dashboard/Button";
import Category from "@/components/dashboard/Category";
import ImageUpload from "@/components/dashboard/ImageUpload";
import Input from "@/components/dashboard/Input";
import PreviewSeries from "@/components/dashboard/PreviewSeries";
import Tag from "@/components/dashboard/Tag";
import Textarea from "@/components/dashboard/Textarea";
import ToolTip from "@/components/dashboard/ToolTip";
import Type from "@/components/dashboard/Type";
import { setContainer } from "@/modules/redux/ducks/container";
import {
  initSeriesAction,
  setSeriesAction,
} from "@/modules/redux/ducks/dashboard";
import { showModal } from "@/modules/redux/ducks/modal";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const text = {
  series_management: "シリーズ詳細",
  register_series: "シリーズ登録",
  series_edit: "シリーズ修正",
  post_image: "表紙",
  post_image_tooltip: "表紙として使用する写真を登録してください。",
  timeline: "タイムラインのサムネイル",
  timeline_tooltip: "サムネイルとして使用する写真を登録してください。",
  drag_drop: "ドラッグ＆ドロップ",
  title: "タイトル",
  type: "タイプ",
  category: "カテゴリ",
  setting_tag: "タグ設定",
  setting_tag_tooltip:
    "タグ入力は、老眼鏡アイコンクリックまたはエンタをご利用ください。",
  register: "登録する",
  summary: "説明",
  setting_adult: "年齢設定",
  r_19: "R-19",
  preview: "プレビュー",
  can_not_edit: "編集不可",
  tag_name: "タグ名",
  input_image: "置いてください。",
  select_timeline: "サムネイル選択",
  please_input_cover: "表紙を入力してください。",
  please_input_thumbnail: "サムネイルを入力してください。",
  please_input_title: "タイトルを入力してください。",
  please_input_description: "説明を入力してください。",
  error_title: "お知らせ",
  done_upload: "シリーズ登録しました。",
  not_creator: "クリエーターじゃないんです。",
  preview_share: '共有する',
  preview_surpport: '支援する',
  preview_follow: 'フォロー',
};

export default function DashboardUploadSeries(props) {
  const reduxAuthors = useSelector(({ post }) => post.authorMine?.authors);
  const reduxSeriesUpload = useSelector(
    ({ dashboard }) => dashboard.seriesUpload
  );
  const [stateType, setStateType] = useState(undefined);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const refTitle = useRef();
  const refDescription = useRef();
  const refR19 = useRef();
  const refCoverImage = useRef();
  const refTimelineImage = useRef();
  const refForm = useRef();
  const refTags = useRef();
  const refRegister = useRef();

  //==============================================================================
  // header
  //==============================================================================
  const handleContainer = useCallback(() => {
    const container = {
      headerClass: "header",
      containerClass: "container sub series bg moty1",
      isHeaderShow: true,
      isMenuShow: true,
      headerType: null,
      menuType: "DASHBOARD",
      isDetailView: false,
      backTitle: "シリーズ登録",
      activeMenu: "series",
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
  // handler
  //==============================================================================

  const handleItemClickType = (item) => {
    setStateType(item);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    //필드 확인
    if (refTitle.current.isEmpty()) {
      refTitle.current.setError(text.please_input_title);
      initButtonInStatus(refRegister);
      return;
    }
    if (refDescription.current.isEmpty()) {
      refDescription.current.setError(text.please_input_description);
      initButtonInStatus(refRegister);
      return;
    }
    if (refCoverImage.current.getImageFile() === undefined) {
      refCoverImage.current.setError(text.please_input_cover);
      initButtonInStatus(refRegister);
      return;
    }
    if (refTimelineImage.current.getImageFile() === undefined) {
      refTimelineImage.current.setError(text.please_input_thumbnail);
      initButtonInStatus(refRegister);
      return;
    }

    let json = getFromDataJson(refForm);
    json = {
      ...json,
      fileInfoCoverImage: refCoverImage.current.getImageFile(),
      fileInfoThumbnailImage: refTimelineImage.current.getImageFile(),
      tagIds: refTags.current.getTagsJsonObject(),
      rating: getRatingToChecked(refR19),
      status: "enabled",
      authorId: reduxAuthors[0].id, //author 가 아니면 못옴
    };

    dispatch(setSeriesAction(json));
  };

  const handlePreview = (e) => {
    //필드 확인
    if (refTitle.current.isEmpty()) {
      refTitle.current.setError(text.please_input_title);
      initButtonInStatus(refRegister);
      return;
    }
    if (refDescription.current.isEmpty()) {
      refDescription.current.setError(text.please_input_description);
      initButtonInStatus(refRegister);
      return;
    }
    if (refCoverImage.current.getImageFile() === undefined) {
      refCoverImage.current.setError(text.please_input_cover);
      initButtonInStatus(refRegister);
      return;
    }

    const data = {
      coverImage: refCoverImage.current.getImageInfo()?.preview,
      title: refTitle.current.getValue(),
      likeCount: '0',
      reactionCount: '0',
      description: refDescription.current.getValue(),
      tags:refTags.current.getTagList(),
      author: {
        profileImage: reduxAuthors?.[0]?.profileImage,
        name: reduxAuthors?.[0]?.name,
      }
    };

    dispatch(
      showModal({
        title: text.preview,
        contents: <PreviewSeries data={data} text={text} />,
      })
    );
  };

  //==============================================================================
  // Hook & render
  //==============================================================================

  useLayoutEffect(() => {
    handleContainer();

    //chekc author
    if (!reduxAuthors || reduxAuthors?.length === 0) {
      showOneButtonPopup(dispatch, text.not_creator, () =>
        navigate("/author/register")
      );
    }
  }, []);

  useEffect(() => {
    if (reduxSeriesUpload) {
      initButtonInStatus(refRegister);
      if (reduxSeriesUpload?.status === 201) {
        //success
        showOneButtonPopup(dispatch, text.done_upload, () =>
          navigate("/dashboard/series")
        );
      } else {
        //error 처리
        if (reduxSeriesUpload?.type === "cover") {
          refCoverImage.current.setError(String(reduxSeriesUpload?.data));
        } else if (reduxSeriesUpload?.type === "thumbnail") {
          refTimelineImage.current.setError(String(reduxSeriesUpload?.data));
        } else {
          showOneButtonPopup(dispatch, String(reduxSeriesUpload?.data));
        }
      }
    }

    return () => dispatch(initSeriesAction());
  }, [reduxSeriesUpload]);

  return (
    <div className="contents">
      <div className="inr-c">
        <div className="box_area">
          <form ref={refForm}>
            <section className="bbs_write">
              <div className="hd_titbox hide-m">
                <h2 className="h_tit1">{text.register_series}</h2>
              </div>

              <div className="col">
                <h3 className="tit1">{text.title}</h3>
                <Input
                  ref={refTitle}
                  name="title"
                  type="text"
                  className="inp_txt w100p"
                />
              </div>

              <div className="col type">
                <h3 className="tit1">{text.type}</h3>
                <Type
                  name={"typeId"}
                  className={"select1 wid1"}
                  callback={handleItemClickType}
                />
              </div>

              <div className="col">
                <h3 className="tit1">{text.category}</h3>
                <Category
                  name={"categoryId"}
                  className={"select1 wid1"}
                  typeId={stateType?.id}
                />
              </div>

              <div className="col">
                <h3 className="tit1">{text.setting_adult}</h3>
                <label className="inp_chktx">
                  <input ref={refR19} name="rating" type="checkbox" />
                  <span>{text.r_19}</span>
                </label>
              </div>

              <div className="col">
                <h3 className="tit1">{text.summary}</h3>
                <Textarea
                  ref={refDescription}
                  name="description"
                  id="description"
                  className="textarea1"
                ></Textarea>
              </div>

              <div className="col">
                <h3 className="tit1">
                  {text.setting_tag}{" "}
                  <button type="button" className="btn_help" title="ヘルプ">
                    <ToolTip
                      title={text.setting_tag}
                      text={text.setting_tag_tooltip}
                    />
                  </button>
                </h3>
                <Tag
                  ref={refTags}
                  name={"tagIds"}
                  className={"inp_txt sch"}
                  placeholder={text.tag_name}
                />
              </div>

              <div className="col">
                <h3 className="tit1">
                  {text.post_image}
                  <button type="button" className="btn_help" title="ヘルプ">
                    <ToolTip
                      title={text.post_image}
                      text={text.post_image_tooltip}
                    />
                  </button>
                </h3>
                <ImageUpload
                  ref={refCoverImage}
                  id={"filebox1"}
                  className={"box_drag small"}
                  name={"coverImage"}
                  text={text.drag_drop}
                />
              </div>

              <div className="col">
                <h3 className="tit1">
                  {text.timeline}
                  <button type="button" className="btn_help" title="ヘルプ">
                    <ToolTip
                      title={text.timeline}
                      text={text.timeline_tooltip}
                    />
                  </button>
                </h3>
                <ImageUpload
                  ref={refTimelineImage}
                  id={"filebox2"}
                  className={"box_drag"}
                  name={"thumbnailImage"}
                  text={text.drag_drop}
                />
              </div>
            </section>
          </form>


          <div className="bbs_write_botm">
            <div className="btn-pk n blue2" onClick={handlePreview}>
              <div className="pull_width">
                <span>{text.preview}</span>
              </div>
            </div>
            <Button
              ref={refRegister}
              className={"btn-pk n blue"}
              onClick={handleRegister}
            >
              {text.register}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
