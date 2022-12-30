import {
  useCallback, useEffect, useLayoutEffect, useRef, useState
} from "react";

import {
  getFromDataJson,
  getShowEditor,
  initButtonInStatus,
  showOneButtonPopup
} from "@/common/common";
import Button from "@/components/dashboard/Button";
import Category from "@/components/dashboard/Category";
import ImageUpload from "@/components/dashboard/ImageUpload";
import Input from "@/components/dashboard/Input";
import Tag from "@/components/dashboard/Tag";
import PreviewPost from "@/components/dashboard/PreviewPost";
import ToolTip from "@/components/dashboard/ToolTip";
import Series from "@/components/post/Series";
import Type from "@/components/post/Type";
import { setContainer } from "@/modules/redux/ducks/container";
import { getAuthorMineAction, initPostAction, initSeriesAction, setPostAction, setSeriesAction } from "@/modules/redux/ducks/post";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Dropdown from "@/components/dashboard/Dropdown";
import Textarea from "@/components/dashboard/Textarea";
import DraftEditor from "@/components/post/DraftEditor";
import { getSubscribeTierAuthorIdFromServer } from "@/services/dashboardService";
import moment from "moment/moment";
import { showModal } from "@/modules/redux/ducks/modal";
import { useMemo } from "react";

const text = {
  upload_post: "投稿する",
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
  tag_tooltip: "タグ入力は、老眼鏡アイコンクリックまたはエンタをご利用ください。",
  support_user: "閲覧範囲（支援者）",
  timeline: "タイムラインのサムネイル",
  timeline_tooltip: "投稿のサムネイルです。",
  drag_drop: "ドラッグ＆ドロップ",
  preview: "プレビュー",
  register: "登録する",

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
  please_input_category: "カテゴリを入力してください。",
  error_title: "お知らせ",
  done_upload: "投稿登録しました。",
};

