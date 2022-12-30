import { getDateYYYYMMDD, getStatusText, showOneButtonPopup } from "@/common/common";
import Dropdown from "@/components/dashboard/Dropdown";
import EmptyTr from "@/components/dashboard/EmptyTr";
import Image from "@/components/dashboard/Image";
import Pagination from "@/components/dashboard/MyPagination";
import { useWindowSize } from "@/hook/useWindowSize";
import { setContainer } from "@/modules/redux/ducks/container";
import { getTypeAction } from "@/modules/redux/ducks/dashboard";
import { getPostListFromServer } from "@/services/dashboardService";
import {
  faEye,
  faHeart, faPlus
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

const TEXT = {
  post_list: "投稿リスト",
  post: "投稿する",
  number: "番号",
  cover_image: "サムネイル",
  title: "タイトル",
  access_count: "アクセス数",
  good: "いいね",
  date: "掲載日",
  status: "状態",
  count: "回",
  empty_message: "投稿がありません。",
  detail: "詳細",
  register_creator: 'クリエイターとして登録してください。',
  all: 'シリーズすべて',
};


export default function DashboardPostList(props) {
  const [stateData, setStateData] = useState(undefined);
  const [stateTypes, setStateTypes] = useState(undefined);
  const reduxAuthors = useSelector(({ post }) => post?.authorMine?.authors);
  const reduxTypes = useSelector(({ dashboard }) => dashboard.types);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const windows = useWindowSize();
  const params = useParams("page");

  //==============================================================================
  // header
  //==============================================================================
  const handleContainer = useCallback(() => {
    const container = {
      headerClass: "header",
      containerClass: "container post",
      isHeaderShow: true,
      isMenuShow: true,
      headerType: null,
      menuType: "DASHBOARD",
      isDetailView: false,
      activeMenu: "post",
      isFooterShow: false,
    };
    dispatch(setContainer(container));
  }, [dispatch]);

  useEffect(() => {
    handleContainer();
  }, []);
  //==============================================================================
  // function
  //==============================================================================

  const getPostList = async () => {
    const formData = new FormData();
    formData.append("authorId", reduxAuthors[0].id);
    formData.append("page", params.page === undefined ? 1 : params.page);
    if( params.search !== undefined ){
      formData.append("typeId", params.search);
    }
    // params.append("typeId", "");
    // params.append("categoryId", "");
    // params.append("seriesId", "");
    // params.append("issueId", "");
    // params.append("subscribeTierId", "");
    // params.append("keyword", "");
    // params.append("orderKey", "");
    // params.append("order", "");
    // params.append("limit", "");

    const { status, data: result } = await getPostListFromServer(formData);

    if (status === 200) {
      setStateData(result);
    } else {
      //error 처리
      showOneButtonPopup(dispatch, result);
    }
  };

  //==============================================================================
  // event
  //==============================================================================
  const handleClickPost = (event) => {
    if (reduxAuthors === undefined || reduxAuthors.length === 0) {
      showOneButtonPopup(dispatch, TEXT.register_creator);
    } else {
      navigate("/post/upload");
    }
  };

  const handleMoveToDetailPage = (item) => {
    if (windows.width > 960) {
      navigate(`/dashboard/post/detail/${item.id}`);
    }
  };

  const handleItemClickSearch = (item) => {
    navigate(`/dashboard/post/1${item.id === undefined ? '' : '&'+item.id}`);
  };

  //==============================================================================
  // hook & render
  //==============================================================================
  const renderPostListElements = () => {
    if (stateData?.posts.length === 0) {
      return <EmptyTr text={TEXT.empty_message} />;
    }

    return stateData?.posts?.map((item, index) => {
      return (
        <tr key={index} onClick={() => handleMoveToDetailPage(item)}>
          <td className="hide-m">{item.id}</td>
          <td className="td_imgs">
            <div className="cx_thumb post">
              <Image hash={item.thumbnailImage} alt="" params={{ w: 88 }} />
            </div>
          </td>
          <td className="td_subject">{item.title}</td>
          <td className="td_number1">
            <FontAwesomeIcon icon={faEye} className="view-m" />
            {item.viewCount}
            <em className="hide-m"> {TEXT.count}</em>
          </td>
          <td className="td_number2">
            <FontAwesomeIcon icon={faHeart} className="view-m" />
            {item.likeCount}
          </td>
          <td className="td_txt1">
            <span className="view-m">{TEXT.date}：</span>
            {getDateYYYYMMDD(item.startAt, "/")}
          </td>
          <td className="td_txt">
            <span className="view-m">{TEXT.status}</span>
            {getStatusText(item.status)}
          </td>
          <td className="td_btns">
            <Link
              to={`/dashboard/post/detail/${item.id}`}
              className="btn-pk n blue2"
            >
              {TEXT.detail}
            </Link>
          </td>
        </tr>
      );
    });
  };

  useLayoutEffect(() => {
    if( !reduxTypes ){
      dispatch( getTypeAction() );
    }

    if( reduxAuthors ){
      getPostList();
    }
    return () => {
      setStateData(undefined);
    };
  }, [params]);

  useLayoutEffect(() => {
    if(reduxTypes){
      const list = Array.from(reduxTypes?.types);
      list.unshift({id: undefined, name: TEXT.all, code: undefined, iconImage: undefined});
      setStateTypes(list);
    }
  }, [reduxTypes]);

  //header back callback 현재 로케이션 보내느걸로
  return (
    <div className="contents">
      <div className="inr-c">
        <div className="hd_titbox hd_mst1">
          <h2 className="h_tit0">
            <span>{TEXT.post_list}</span>
          </h2>
          <div className="rgh">
            <div onClick={handleClickPost} className="btn-pk n blue2">
              <span><FontAwesomeIcon icon={faPlus} /> {TEXT.post}</span>
            </div>
          </div>
        </div>
        <div className="hd_titbox2">
          <Dropdown
            name={"typeId"}
            className={''}
            dataList={stateTypes} 
            selected={params.search} 
            handleItemClick={handleItemClickSearch}/>
        </div>

        <div className="tbl_basic mtbl_ty1">
          <table className="list">
            <caption>list</caption>
            <colgroup>
              <col className="num" />
              <col className="imgs" />
              <col className="wid3" />
              <col className="wid2" />
              <col className="wid1" />
              <col className="wid1" />
              <col className="wid1" />
              <col className="wid1" />
            </colgroup>
            <thead>
              <tr>
                <th className="hide-m">{TEXT.number}</th>
                <th>{TEXT.cover_image}</th>
                <th>{TEXT.title}</th>
                <th>{TEXT.access_count}</th>
                <th>{TEXT.good}</th>
                <th>{TEXT.date}</th>
                <th>{TEXT.status}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{renderPostListElements()}</tbody>
          </table>
        </div>

        <Pagination
          className={""}
          meta={stateData?.meta}
          callback={(page) => navigate(`/dashboard/post/${page}${params.search === undefined ? '' : '&'+params.search}`)}
        />
      </div>
    </div>
  );
}
