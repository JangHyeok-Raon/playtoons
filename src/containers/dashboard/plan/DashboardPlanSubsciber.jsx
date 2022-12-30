import React, { useEffect, useState, useCallback, useLayoutEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import tempProfile from "@IMAGES/img_profile.png";
import { faMagnifyingGlass } from "@fortawesome/pro-light-svg-icons";
import Pagination from "@/components/dashboard/MyPagination";
import { useDispatch, useSelector } from "react-redux";
import { setContainer } from "@/modules/redux/ducks/container";
import { getDateYYYYMMDD, showOneButtonPopup } from "@/common/common";
import { getSubscribeTierInPlanFromServer } from "@/services/dashboardService";
import EmptyTr from "@/components/dashboard/EmptyTr";
import Input from "@/components/dashboard/Input";
import Search from "@/components/dashboard/Search";
import { useNavigate, useParams } from "react-router-dom";

const text = {
  plan_management: "支援管理",
  subcriber_management: "支援者管理",
  subcriber_nickname: "支援者のニックネーム",
  number: "番号",
  profile: "プロフィール",
  nickname: "ニックネーム",
  plan: "プラン",
  date: "プラン開始日",
  supportor_empty: "支援者がいません。",
};


export default function DashboardPlanSubsciber(props) {
  const [stateData, setStateData] = useState(undefined);
  const reduxAuthors = useSelector(({post}) => post?.authorMine?.authors);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams('page');

  //==============================================================================
  // header
  //==============================================================================
  const handleContainer = useCallback(() => {
    const container = {
      headerClass: "header",
      containerClass: "container plan2",
      isHeaderShow: true,
      isMenuShow: true,
      headerType: null,
      menuType: "DASHBOARD",
      isDetailView: false,
      backTitle: "支援者管理",
      activeMenu: "plan",
      isFooterShow: false,
    };
    dispatch(setContainer(container));
  }, [dispatch]);

  //==============================================================================
  // fnuction
  //==============================================================================

  //==============================================================================
  // api
  //==============================================================================
  const getSubscriber = async ( page, name ) => {
    const params = new FormData();
    if( name !== undefined ){
      params.append('name', name);
    }
    params.append('page', page);
    const {status, data} = await getSubscribeTierInPlanFromServer( reduxAuthors[0].id, params );
    
    if( status === 200 ){
      setStateData(data);
    }
    else{
      showOneButtonPopup(dispatch, data);
    }
    
  };

  //==============================================================================
  // event
  //==============================================================================
  

  const handleChangePage = (page) => {
    navigate(`/dashboard/plan/subscriber/${page}`);
  };

  const handleClickSearchNickname = (keyword) => {
    getSubscriber(1, keyword);
  };

  //==============================================================================
  // hook & render
  //==============================================================================

  const renderSupportorList = () => {
    if (stateData?.subscribers.length === 0) {
      return <EmptyTr text={text.supportor_empty} />;
    }

    return stateData?.subscribers?.map((item, i) => {
      return (
        <tr key={i}>
          <td className="hide-m">{i}</td>
          <td className="td_profile1">
            <p className="t_profile">
              <span
                className="im mr0"
                style={{ backgroundImage: `url(${item?.account?.profileImage})` }}
              ></span>
            </p>
          </td>
          <td className="td_profile2">{item?.account?.id || item?.account?.name}</td>
          <td className="td_type1">{item?.subscribeTier?.name}</td>
          <td className="td_day1">{ getDateYYYYMMDD(item.createdAt, '/') }</td>
        </tr>
      );
    });
  };

  useLayoutEffect(() => {
    handleContainer();
    getSubscriber( params.page === undefined ? 1 : params.page );
  }, []);

  return (
    <div className="contents">
      <div className="inr-c">
        <div className="hd_titbox hide-m">
          <h2 className="h_tit0">
            <span>{text.subcriber_management}</span>
          </h2>
        </div>
        <div className="hd_titbox2">
          <Search className={'inp_txt sch'} placeholder={text.subcriber_nickname} onClick={handleClickSearchNickname}/>
        </div>

        <div className="tbl_basic mtbl_ty2">
          <table className="list">
            <caption>list</caption>
            <colgroup>
              <col className="num" />
              <col className="imgs2" />
              <col className="wid3" />
              <col className="wid2" />
              <col />
            </colgroup>
            <thead>
              <tr>
                <th className="hide-m">{text.number}</th>
                <th>{text.profile}</th>
                <th>{text.nickname}</th>
                <th>{text.plan}</th>
                <th>{text.date}</th>
              </tr>
            </thead>
            <tbody>{renderSupportorList()}</tbody>
          </table>
        </div>

        <Pagination
          className={""}
          meta={stateData?.meta}
          page={stateData?.meta.currentPage}
          itemsCountPerPage={stateData?.meta.itemsPerPage}
          totalItemsCount={stateData?.meta.totalItems}
          callback={handleChangePage}
        />
      </div>
    </div>
  );
}
