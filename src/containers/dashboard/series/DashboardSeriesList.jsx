import { getDateYYYYMMDD, getStatusText, handleClickStopPropagation, showOneButtonPopup, showTwoButtonPopup } from "@/common/common";
import EmptyTr from "@/components/dashboard/EmptyTr";
import Image from "@/components/dashboard/Image";
import Pagination from "@/components/dashboard/MyPagination";
import { useWindowSize } from "@/hook/useWindowSize";
import { setContainer } from "@/modules/redux/ducks/container";
import { deleteSeriesToServer, getSeriesStoryList } from "@/services/dashboardService";
import { faPlus } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

const TEXT = {
  page_title: "シリーズリスト",
  add_series: "シリーズを追加",
  number: "番号",
  post_image: "表紙",
  title: "タイトル",
  type: "タイプ",
  category: "カテゴリ",
  date: "掲載日",
  status: "状態",
  detail: "詳細",
  modify: "修正",
  delete: "削除",
  empty_message: "シリーズが登録されてないです。",
  delete_series: "シリーズを削除しましょうか？",
  do_delete_series: "シリーズが削除しまた。",
};

export default function DashboardSeries() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const param = useParams("page");
  const windowSize = useWindowSize();
  const [stateData, setStateData] = useState(undefined);
  const myAuthors = useSelector(({ post }) => post?.authorMine?.authors);

  //==============================================================================
  // header
  //==============================================================================

  const handleContainer = useCallback(() => {
    const container = {
      headerClass: "header",
      containerClass: "container series",
      isHeaderShow: true,
      isMenuShow: true,
      headerType: null,
      menuType: "DASHBOARD",
      isDetailView: false,
      activeMenu: "series",
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


  //==============================================================================
  // api
  //==============================================================================

  /**
     시리즈 목록을 가져온다.
  * @version 1.0.0
  * @author 2hyunkook
  */
  const getSeriesListFromServer = async (pageNumber) => {
    const params = new FormData();
    params.append("authorId", myAuthors[0].id);
    params.append("page", pageNumber);

    const { status, data } = await getSeriesStoryList(params);
    if (status === 200) {
      setStateData(data);
    } else {
      //error 처리
      showOneButtonPopup(dispatch, data);
    }
  };


  const deleteSeries = async (item) => {
    const {status, data} = await deleteSeriesToServer(item);
    
    if( status === 200 ){
      getSeriesListFromServer(1);
      showOneButtonPopup(dispatch, TEXT.do_delete_series);
    }
    else{
      showOneButtonPopup(dispatch, data);
    }
    
  };
  //==============================================================================
  // event
  //==============================================================================

  const handleMoveDetailPage = (e, item) => {
    if (windowSize.width > 960) {
      navigate(`/dashboard/series/detail/${item.id}/1`);
    }

    return false;
  };

  /**
     삭제 event
  * @version 1.0.0
  * @author 2hyunkook
  */
  const handleItemClick = (e, item) => {
    e.stopPropagation();
    showTwoButtonPopup( dispatch, TEXT.delete_series, () => deleteSeries(item));
  };

  //==============================================================================
  // hook && render
  //==============================================================================
  /**
     시리즈 리스트 dom 생성
  * @version 1.0.0
  * @author 2hyunkook
  */
  const renderSeriesList = () => {
    if (stateData?.series.length === 0) {
      return <EmptyTr text={TEXT.empty_message} />;
    }

    return stateData?.series.map((item, index) => {
      return (
        <tr key={index} onClick={(e) => handleMoveDetailPage(e, item)}>
          <td className="hide-m">{item.id}</td>
          <td className="td_imgs">
            <div className="cx_thumb series">
              <span>
                <Image hash={item.coverImage} alt={""} params={{w: 88}} />
              </span>
            </div>
          </td>
          <td className="td_subject">{item.title}</td>
          <td className="td_group c-blue">{item.type?.name}</td>
          <td className="td_gray">
            <span className="view-m">{TEXT.category}：</span>
            {item.category?.name}
          </td>
          <td>
            <span className="view-m">{TEXT.date}：</span>
            {getDateYYYYMMDD(item.startAt, '/')}
          </td>
          <td className="td_txt">
            <span className="view-m">{TEXT.status}</span>
            {getStatusText(item.status)}
          </td>
          {/* series_btns custom.css mobile에서 강제적으로 top, border 없앴음. */}
          <td className="td_btns2 ty1 series_btns">

            <Link
              className="btn-pk s blue2"
              to={`/dashboard/series/detail/${item.id}/1`}
              onClick={handleClickStopPropagation}
            >
              {TEXT.detail}
            </Link>
            <Link
              className="btn-pk s blue2"
              to={`/dashboard/series/edit/${item.id}`}
              onClick={handleClickStopPropagation}
            >
              {TEXT.modify}
            </Link>
            <div
              className="btn-pk s blue2"
              data-id={item.id}
              onClick={(e) => handleItemClick(e, item)}
            >
              {TEXT.delete}
            </div>
          </td>
        </tr>
      );
    });
  };

  useLayoutEffect(() => {
    getSeriesListFromServer(param?.page === undefined ? 1 : param?.page);

    return () => setStateData(undefined);
  }, [param]);

  return (
    <div className="contents">
      <div className="inr-c">
        <div className="hd_titbox hd_mst1">
          <h2 className="h_tit0">
            <span>{TEXT.page_title}</span>
          </h2>
          <div className="rgh">
            <Link to={"/dashboard/series/upload"} className="btn-pk n blue2">
              <span>
                <FontAwesomeIcon icon={faPlus} /> {TEXT.add_series}
              </span>
            </Link>
          </div>
        </div>

        <div className="tbl_basic mtbl_ty1">
          <table className="list">
            <caption>list</caption>
            <colgroup>
              <col className="num" />
              <col className="imgs" />
              <col className="wid3" />
              <col className="wid1" />
              <col className="wid2" />
              <col className="wid1" />
              <col className="wid1" />
              <col className="wid1" />
            </colgroup>
            <thead>
              <tr>
                <th className="hide-m">{TEXT.number}</th>
                <th>{TEXT.post_image}</th>
                <th>{TEXT.title}</th>
                <th>{TEXT.type}</th>
                <th>{TEXT.category}</th>
                <th>{TEXT.date}</th>
                <th>{TEXT.status}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{renderSeriesList()}</tbody>
          </table>
        </div>

        <Pagination
          className={""}
          meta={stateData?.meta}
          callback={(page) => navigate(`/dashboard/series/${page}`)}
        />
      </div>
    </div>
  );
}
