import SwiperContainer from "@/components/dashboard/SwiperContainer";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { SwiperSlide } from "swiper/react";

import Category from "@/components/dashboard/Category";
import ImageUpload from "@/components/dashboard/ImageUpload";
import Select from "@/components/dashboard/Select";
import Tag from "@/components/dashboard/Tag";
import ToolTip from "@/components/dashboard/ToolTip";
import Type from "@/components/post/Type";

import {
  checkLoginExpired,
  getDateYYYYMMDD,
  getFromDataJson,
  getShowEditor,
  initButtonInStatus,
  showOneButtonPopup,
} from "@/common/common";
import Button from "@/components/dashboard/Button";
import Image from "@/components/dashboard/Image";
import Input from "@/components/dashboard/Input";
import Textarea from "@/components/dashboard/Textarea";
import DraftEditor from "@/components/post/DraftEditor";
import Series from "@/components/post/Series";
import { setContainer } from "@/modules/redux/ducks/container";
import { initPostAction, setPostEditAction } from "@/modules/redux/ducks/post";
import { getTimelineFromServer } from "@/services/dashboardService";
import { getPostIdMineFromServer } from "@/services/postService";
import { showModal } from "@/modules/redux/ducks/modal";
import PreviewPost from "@/components/dashboard/PreviewPost";
import moment from "moment";

const text = {
  must_register_creator:
    "クリエイターとして登録しなければ、ダッシュボードを利用できません。",
  post_edit: "投稿を修正",
  series: "シリーズ",
  type: "タイプ",
  category: "カテゴリ",
  title: "タイトル",
  episode: "話",
  outline: "あらすじ",
  contents: "コンテンツ",
  contents_tooltip: "投稿するコンテンツです。",
  tag: "タグ",
  tag_tooltip:
    "タグ入力は、老眼鏡アイコンクリックまたはエンタをご利用ください。",
  support_user: "閲覧範囲（支援者）",
  timeline: "タイムラインのサムネイル",
  timeline_tooltip: "投稿のサムネイルです。",
  drag_drop: "ドラッグ＆ドロップ",
  edit: "編集",
  select_timeline: "サムネイル選択",
  preview: "プレビュー",
  btn_edit: "修正する",

  tag_name: "タグ名",
  type_webtoon: "ウェブトゥーン",
  type_article: "アーティクル",
  type_movie: "映像",
  label_can_not_edit: "編集不可",
  input_image: "置いてください。",
  please_input_content: "コンテンツを入力してください。",
  please_input_thumbnail: "サムネイルを入力してください。",
  please_input_title: "タイトルを入力してください。",
  please_input_number: "話を入力してください。",
  please_input_outline: "あらすじを入力してください。",
  error_title: "お知らせ",
  login_expired: "自動ログイン時間が過ぎました。",
  dont_edit: "投稿を修正しました。",
};

const supportorList = [
  {
    name: "閲覧範囲（支援者）",
    id: "1",
    checked: true,
  },
  {
    name: "2hyunkook",
    id: "2",
    checked: false,
  },
  {
    name: "yoon",
    id: "3",
    checked: false,
  },
];

