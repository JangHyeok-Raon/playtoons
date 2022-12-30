import {
  getFromDataJson, initButtonInStatus,
  showOneButtonPopup
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
import { editSeriesAction, initSeriesAction } from "@/modules/redux/ducks/dashboard";
import { showModal } from "@/modules/redux/ducks/modal";
import {
  getSeriesDetailFromServer
} from "@/services/dashboardService";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

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
  setting_tag_tooltip: "タグ入力は、老眼鏡アイコンクリックまたはエンタをご利用ください。",
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
  done_edit_series: 'シリーズ修正しました。',
  preview_share: '共有する',
  preview_surpport: '支援する',
  preview_follow: 'フォロー',
};

export default function DashboardEditSeries(props) {
  const [ stateSeries, setStateSeries ] = useState(undefined);
  const [ stateR19, setStateR19 ] = useState(false);
  const reduxSeriesUpload = useSelector(({ dashboard }) => dashboard.seriesUpload);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams("id");
  const refForm = useRef();
  const refTitle = useRef();
  const refDescription = useRef();
  const refTags = useRef();
  const refR19 = useRef();
  const refCoverImage = useRef();
  const refTimeline = useRef();
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
      backTitle: "シリーズ修正",
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
  /**
    series detail 
  * @version 1.0.0
  * @author 2hyunkook
  */
  const getSeriesDetail = async () => {
    const { status, data } = await getSeriesDetailFromServer( {id: params.id} );

    if (status === 200) {
      setStateSeries(data?.series);
      setStateR19(data?.series?.rating === 'R-18');
    } else {
      showOneButtonPopup(dispatch, data);
    }
  };

  //==============================================================================
  // event
  //==============================================================================
  const handleRegister = (e) => {
    let json = getFromDataJson(refForm);

    //필드 확인
    if (refTitle.current.isEmpty()) {
      initButtonInStatus(refRegister);
      refTitle.current.setError(text.please_input_title);
      return;
    }

    if (refDescription.current.isEmpty()) {
      initButtonInStatus(refRegister);
      refDescription.current.setError(text.please_input_description);
      return;
    }

    if (refCoverImage.current.checkToEmpty()) {
      initButtonInStatus(refRegister);
      refCoverImage.current.setError(text.please_input_cover);
      return;
    } else {
      //upload 할 새로운 이미지가 있는지 확인 
      if( refCoverImage.current.getImageFile() === undefined ){
        json = {
          ...json,
          coverImage: stateSeries?.coverImage,
        }
      } else {
        json = {
          ...json,
          fileInfoCoverImage: refCoverImage.current.getImageFile(),
        }
      }
    }
    
    if (refTimeline.current.checkToEmpty()) {
      initButtonInStatus(refRegister);
      refTimeline.current.setError(text.please_input_thumbnail);
      return;
    } else {
      //upload 할 새로운 이미지가 있는지 확인 
      if( refTimeline.current.getImageFile() === undefined ){
        json = {
          ...json,
          thumbnailImage: stateSeries?.thumbnailImage,
        }
      } else {
        json = {
          ...json,
          fileInfoThumbnailImage: refTimeline.current.getImageFile(),
        }
      }
    }

    json = {
      ...json,
      seriesId: params.id,
      rating: stateR19 ? 'R-18' : 'G',
      tagIds: refTags.current.getTagsJsonObject(),
      typeId: stateSeries?.type.id,
    };

    dispatch( editSeriesAction(json) );
  };

  const handlePreview = (e) => {
    dispatch(
      showModal({
        title: text.preview,
        contents: <PreviewSeries data={stateSeries} text={text} />,
      })
    );
  };

  //==============================================================================
  // Hook & render
  //==============================================================================

  useLayoutEffect(() => {
    handleContainer();
    getSeriesDetail();
  }, []);

  useEffect(() => {
    if( reduxSeriesUpload ){
      initButtonInStatus(refRegister);
      if( reduxSeriesUpload?.status === 200 ){
        //success
        showOneButtonPopup( dispatch, text.done_edit_series, () => navigate(`/dashboard/series/detail/${params.id}/1`) );
      }
      else{
        //error 처리
        if( reduxSeriesUpload?.type === 'cover' ){
          refCoverImage.current.setError(String(reduxSeriesUpload?.data));
        } else if( reduxSeriesUpload?.type === 'thumbnail' ){
          refTimeline.current.setError(String(reduxSeriesUpload?.data));
        } else {
          showOneButtonPopup(dispatch,  String(reduxSeriesUpload?.data)  );
        }
      }
    }

    return () => dispatch( initSeriesAction() );
  }, [reduxSeriesUpload]);

  return (
    <div className="contents">
      <div className="inr-c">
        <div className="box_area">
          <section className="bbs_write">
            <div className="hd_titbox hide-m">
              <h2 className="h_tit1">{text.series_edit}</h2>
            </div>

            <form ref={refForm}>
              <div className="col">
                <h3 className="tit1">{text.title}</h3>
                <Input
                  ref={refTitle}
                  name="title"
                  type="text"
                  className="inp_txt w100p"
                  defaultValue={stateSeries?.title}
                />
              </div>

              <div className="col">
                <h3 className="tit1">{text.type}</h3>
                <Type
                  className={"select1 wid1"}
                  selected={stateSeries?.type.id}
                  disabled={true}
                  disabledText={text.can_not_edit}
                />
              </div>

              <div className="col">
                <h3 className="tit1">{text.category}</h3>
                <Category
                  name={"categoryId"}
                  className={"select1 wid1"}
                  typeId={stateSeries?.type.id}
                  selected={stateSeries?.category.id}
                />
              </div>

              <div className="col">
                <h3 className="tit1">{text.setting_adult}</h3>
                <label className="inp_chktx">
                  <input
                    name="rating"
                    type="checkbox"
                    checked={stateR19}
                    onChange={() => setStateR19(!stateR19)}
                  />
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
                  defaultValue={stateSeries?.description}
                />
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
                  list={stateSeries?.tags}
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
                  previewHash={stateSeries?.coverImage}
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
                  ref={refTimeline}
                  id={"filebox2"}
                  className={"box_drag"}
                  name={"thumbnailImage"}
                  text={text.drag_drop}
                  previewHash={stateSeries?.thumbnailImage}
                />
              </div>
            </form>
          </section>

          

          <div className="bbs_write_botm">
            <div className="btn-pk n blue2" onClick={handlePreview}>
              <div className="pull_width">
                <span>{text.preview}</span>
              </div>
            </div>
            <Button
              ref={refRegister}
              className={"btn-pk n blue"}
              text={text.register}
              onClick={handleRegister}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