export default function UploadPost(props) {
  const [stateSupportorList, setStateSupportorList] = useState(undefined);
  const [stateType, setStateType] = useState(undefined);
  const [stateSubscribeTier, setStateSubscribeTier] = useState(undefined);
  const reduxAuthors = useSelector(({ post }) => post.authorMine?.authors);
  const reduxSeries = useSelector(({ post }) => post.series);
  const reduxPostUpload = useSelector(({ post }) => post.postUpload);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const refForm = useRef();
  const refType = useRef();
  const refTitle = useRef();
  const refNumber = useRef();
  const refOutline = useRef();
  const refContents = useRef();
  const refEditor = useRef();
  const refThumbnail = useRef();
  const refTags = useRef();
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
      menuType: null,
      isDetailView: true,
      isFooterShow: false,
    };
    dispatch(setContainer(container));
  }, [dispatch]);

  //==============================================================================
  // function
  //==============================================================================
  const getContent = useMemo(() => {
    return ( getShowEditor(stateType) ) ? (
              <DraftEditor ref={refEditor} className="draft_editor_container" placeholder={text.please_input_content}  />
            ) : (
              <ImageUpload
                  ref={refContents}
                  id={"filebox2"}
                  className={"box_drag"}
                  name={"content"}
                  text={text.drag_drop}
                  multiple={true}     
                  />
            )
  }, [stateType]);

  const initType = () => {
    //일회성 포스트
    if (reduxSeries?.id === undefined) {
      refType.current.setDisabled(false);
      //type item click event가 아닌 경우에만
      if (stateType.checked === false) {
        refType.current.setSelectedForEmptySeries();
      }
    } else {
      refType.current.setSelected(reduxSeries.type);
      setStateType(reduxSeries.type);
    }
  };
  
  const getRatingFromSeriesInfo = () => {
    return reduxSeries?.id === undefined ? "G" : reduxSeries?.rating;
  };

  const getTypeId = () => {
    return reduxSeries?.type === undefined ? stateType?.id : reduxSeries?.type.id;
  };

  const getCategoryId = (json) => {
    return json.categoryId === "" ? reduxSeries?.category.id : json.categoryId;
  };

  const setPost = () => {
    let json = getFromDataJson(refForm);
    
    //필드 확인
    if (refTitle.current.isEmpty()) {
      initButtonInStatus(refRegister);
      refTitle.current.setError(text.please_input_title);
      return;
    }

    if( json.categoryId === '' && reduxSeries?.category === undefined ){
      initButtonInStatus(refRegister);
      showOneButtonPopup( dispatch, text.please_input_category );
      return;
    }

    if (refOutline.current.isEmpty()) {
      initButtonInStatus(refRegister);
      refOutline.current.setError(text.please_input_outline);
      return;
    }

    if( getShowEditor(stateType) ){
      //undefined(일회성 post), novel, blog, illust, photo, music  타입
      if( refEditor.current.isEmpty() ){
        initButtonInStatus(refRegister);
        refEditor.current.setError(text.please_input_content);
        return;
      }
    }
    else{
      //webtoon, 타입
      if (refContents.current.getImageFile() === undefined) {
        initButtonInStatus(refRegister);
        refContents.current.setError(text.please_input_content);
        return;
      } else {
        json = {
          ...json,
          fileInfoContent: refContents.current.getImageFile(),
        };
      }
    }

    if (refThumbnail.current.getImageFile() === undefined) {
      initButtonInStatus(refRegister);
      refThumbnail.current.setError(text.please_input_thumbnail);
      return;
    } else {
      json = {
        ...json,
        fileInfoThumbnailImage: refThumbnail.current.getImageFile(),
      };
    }

    json = {
      ...json,
      authorId: reduxAuthors[0].id,
      rating: getRatingFromSeriesInfo(),
      status: 'enabled',
      typeId: getTypeId(),
      tagIds: refTags.current.getTagsJsonObject(),
      categoryId: getCategoryId(json),
      content: getShowEditor(stateType) ? refEditor.current.getContent() : json.content,
      subscribeTierId: stateSubscribeTier?.id,
    };

    console.log('request', json);
     dispatch( setPostAction(json) );
  };
  
  //==============================================================================
  // api
  //==============================================================================
  const getSubscribeTier = async () => {
    let json = {
      authorId: reduxAuthors[0].id
    }
    const {status, data} = await getSubscribeTierAuthorIdFromServer(json);
    console.log('getSubscribeTier', status, data);
    
    if( status === 200 ){
      const list = Array.from(data?.subscribeTiers);
      list.unshift({id: '', name: text.support_user });
      setStateSupportorList(list);
    }
    else{
      showOneButtonPopup(dispatch, data);
    }
  };

  //==============================================================================
  // event
  //==============================================================================
  const handleSeries = useCallback((series) => {
    //series api response 후 
    dispatch( setSeriesAction(series) );
  }, []);

  const handleType = (type) => {
    //type api response 후 
    setStateType( reduxSeries?.type === undefined ? type : reduxSeries?.type );
  };

  const handleClickType = useCallback((type) => {
    //type item click event
    setStateType(type);
  }, []);

  const handleClickItemSubscribeTier = useCallback((item) => {
    //閲覧範囲（支援者） item click event
    setStateSubscribeTier(item);
  }, []);
  
  const handleClickPreview = useCallback((event) => {
     //필드 확인
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

    if( getShowEditor(stateType) ){
      //undefined(일회성 post), novel, blog, illust, photo, music  타입
      if( refEditor.current.isEmpty() ){
        initButtonInStatus(refRegister);
        refEditor.current.setError(text.please_input_content);
        return;
      }
    }
    else{
      //webtoon, 타입
      if (refContents.current.getImageFile() === undefined) {
        initButtonInStatus(refRegister);
        refContents.current.setError(text.please_input_content);
        return;
      } 
    }

    const data = {
      title: refTitle.current.getValue(),
      startAt: moment().format('YYYY/MM/DD HH:mm'),
      outline: refOutline.current.getValue(),
      isEditor: getShowEditor(stateType),
      content: getShowEditor(stateType) ? refEditor.current.getContent() : refContents.current.getImageInfo()?.preview,
      author: {
        profileImage: reduxAuthors?.[0]?.profileImage,
        backgroundImage: reduxAuthors?.[0]?.backgroundImage,
        nickname: reduxAuthors?.[0]?.nickname,
      }
    };

    
    dispatch(
      showModal({
        title: text.preview,
        contents: <PreviewPost data={data} text={text} />,
      })
    );
  }, []);



  const handleClickRegister = (event) => {
    setPost();
  };

  //==============================================================================
  // Hook && render
  //==============================================================================
  useLayoutEffect(() => {
    handleContainer();

    if ( !reduxAuthors || reduxAuthors?.length === 0 ) {
      dispatch( getAuthorMineAction() );
    }

    return () =>  dispatch( initSeriesAction() );
  }, []);

  useEffect(() => {
    if( reduxAuthors ){
      getSubscribeTier();
    }
  }, [reduxAuthors]);

  useEffect(() => {
    if (stateType) {
      initType();
    }
  }, [reduxSeries, stateType]);

  useEffect(() => {
    if (reduxPostUpload) {
      initButtonInStatus(refRegister);
      if( reduxPostUpload?.status === 201 ){
        //success
        showOneButtonPopup(dispatch, text.done_upload, () => navigate("/dashboard/post"));
      }
      else{
        //error 처리
        if( reduxPostUpload?.type === 'content' ){
          if( getShowEditor(stateType) ){ refEditor.current.setError(text.please_input_content); }
          else {   refContents.current.setError(String(reduxPostUpload?.data));  }
        } else if( reduxPostUpload?.type === 'thumbnail' ){
          refThumbnail.current.setError(String(reduxPostUpload?.data));
        } else {
          showOneButtonPopup(dispatch,  String(reduxPostUpload?.data)  );
        }
      }
    }

    return () => dispatch( initPostAction() );
  }, [reduxPostUpload]);

  return (
    <div className="inr-c">
      <div className="box_area bdn">
        <form ref={refForm}>
          <section className="bbs_write">
            <div className="hd_titbox">
              <h2 className="h_tit1">{text.upload_post}</h2>
            </div>
              

            <div className="col series">
              <h3 className="tit1">{text.series}</h3>
              {reduxAuthors && (
                <Series
                  name={"seriesId"}
                  className={"select1 w100"}
                  callback={handleSeries}
                />
              )}
            </div>

            <div className="col">
              <h3 className="tit1">{text.type}</h3>
              <div className="lst_txchk lst_post">
                <Type
                  ref={refType}
                  name={"typeId"}
                  callback={handleType}
                  onClick={handleClickType}
                />
              </div>
            </div>

            <div className="col category">
              <h3 className="tit1">{text.category}</h3>
              <Category
                name={"categoryId"}
                className={"select1 wid1 "}
                typeId={stateType?.id}
                selected={reduxSeries?.category?.id}
                disabled={reduxSeries?.id !== undefined}
                disabledText={reduxSeries?.category?.name}
              />
            </div>

            <div className="col">
              <h3 className="tit1">{text.title}</h3>
              <Input
                ref={refTitle}
                type="text"
                className="inp_txt w100p"
                name={"title"}
              />
            </div>

            <div className="col">
              <h3 className="tit1">{text.episode}</h3>
              <Input
                ref={refNumber}
                type="text"
                className="inp_txt w100p"
                name={"number"}
              />
            </div>

            <div className="col">
              <h3 className="tit1">{text.outline}</h3>
              <Textarea
                  ref={refOutline}
                  name="outline"
                  id="outline"
                  className="textarea1"
                ></Textarea>
            </div>

            <div className="col">
              <h3 className="tit1">
                {text.contents}{" "}
                <button type="button" className="btn_help" title="ヘルプ">
                  <ToolTip title={text.contents} text={text.contents_tooltip} />
                </button>
              </h3>
              {getContent}
            </div>

            <div className="col">
              <h3 className="tit1">
                {text.tag}{" "}
                <button type="button" className="btn_help" title="ヘルプ">
                  <ToolTip title={text.tag} text={text.tag_tooltip} />
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
              <h3 className="tit1">{text.support_user}</h3>
              <Dropdown
                name={"subscribeTierId"}
                className={"fw400"}
                dataList={stateSupportorList}
                handleItemClick={handleClickItemSubscribeTier}/>
            </div>

            <div className="col">
              <h3 className="tit1">
                {text.timeline}{" "}
                <button type="button" className="btn_help" title="ヘルプ">
                  <ToolTip title={text.timeline} text={text.timeline_tooltip} />
                </button>
              </h3>
              <ImageUpload
                ref={refThumbnail}
                name={"thumbnailImage"}
                id={"filebox1"}
                className={"box_drag"}
                text={text.drag_drop}
              />
            </div>


          </section>

          <div className="bbs_write_botm">
            <div className="btn-pk n blue2" onClick={handleClickPreview}>
              <span>{text.preview}</span>
            </div>
            <Button
              ref={refRegister}
              className={"btn-pk n blue"}
              text={text.register}
              onClick={handleClickRegister}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