export default function PostEdit(props) {
  const [stateData, setStateData] = useState(undefined);
  const [stateSupportorList, setStateSupportorList] = useState(undefined);
  const [stateTimeline, setStateTimeline] = useState(undefined);
  const reduxAuthors = useSelector(({ post }) => post.authorMine?.authors);
  const reduxLoginTime = useSelector(({ login }) => login.loginSuccessTime);
  const reduxPostUpload = useSelector(({ post }) => post.postUpload);
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const refForm = useRef();
  const refTitle = useRef();
  const refNumber = useRef();
  const refOutline = useRef();
  const refContents = useRef();
  const refEditor = useRef();
  const refThumbnailTimeline = useRef();
  const refTag = useRef();
  const refRegister = useRef();

  //==============================================================================
  // header
  //==============================================================================
  const handleContainer = useCallback(() => {
    const container = {
      headerClass: "header ty1",
      containerClass: "container sub post",
      isHeaderShow: true,
      isMenuShow: false,
      headerType: "postUpload",
      menuType: "DASHBOARD",
      isDetailView: true,
      isFooterShow: false,
    };
    dispatch(setContainer(container));
  }, [dispatch]);

  //==============================================================================
  // function
  //==============================================================================

  const editPost = () => {
    //필드 확인
    let json = getFromDataJson(refForm);
    if (refTitle.current.isEmpty()) {
      initButtonInStatus(refRegister);
      refTitle.current.setError(text.please_input_title);
      return;
    }

    if (refOutline.current.isEmpty()) {
      initButtonInStatus(refRegister);
      refOutline.current.setError(text.please_input_outline);
      return;
    }

    if (getShowEditor(stateData.type)) {
      //type -> novel
      if (refEditor.current.isEmpty()) {
        initButtonInStatus(refRegister);
        refEditor.current.setError(text.please_input_content);
        return;
      } else {
        json = {
          ...json,
          content: refEditor.current.getContent(),
        };
      }
    } else {
      //type -> webtoon, illust, blog, photo, music
      if (refContents.current.checkToEmpty()) {
        initButtonInStatus(refRegister);
        refContents.current.setError(text.please_input_content);
        return;
      } else {
        //upload 할 이미지가 있는지 확인
        if (refContents.current.getImageFile() === undefined) {
          json = {
            ...json,
            content: stateData.content,
          };
        } else {
          json = {
            ...json,
            fileInfoContent: refContents.current.getImageFile(),
          };
        }
      }
    }

    if (refThumbnailTimeline.current.checkToEmpty()) {
      initButtonInStatus(refRegister);
      refThumbnailTimeline.current.setError(text.please_input_thumbnail);
      return;
    } else {
      //upload 할 이미지가 있는지 확인
      if (refThumbnailTimeline.current.getImageFile() === undefined) {
        //thumbail에서 선택했는지 확인
        json = {
          ...json,
          thumbnailImage:
            refThumbnailTimeline.current.getImageInfo().value === undefined
              ? stateData.thumbnailImage
              : refThumbnailTimeline.current.getImageInfo().value,
        };
      } else {
        json = {
          ...json,
          fileInfoThumbnailImage: refThumbnailTimeline.current.getImageFile(),
        };
      }
    }

    json = {
      ...json,
      postId: params.id,
      typeId: stateData?.type?.id,
      tagIds: refTag.current.getTagsJsonObject(),
      categoryId:
        json.categoryId === "" ? stateData?.category?.id : json.categoryId,
      rating: stateData?.rating,
      // subscribeTierId: '',
    };

    dispatch(setPostEditAction(json));
  };

  //==============================================================================
  // api
  //==============================================================================
  const getPostDetail = async () => {
    const { status, data } = await getPostIdMineFromServer(params);

    if (status === 200) {
      setStateData(data?.post);
    } else {
      showOneButtonPopup(dispatch, status + data);
    }
  };

  const getTimeline = async () => {
    const params = new FormData();
    params.append("authorId", reduxAuthors[0].id);
    params.append("reduced", true);

    const { status, data } = await getTimelineFromServer(params);

    if (status === 200) {
      setStateTimeline(data);
    } else {
      showOneButtonPopup(dispatch, data);
    }
  };
  //==============================================================================
  // event
  //==============================================================================

  const handleClickItemTimeline = (item) => {
    refThumbnailTimeline.current.setThumbnailImage(item?.thumbnailImage);
  };

  const handleClickPreview = (event) => {
    const data = {
      title: stateData?.title,
      startAt: moment(stateData?.startAt).format("YYYY/MM/DD HH:mm"),
      outline: stateData?.outline,
      isEditor: getShowEditor(stateData?.type),
      content: getShowEditor(stateData?.type)
        ? stateData?.content
        : stateData?.content.split(","),
      author: {
        profileImage: stateData?.author?.profileImage,
        backgroundImage: stateData?.author?.backgroundImage,
        nickname: stateData?.author?.nickname,
      },
    };

    dispatch(
      showModal({
        title: text.preview,
        contents: <PreviewPost data={data} text={text} />,
      })
    );
  };

  const handleClickRegister = () => {
    editPost();
  };

  //==============================================================================
  // Hook & render
  //==============================================================================

  const renderTimelineElements = useMemo(() => {
    return stateTimeline?.posts?.map((item, index) => {
      return (
        <SwiperSlide
          key={index}
          className="cx swiper-slide"
          onClick={() => handleClickItemTimeline(item)}
        >
          <div>
            <div className="cx_thumb">
              {item !== undefined && (
                <span>
                  <Image hash={item.thumbnailImage} />
                </span>
              )}
            </div>
          </div>
        </SwiperSlide>
      );
    });
  }, [stateTimeline]);

  useLayoutEffect(() => {
    handleContainer();

    //check login expire time
    if (
      checkLoginExpired(navigate, dispatch, text.login_expired, reduxLoginTime)
    ) {
      //check author
      if (reduxAuthors && reduxAuthors?.length > 0) {
        getPostDetail();
        getTimeline();

        //temp
        setStateSupportorList(supportorList);
      } else {
        showOneButtonPopup(dispatch, text.must_register_creator, () =>
          navigate("/author/register")
        );
      }
    }
  }, []);

  useEffect(() => {
    if (stateData) {
      if (refEditor !== undefined && getShowEditor(stateData?.type)) {
        refEditor.current.setContent(stateData?.content);
      }
    }
  }, [stateData]);

  useEffect(() => {
    if (reduxPostUpload) {
      initButtonInStatus(refRegister);
      if (reduxPostUpload?.status === 200) {
        //success
        showOneButtonPopup(dispatch, text.dont_edit, () =>
          navigate(`/dashboard/post/detail/${params.id}`)
        );
      } else {
        //error 처리
        if (reduxPostUpload?.type === "content") {
          if (getShowEditor(stateData?.type)) {
            refEditor.current.setError(text.please_input_content);
          } else {
            refContents.current.setError(String(reduxPostUpload?.data));
          }
        } else if (reduxPostUpload?.type === "thumbnail") {
          refThumbnailTimeline.current.setError(String(reduxPostUpload?.data));
        } else {
          showOneButtonPopup(dispatch, String(reduxPostUpload?.data));
        }
      }
    }

    return () => dispatch(initPostAction());
  }, [reduxPostUpload]);

  return (
    <div className="inr-c">
      <div className="box_area bdn">
        <form ref={refForm}>
          <section className="bbs_write">
            <div className="hd_titbox">
              <h2 className="h_tit1">{text.post_edit}</h2>
            </div>

            <div className="col">
              <h3 className="tit1">{text.series}</h3>
              <Series
                name={"seriesId"}
                className={"select1 w100"}
                selected={stateData?.seriesId}
                disabled={true}
                disabledText={stateData?.series?.title}
              />
            </div>

            <div className="col">
              <h3 className="tit1">{text.type}</h3>
              <div className="lst_txchk">
                <Type
                  name={"typeId"}
                  selected={stateData?.typeId}
                  disabled={true} //2022.10.19 edit일때는 type이 변경되면 안된다.
                />
              </div>
            </div>

            <div className="col">
              <h3 className="tit1">{text.category}</h3>
              <Category
                name={"categoryId"}
                className={"select1 wid1 "}
                typeId={stateData?.type?.id}
                selected={stateData?.categoryId}
                disabled={stateData?.seriesId !== null}
                disabledText={stateData?.category?.name}
              />
            </div>

            <div className="col">
              <h3 className="tit1">{text.title}</h3>
              <Input
                ref={refTitle}
                type="text"
                className="inp_txt w100p"
                name={"title"}
                defaultValue={stateData?.title}
              />
            </div>

            <div className="col">
              <h3 className="tit1">{text.episode}</h3>
              <Input
                ref={refNumber}
                type="text"
                className="inp_txt w100p"
                name={"number"}
                defaultValue={stateData?.number}
              />
            </div>

            <div className="col">
              <h3 className="tit1">{text.outline}</h3>
              <Textarea
                ref={refOutline}
                name="outline"
                id="outline"
                className="textarea1"
                defaultValue={stateData?.outline}
              ></Textarea>
            </div>

            <div className="col">
              <h3 className="tit1">
                {text.contents}{" "}
                <button type="button" className="btn_help" title="ヘルプ">
                  <ToolTip title={text.contents} text={text.contents_tooltip} />
                </button>
              </h3>
              {getShowEditor(stateData?.type) ? (
                <DraftEditor
                  ref={refEditor}
                  className="draft_editor_container"
                  placeholder={text.please_input_content}
                />
              ) : (
                <ImageUpload
                  ref={refContents}
                  id={"filebox2"}
                  className={"box_drag"}
                  name={"content"}
                  text={text.drag_drop}
                  previewHash={stateData?.content}
                  multiple={true}
                />
              )}
            </div>

            <div className="col">
              <h3 className="tit1">
                {text.tag}{" "}
                <button type="button" className="btn_help" title="ヘルプ">
                  <ToolTip title={text.tag} text={text.tag_tooltip} />
                </button>
              </h3>
              <Tag
                ref={refTag}
                name={"tagIds"}
                className={"inp_txt sch"}
                list={stateData?.tags}
                placeholder={text.tag_name}
              />
            </div>

            <div className="col">
              <h3 className="tit1">{text.support_user}</h3>
              <Select
                name={""}
                className={"select1 wid1"}
                dataList={stateSupportorList}
              />
            </div>

            <div className="col">
              <h3 className="tit1">
                {text.timeline}{" "}
                <button type="button" className="btn_help" title="ヘルプ">
                  <ToolTip title={text.timeline} text={text.timeline_tooltip} />
                </button>
              </h3>
              <ImageUpload
                ref={refThumbnailTimeline}
                id={"filebox1"}
                name={"thumbnailImage"}
                className={"box_drag"}
                renderType={"thumbnail"}
                previewHash={stateData?.thumbnailImage}
                text={text.drag_drop}
                textEdit={text.edit}
              />
            </div>

            <div className="col">
              <h3 className="tit1">{text.select_timeline}</h3>
              <div className="lst_comic2 pd1">
                <SwiperContainer
                  className={"mySwiper2"}
                  buttonClassName={"my1 hide-m"}
                  slidesPerView={4}
                  breakpoints={{
                    0: {
                      slidesPerView: 4.3,
                      spaceBetween: 12,
                    },
                    960: {
                      slidesPerView: 5,
                      spaceBetween: 12,
                    },
                    1400: {
                      slidesPerView: 6,
                      spaceBetween: 16,
                    },
                  }}
                  list={renderTimelineElements}
                />
              </div>
            </div>
          </section>

          <div className="bbs_write_botm">
            <div className="btn-pk n blue2" onClick={handleClickPreview}>
              <span>{text.preview}</span>
            </div>
            <Button
              ref={refRegister}
              className={"btn-pk n blue"}
              text={text.btn_edit}
              onClick={handleClickRegister}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
