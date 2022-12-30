import { checkLoginExpired, getDateYYYYMMDD, showOneButtonPopup } from "@/common/common";
import EmptyDiv from "@/components/dashboard/EmptyDiv";
import Image from "@/components/dashboard/Image";
import SwiperContainer from "@/components/dashboard/SwiperContainer";
import { setContainer } from "@/modules/redux/ducks/container";
import { getSubscribeTierAction } from "@/modules/redux/ducks/dashboard";
import {
  getSubscribeTierInPlanFromServer
} from "@/services/dashboardService";
import { faAngleRight, faPlus } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useCallback, useLayoutEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { SwiperSlide } from "swiper/react";

const text = {
  plan_management: "支援管理",
  add_plan: "支援を追加",
  edit: "編集する",
  supporter_management: "支援者管理",
  see_all: "すべてみる",
  month: "月",
  plan_empty: "支援が登録されてないです。",
  supportor_empty: "支援者がいません。",
  login_expired: '自動ログイン時間が過ぎました。',
  must_register_creator: 'クリエイターとして登録しなければ、ダッシュボードを利用できません。',
};


export default function DashboardPlan(props) {
  const [stateSupporter, setStateSupporter] = useState(undefined);
  const reduxAuthors = useSelector(({ post }) => post.authorMine?.authors);
  const reduxSubscribeTiers = useSelector(({ dashboard }) => dashboard.subscribeTiers);
  const reduxLoginTime = useSelector(({login}) => login.loginSuccessTime);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //==============================================================================
  // header
  //==============================================================================

  const handleContainer = useCallback(() => {
    const container = {
      headerClass: "header",
      containerClass: "container plan bg",
      isHeaderShow: true,
      isMenuShow: true,
      headerType: null,
      menuType: "DASHBOARD",
      isDetailView: false,
      activeMenu: "plan",
      isFooterShow: false,
    };
    dispatch(setContainer(container));
  }, [dispatch]);

  //==============================================================================
  // api
  //==============================================================================
  /**
    응원자 관리 리슽 
  * @version 1.0.0
  * @author 2hyunkook
  */
  const getSurpporter = async () => {
    const params = new FormData();
    params.append("limit", 4);

    const { status, data } = await getSubscribeTierInPlanFromServer(
      reduxAuthors[0].id,
      params
    );
    if (status === 200) {
      setStateSupporter(data);
    } else {
      showOneButtonPopup(dispatch, data);
    }
  };

  //==============================================================================
  // render & hook
  //==============================================================================

  const renderPlanList = useMemo(() => {
    return reduxSubscribeTiers?.map((item, i) => {
      return (
        <SwiperSlide className="col" key={i}>
          <div className="icon">
            <Image hash={item.thumbnailImage} alt="" />
          </div>
          <div className="cont" >
            <h3 className="h1">{item.name}</h3>
            <p className="t1">
              <span className="c-blue">{parseInt(item.price)}</span> /
              {text.month}
            </p>
            <p className="t2">{item.description}</p>
            <div className="t_dot1">{/* <p>{item.description}</p> */}</div>
            
            <Link
              to={`/dashboard/plan/edit/${item.id}`}
              className="btn-pk b blue"
            >
              <span>{text.edit}</span>
            </Link>
          </div>
        </SwiperSlide>
      );
    });
  }, [reduxSubscribeTiers]);

  const renderBenefitList = (list) => {
    return list.map((item, i) => {
      return <p key={i}>{item.text}</p>;
    });
  };

  const renderSupporterList = () => {
    return stateSupporter?.subscribers?.map((item, i) => {
      return (
        <li key={i}>
          <div>
            <p className="t_profile">
              <span
                className="im"
                style={{ backgroundImage: `url(${item.account.profileImage})` }}
              ></span>
              <span>{item.account.id}</span>
            </p>
            <p className="t2">{getDateYYYYMMDD(item.updatedAt, "/")}</p>
          </div>
          <p className="t1 c-black">{item.subscribeTier.name}</p>
        </li>
      );
    });
  };

  useLayoutEffect(() => {
    handleContainer();
    //check login expire time
    if( checkLoginExpired( navigate, dispatch, text.login_expired, reduxLoginTime )){
      //check author
      if( reduxAuthors && reduxAuthors?.length > 0 ){
        dispatch(getSubscribeTierAction({ authorId: reduxAuthors[0].id }));
        getSurpporter();
      }
      else{
        showOneButtonPopup( dispatch, text.must_register_creator, () => navigate('/author/register') );
      }
    }
  }, [reduxAuthors]);

  return (
    <div className="contents">
      <div className="inr-c">
        <section className="box_area pr-mb2 ty_plan2">
          <header className="hd_titbox hd_mst1">
            <h2 className="h_tit1">
              <span>{text.plan_management}</span>
            </h2>
            <div className="rgh">
              <Link to="/dashboard/plan/upload" className="btn-pk n blue2">
                <span>
                  <FontAwesomeIcon icon={faPlus} /> {text.add_plan}
                </span>
              </Link>
            </div>
          </header>

          <div className="lst_mainplan relative">
            {reduxSubscribeTiers?.length === 0 ? (
              <EmptyDiv className={"plan_empty"} text={text.plan_empty} />
            ) : (
              <SwiperContainer
                className={"mySwiper1"}
                buttonClassName={"my1 hide-m wh_i"}
                slidesPerView={4}
                breakpoints={{
                  0: {
                    slidesPerView: 2,
                    spaceBetween: 8,
                  },
                  1000: {
                    slidesPerView: 3,
                    spaceBetween: 15,
                  },
                  1400: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                  },
                }}
                list={renderPlanList}
              />
            )}
          </div>
        </section>

        <section className="box_area ty_plan1">
          <div className="hd_titbox">
            <h3 className="h_tit1">{text.supporter_management}</h3>
            <Link to="/dashboard/plan/subscriber" className="rgh c-blue">
              <span className="ico_arr_link">
                {text.see_all} <FontAwesomeIcon icon={faAngleRight} />
              </span>
            </Link>
          </div>
          {stateSupporter?.meta?.totalItems === 0 ? (
            <EmptyDiv
              className={"relative empty"}
              text={text.supportor_empty}
            />
          ) : (
            <div className="lst_txt1">
              <ul>{renderSupporterList()}</ul>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
