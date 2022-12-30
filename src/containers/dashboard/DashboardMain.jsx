import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SwiperSlide } from "swiper/react";

import SwiperContainer from "@/components/dashboard/SwiperContainer";
import {
  faAngleRight, faHeart, faStar
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { getPostMineFromServer, getReactionMineAuthorIdFromServer, getShopInquiryAuthorFromServer, getShopReviewAuthorFromServer } from "@/services/dashboardService";

import { checkLoginExpired, getDateYYYYMMDD, showOneButtonPopup } from "@/common/common";
import EmptyDiv from "@/components/dashboard/EmptyDiv";
import Image from "@/components/dashboard/Image";
import { setContainer } from "@/modules/redux/ducks/container";
import { setSalesIdAction } from "@/modules/redux/ducks/dashboard";
import { getPostSeriesMine } from "@/services/postService";
import tempImageSales from "@IMAGES/temp_seller_image.png";
import tempImageSeries01 from "@IMAGES/temp_series_01.png";
import tempImageSeries02 from "@IMAGES/temp_series_02.png";
import tempImageSeries03 from "@IMAGES/temp_series_03.png";
import tempImageSeries04 from "@IMAGES/temp_series_04.png";
import tempImageSeries05 from "@IMAGES/temp_series_05.png";
import tempImageSeries06 from "@IMAGES/temp_series_06.png";
import { useLayoutEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";

const text = {
  today_sales: "当日の売上",
  detail: "詳細",
  case: "件",
  recently_sales_product: "最近販売された商品",
  recently_question: "最近のお問い合わせ",
  see_all: "すべてみる",
  recently_review: "最近のレビュー",
  follower_count: "フォロー数",
  progress_in_series: "連載中のシリーズ",
  person: "名",
  series_management: "シリーズ管理",
  recently_post: "最近の投稿",
  recently_reaction: "最近のリアクション",
  past_sales: "過去の売り上げ",
  history_deposit: "振込履歴",
  before_yesterday: "前日より",
  login_expired: '自動ログイン時間が過ぎました。',
  empty_data: 'データがいません。',
  must_register_creator: 'クリエイターとして登録しなければ、ダッシュボードを利用できません。',
};

export default function DashboardMain() {
  const [stateReview, setStateReview] = useState(undefined);
  const [stateQuestion, setStateQuestion] = useState(undefined);
  const [stateSeries, setStateSeries] = useState({id: '', thumbnailImage: ''});
  const [statePosts, setStatePosts] = useState(undefined);
  const [stateReactions, setStateReactions] = useState(undefined);
  const reduxAuthors = useSelector(({post}) => post?.authorMine?.authors);
  const reduxLoginTime = useSelector(({login}) => login?.loginSuccessTime);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //==============================================================================
  // header
  //==============================================================================

  const handleContainer = useCallback(() => {
    const container = {
      headerClass: "header",
      containerClass: "container dashboard",
      isHeaderShow: true,
      isMenuShow: true,
      headerType: null,
      menuType: "DASHBOARD",
      isDetailView: false,
      activeMenu: "dashboard",
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
    최근의 문의사항
  * @version 1.0.0
  * @author 2hyunkook
  */
  const getQuestionList = async () => {
    const formData = new FormData();
    formData.append('authorId', reduxAuthors[0].id);
    formData.append('limit', 4);
    
    const {status, data} = await getShopInquiryAuthorFromServer(formData);
    console.log('getSalesInquiryList', status, data);
    
    if( status === 200 ){
      setStateQuestion(data);
    }
    else{
      showOneButtonPopup(dispatch, data);
    }
  };
  /**
    최근의 리뷰 
  * @version 1.0.0
  * @author 2hyunkook
  */
  const getReviewList = async () => {
    const formData = new FormData();
    formData.append('authorId', reduxAuthors[0].id);
    formData.append('limit', 4);
    
    const {status, data} = await getShopReviewAuthorFromServer(formData);
    console.log('getSalesReview', status, data);
    
    if( status === 200 ){
      setStateReview(data);
    }
    else{
      showOneButtonPopup(dispatch, data);
    }
  };
  /**
    연재중의 시리즈 
  * @version 1.0.0
  * @author 2hyunkook
  */
  const getSeriesList = async () => {
    const params = new FormData();
    params.append('authorId', reduxAuthors[0].id);
    params.append('limit', 30);
    const {status, data} = await getPostSeriesMine(params);
    
    if( status === 200 ){
      setStateSeries(data);
    }
    else{
      showOneButtonPopup(dispatch, data);
    }
  };
  /**
    최근의 투고 
  * @version 1.0.0
  * @author 2hyunkook
  */
  const getPostList = async () => {
    const params = new FormData();
    params.append('authorId', reduxAuthors[0].id);
    params.append('limit', 4);
    const {status, data} = await getPostMineFromServer(params);
    
    if( status === 200 ){
      setStatePosts(data);
    }
    else{
      showOneButtonPopup(dispatch, data);
    }
  };
  /**
    최근의 투고 
  * @version 1.0.0
  * @author 2hyunkook
  */
  const getReactionList = async () => {
    const params = new FormData();
    params.append('authorId', reduxAuthors[0].id);
    params.append('limit', 4);
    const {status, data} = await getReactionMineAuthorIdFromServer(params);
    
    if( status === 200 ){
      setStateReactions(data);
    }
    else{
      showOneButtonPopup(dispatch, data);
    }
  };
  //==============================================================================
  // event
  //==============================================================================
  const handleClickReview = useCallback((item) => {
    dispatch( setSalesIdAction({salesId: item.id}) );
    navigate('/dashboard/product/sales/review');
  }, []);


  const handleClickQuestion = useCallback((item) => {
    dispatch( setSalesIdAction({salesId: item.id}) );
    navigate('/dashboard/product/sales/inquiry');
  }, []);
  //==============================================================================
  // hook & render
  //==============================================================================

  const renderSalesProductList = useMemo(() => {
    if( tempData?.sales_product_list?.length === 0 ){
      return (
        <EmptyDiv
          className={"relative empty"}
          text={text.empty_data}
        />
      );
    }

    return tempData?.sales_product_list?.map((item, i) => {
      return (
        <SwiperSlide key={i} className={"cx"}>
          <Link to={`/dashboard/product/detail/${item.id}`}>
            <div className="cx_thumb">
              <span>
                <img src={item.image} alt="사진" />
              </span>
            </div>
            <div className="cx_txt">
              <p className="h1">{item.title}</p>
              <p className="t1">{item.date}</p>
            </div>
          </Link>
        </SwiperSlide>
      );
    });
  }, [tempData]);

  const renderQuestionList = () => {
    if( stateQuestion?.inquiries?.length === 0 ){
      return (
        <EmptyDiv
          className={"relative empty"}
          text={text.empty_data}
        />
      );
    }

    return stateQuestion?.inquiries?.map((item, index) => {
      return (
        <li key={index}>
          <p className="t1">
            <span className="pointer" onClick={() => handleClickQuestion(item)}>
              {item.title}
            </span>
          </p>
          <p className="t2">{item.date}</p>
        </li>
      );
    });
  };

  const renderReviewList = () => {
      if( stateReview?.reviews?.length === 0 ){
        return (
          <EmptyDiv
            className={"relative empty"}
            text={text.empty_data}
          />
        );
      }

    return stateReview?.reviews?.map((item, index) => {
      return (
        <li key={index}>
          <div>
            <div className="t_star">
              <span className={`s${item.review_count}`}>
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
              </span>
            </div>
            <p className="t1">
              <span className="pointer" onClick={() => handleClickReview(item)}>
                {item.title}
              </span>
            </p>
          </div>
          <p className="t2">{item.date}</p>
        </li>
      );
    });
  };

  const renderSeriesList = useMemo(() => {
    if( stateSeries?.series?.length === 0 ){
      return (
        <EmptyDiv
          className={"relative empty"}
          text={text.empty_data}
        />
      );
    }

    return stateSeries?.series?.map((item, i) => {
      return (
        <SwiperSlide key={i} className={"cx"}>
          <Link to={`/dashboard/series/detail/${item.id}/1`}>
            <div className="cx_thumb">
              <span>
                <Image hash={item.thumbnailImage} params={{w:250}} />
              </span>
              <p className="t_like">
                <FontAwesomeIcon icon={faHeart} />
                <span> {item.likeCount}</span>
              </p>
            </div>
            <div className="cx_txt">
              <p className="t1 c-blue">{item?.type?.name}</p>
              <p className="h1">{item.title}</p>
            </div>
          </Link>
        </SwiperSlide>
      );
    });
  }, [stateSeries]);

  const renderPostList = () => {
    if( statePosts?.posts?.length === 0 ){
      return (
        <EmptyDiv
          className={"relative empty"}
          text={text.empty_data}
        />
      );
    }

    return statePosts?.posts?.map((item, i) => {
      return (
        <li key={item.id}>
          <p className="t1">
            <Link to={`/dashboard/post/detail/${item.id}`}>{item.title}</Link>
          </p>
          <p className="t2">{ getDateYYYYMMDD(item.startAt, '/') }</p>
        </li>
      );
    });
  };

  const renderReactionList = () => {
    if( stateReactions?.reactions?.length === 0 ){
      return (
        <EmptyDiv
          className={"relative empty"}
          text={text.empty_data}
        />
      );
    }

    return stateReactions?.reactions?.map((item, index) => {
      return (
        <li key={item.id}>
          <p className="t1">
            <Link to={`/dashboard/reaction/detail/${item.postId}/1`}>
              {item.content}
            </Link>
          </p>
          <p className="t2">{ getDateYYYYMMDD(item.createdAt, '/') }</p>
        </li>
      );
    });
  };

  const renderSalesListInPast = () => {
    if( tempData?.past_sales_list?.length === 0 ){
      return (
        <EmptyDiv
          className={"relative empty"}
          text={text.empty_data}
        />
      );
    }

    return tempData?.past_sales_list?.map((item, index) => {
      return (
        <li key={index}>
          <div>
            <p className="t2">{item.date}</p>
            <p className="t1_1">{item.money}</p>
          </div>
          <p className="t2">
            <Link
              to={`/dashboard/sales/detail/${item.id}`}
              className="btn-pk s blue2"
            >
              <span data-id={item.id}>{text.detail}</span>
            </Link>
          </p>
        </li>
      );
    });
  };

  const renderHistoryOfDeposit = () => {
    if( tempData?.history_deposit_list?.length === 0 ){
      return (
        <EmptyDiv
          className={"relative empty"}
          text={text.empty_data}
        />
      );
    }

    return tempData?.history_deposit_list?.map((item, index) => {
      return (
        <li key={index}>
          <div>
            <p className="t2">{item.date}</p>
            <p className="t1_1">{item.money}</p>
            <p className="t3">{item.bank_name}</p>
          </div>
          <p className="t2">
            <Link
              to={`/dashboard/sales/detail/${item.id}`}
              className="btn-pk s blue2"
            >
              <span data-id={item.id}>{text.detail}</span>
            </Link>
          </p>
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
        getQuestionList();
        getReviewList();
        getSeriesList();
        getPostList();
        getReactionList();
      }
      else{
        showOneButtonPopup( dispatch, text.must_register_creator, () => navigate('/author/register') );
      }
    }
  }, []);

  return (
    <div className="contents">
      <div className="inr-c">
        <section className="box_area pr-mb1">
          <div className="hd_titbox">
            <h2 className="h_tit1">{text.today_sales}</h2>
            <p className="rgh hide-m">{tempData.today}</p>
          </div>

          <div className="b_tit">
            <p className="h1">
              <strong>{tempData.sales_cases}</strong>
              <span className="fz_s1 c-green">{tempData.before_yesterday}</span>
            </p>
            <div className="t1">
              <p>
                <strong>{tempData.pc_count}</strong>
              </p>
              <Link
                to="/dashboard/product/sales/list"
                className="btn-pk n blue"
              >
                <span>{text.detail}</span>
              </Link>
            </div>
          </div>

          <div className="b_cont">
            <div className="hd_titbox">
              <h3 className="h_tit1">{text.recently_sales_product}</h3>
              <Link to="/dashboard/product/list" className="rgh c-blue view-m">
                <span className="ico_arr_link">
                  {text.see_all}
                  <FontAwesomeIcon icon={faAngleRight} />
                </span>
              </Link>
            </div>

            <div className="lst_comic1">
              <SwiperContainer
                className={"mySwiper1"}
                buttonClassName={"my1 hide-m"}
                slidesPerView={4}
                breakpoints={{
                  0: {
                    slidesPerView: 2.3,
                    spaceBetween: 8,
                  },
                  1000: {
                    slidesPerView: 3,
                    spaceBetween: 15,
                  },
                  1400: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                  },
                }}
                list={renderSalesProductList}
              />
            </div>
          </div>

          <div className="b_cont flbox v3070">
            <div className="item">
              <div className="hd_titbox">
                <h3 className="h_tit1">{text.recently_question}</h3>
                <Link
                  to="/dashboard/product/sales/inquiry"
                  className="rgh c-blue"
                >
                  <span className="ico_arr_link">
                    {text.see_all}
                    <FontAwesomeIcon icon={faAngleRight} />
                  </span>
                </Link>
              </div>
              <div className="lst_txt1">
                <ul>{renderQuestionList()}</ul>
              </div>
            </div>

            <div className="item">
              <div className="hd_titbox">
                <h3 className="h_tit1">{text.recently_review}</h3>
                <Link
                  to="/dashboard/product/sales/review"
                  className="rgh c-blue"
                >
                  <span className="ico_arr_link">
                    {text.see_all}
                    <FontAwesomeIcon icon={faAngleRight} />
                  </span>
                </Link>
              </div>
              <div className="lst_txt1">
                <ul>{renderReviewList()}</ul>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================================== */}
        <section className="box_area">
          <div className="hd_titbox">
            <h2 className="h_tit1">{text.follower_count}</h2>
            <p className="rgh">{tempData.today}</p>
          </div>

          <div className="b_tit">
            <div className="t1">
              <p>
                <strong>{reduxAuthors?.[0]?.followCount} {text.person}</strong>
                <span className="fz_s1 c-green">{tempData.follower_plus_count}</span>
              </p>
            </div>
          </div>

          <div className="b_cont">
            <div className="hd_titbox">
              <h3 className="h_tit1">{text.progress_in_series}</h3>
              <Link to="/dashboard/series/list" className="rgh c-blue">
                <span className="ico_arr_link">
                  {text.series_management}
                  <FontAwesomeIcon icon={faAngleRight} />
                </span>
              </Link>
            </div>

            <div className="lst_comic1 long mh_300">
              {
                <SwiperContainer
                  className={"mySwiper2"}
                  buttonClassName={"my1 hide-m"}
                  slidesPerView={6}
                  breakpoints={{
                    0: {
                      slidesPerView: 2.3,
                      spaceBetween: 8,
                    },
                    1000: {
                      slidesPerView: 4,
                      spaceBetween: 15,
                    },
                    1400: {
                      slidesPerView: 6,
                      spaceBetween: 30,
                    },
                  }}
                  list={renderSeriesList}
                />
              }
            </div>
          </div>

          <div className="b_cont flbox v3070">
            <div className="item">
              <div className="hd_titbox">
                <h3 className="h_tit1">{text.recently_post}</h3>
                <Link to="/dashboard/post" className="rgh c-blue">
                  <span className="ico_arr_link">
                    {text.see_all}
                    <FontAwesomeIcon icon={faAngleRight} />
                  </span>
                </Link>
              </div>
              <div className="lst_txt1">
                <ul>{renderPostList()}</ul>
              </div>
            </div>

            <div className="item">
              <div className="hd_titbox">
                <h3 className="h_tit1">{text.recently_reaction}</h3>
                <Link to="/dashboard/reaction/1" className="rgh c-blue">
                  <span className="ico_arr_link">
                    {text.see_all}
                    <FontAwesomeIcon icon={faAngleRight} />
                  </span>
                </Link>
              </div>
              <div className="lst_txt1">
                <ul>{renderReactionList()}</ul>
              </div>
            </div>
          </div>

          <div className="b_cont flbox v3070 pc_nofx">
            <div className="item">
              <div className="hd_titbox">
                <h3 className="h_tit1">{text.past_sales}</h3>
                <Link to="/dashboard/sales/detail" className="rgh c-blue">
                  <span className="ico_arr_link">
                    {text.see_all}
                    <FontAwesomeIcon icon={faAngleRight} />
                  </span>
                </Link>
              </div>
              <div className="lst_txt1">
                <ul>{renderSalesListInPast()}</ul>
              </div>
            </div>

            <div className="item">
              <div className="hd_titbox">
                <h3 className="h_tit1">{text.history_deposit}</h3>
                <Link to="/dashboard/product/sales/list" className="rgh c-blue">
                  <span className="ico_arr_link">
                    {text.see_all}
                    <FontAwesomeIcon icon={faAngleRight} />
                  </span>
                </Link>
              </div>
              <div className="lst_txt1">
                <ul>{renderHistoryOfDeposit()}</ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

const tempData = {
  today: "2022年02月19日 12:11",
  sales_cases: "2,112件",
  before_yesterday: "前日より+123%",
  pc_count: "934,010PC",
  sales_product_list: [
    {
      id: "1",
      image: tempImageSales,
      title: "大学のリンゴ一個の重さで10メートルの1111111111111111111",
      date: "2022/06/11",
    },
    {
      id: "2",
      image: tempImageSales,
      title: "大学のリンゴ一個の重さで10メートルの22222222222222",
      date: "2022/06/11",
    },
    {
      id: "3",
      image: tempImageSales,
      title: "大学のリンゴ一個の重さで10メートルの33333333333333",
      date: "2022/06/11",
    },
    {
      id: "4",
      image: tempImageSales,
      title: "大学のリンゴ一個の重さで10メートルの44444444444444",
      date: "2022/06/11",
    },
  ],
  question_list: [
    {
      id: "1",
      title: "どうしても返却は無理なんでしょうか？",
      date: "2022/06/11",
    },
    {
      id: "2",
      title: "ABCに制作に関するお問い合わせです。",
      date: "2022/06/11",
    },
    {
      id: "3",
      title: "デザインの変更依頼",
      date: "2022/06/11",
    },
    {
      id: "4",
      title: "お願いしてたコンテンツに若干歪んでる箇asdafadsgfasdfasdfdasfas",
      date: "2022/06/11",
    },
  ],
  review_list: [
    {
      id: "1",
      title: "とてもよかったです。またお願いします。",
      date: "2022/06/11",
      review_count: 4,
    },
    {
      id: "2",
      title: "とてもよかったです。またお願いします。",
      date: "2022/06/11",
      review_count: 2,
    },
    {
      id: "3",
      title: "とてもよかったです。またお願いします。",
      date: "2022/06/11",
      review_count: 1,
    },
    {
      id: "4",
      title: "とてもよかったです。またお願いします。",
      date: "2022/06/11",
      review_count: 5,
    },
  ],

  follower_count: "451,302名",
  follower_plus_count: "+4124名",
  series_list: [
    {
      image: tempImageSeries01,
      status: "new",
      count: "1.2k",
      title: "新人さんは事故123123123",
      type: "ウェブトゥーン",
      id: "1",
    },
    {
      image: tempImageSeries02,
      status: "new",
      count: "1.2k",
      title: "新人さんは事故123123123",
      type: "ウェブトゥーン",
      id: "2",
    },
    {
      image: tempImageSeries03,
      status: "new",
      count: "1.2k",
      title: "新人さんは事故123123123",
      type: "ウェブトゥーン",
      id: "3",
    },
    {
      image: tempImageSeries04,
      status: "new",
      count: "1.2k",
      title: "新人さんは事故123123123",
      type: "ウェブトゥーン",
      id: "4",
    },
    {
      image: tempImageSeries05,
      status: "new",
      count: "1.2k",
      title: "新人さんは事故123123123",
      type: "ウェブトゥーン",
      id: "5",
    },
    {
      image: tempImageSeries06,
      status: "new",
      count: "1.2k",
      title: "新人さんは事故123123123",
      type: "ウェブトゥーン",
      id: "6",
    },
    {
      image: tempImageSeries01,
      status: "new",
      count: "1.2k",
      title: "新人さんは事故123123123",
      type: "ウェブトゥーン",
      id: "7",
    },
  ],
  post_list: [
    {
      title:
        "どうしても返却は無理なんでしょうか？どうしても返却は無理なんでしょうか？",
      date: "2022/06/11",
      id: 4,
    },
    {
      title:
        "どうしても返却は無理なんでしょうか？どうしても返却は無理なんでしょうか？",
      date: "2022/06/11",
      id: 2,
    },
    {
      title:
        "どうしても返却は無理なんでしょうか？どうしても返却は無理なんでしょうか？",
      date: "2022/06/11",
      id: 1,
    },
    {
      title:
        "どうしても返却は無理なんでしょうか？どうしても返却は無理なんでしょうか？",
      date: "2022/06/11",
      id: 5,
    },
  ],
  reaction_list: [
    {
      title: "どうしても返却は無理なんでしょ",
      date: "2022/06/11",
      id: 4,
    },
    {
      title:
        "どうしても返却は無理なんでしょうか？どうしても返却は無理なんでしょうか？",
      date: "2022/06/11",
      id: 2,
    },
    {
      title:
        "どうしても返却は無理なんでしょうか？どうしても返却は無理なんでしょうか？",
      date: "2022/06/11",
      id: 1,
    },
    {
      title:
        "どうしても返却は無理なんでしょうか？どうしても返却は無理なんでしょうか？",
      date: "2022/06/11",
      id: 5,
    },
  ],
  past_sales_list: [
    {
      date: "2022/04",
      money: "123,441PC",
      id: "1",
    },
    {
      date: "2022/05",
      money: "123,441PC",
      id: "2",
    },
    {
      date: "2022/06",
      money: "123,441PC",
      id: "3",
    },
    {
      date: "2022/07",
      money: "123,441PC",
      id: "4",
    },
  ],
  history_deposit_list: [
    {
      date: "2022/04",
      money: "123,456,789円",
      bank_name: "UFJ三菱銀行UFJ三菱銀行UFJ三菱銀行UFJ三菱銀行UFJ三菱銀行",
      id: "b1",
    },
    {
      date: "2022/05",
      money: "123,456,789円",
      bank_name: "UFJ三菱銀行",
      id: "b2",
    },
    {
      date: "2022/06",
      money: "123,456,789円",
      bank_name: "UFJ三菱銀行",
      id: "b3",
    },
    {
      date: "2022/07",
      money: "123,456,789円",
      bank_name: "UFJ三菱銀行",
      id: "b4",
    },
  ],
};
