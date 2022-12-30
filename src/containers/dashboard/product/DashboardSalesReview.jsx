import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

//temp data
import tempImg1 from "@IMAGES/temp_seller_image.png";

import { showOneButtonPopup, showTwoButtonPopup } from "@/common/common";
import AnswerTr from "@/components/dashboard/AnswerTr";
import ArrowRight from "@/components/dashboard/ArrowRight";
import Pagination from "@/components/dashboard/MyPagination";
import { initSalesIdAction } from "@/modules/redux/ducks/dashboard";
import { editShopReviewAuthorToServer, getShopReviewAuthorFromServer, setShopReviewReportToServer } from "@/services/dashboardService";
import { faStar } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "@/components/dashboard/Image";
import { showModal } from "@/modules/redux/ducks/modal";
import InquiryPopup from "@/components/dashboard/InquiryPopup";
import ReportButton from "@/components/dashboard/ReportButton";
import EmptyTr from "@/components/dashboard/EmptyTr";

const text = {
  number : "番号",
  product: "商品",
  title: "タイトル",
  create_date : "作成日",
  creator : "作成者",
  startAt : "販売開始日：",
  rating : "評価",
  answer : "回答",
  report : "通報",
  saler: "販売者",
  time: "時",
  report_messgae: '通報しますか？',
  must_register_creator: 'クリエイターとして登録しなければ、ダッシュボードを利用できません。',
  responsePublic: '内容を非公開',
  label_content: '内容',
  content_placeHolder: '詳細(任意)',
  confirm: '確認',
  empty_message: '商品のレビュ一はございません。',
};

const tempData ={
  meta: {
    currentPage: 1,
    itemCount: 3,
    itemsPerPage: 10,
    totalPages: 1,
    totalItems: 3
  },
  reviews: [
  {
    productId : "1",
    product: {
      code: "11",
      name : "大学のリンゴ一個の重さで10メートルの素材",
      thumbnailImage : tempImg1,
      
    },
    account: {
      name : "名前のない人間232号",
      email: "test@test.com",
    },
    date : "2022/06/11",    //TODO 문의 없음 respondedAt 요거?
    reviewScore: 3,
    content: "ラフ公開や制作工程の紹介、他にも何かやれそうな事があったら公開できればと思います。ご支援いただいた分は作業環境・技術向上に使わせていただきます。よろしくお願いいたします。",
    authorResponse: "リヒターさん噂はかねがね、って感じだったけど本当に面白い人だった。ドナースマルク映画のイメージが強いからだいぶ引っ張られてはいたけど、トム・シリングより多弁な人だというこ",
    respondedAt: "2022/05/11 23:21",
    responsePublic: true,
  },
  {
    productId : "2",
    product: {
      code: "22",
      name : "スモーキング・サベージ",
      thumbnailImage : tempImg1,
      
    },
    account: {
      name : "名前のない人間1号",
      email: "test@test.com",
    },
    date : "2022/07/11",    //TODO 문의 없음 respondedAt 요거?
    reviewScore: 5,
    content: "22ラフ公開や制作工程の紹介、他にも何かやれそうな事があったら公開できればと思います。ご支援いただいた分は作業環境・技術向上に使わせていただきます。よろしくお願いいたします。",
    authorResponse: "22リヒターさん噂はかねがね、って感じだったけど本当に面白い人だった。ドナースマルク映画のイメージが強いからだいぶ引っ張られてはいたけど、トム・シリングより多弁な人だというこ",
    respondedAt: "2022/05/11 23:21",
    responsePublic: false,
  },
  {
    productId : "3",
    product: {
      code: "33",
      name : "週刊ビッグコミックスピリッツ",
      thumbnailImage : tempImg1,
      
    },
    account: {
      name : "名前のない人間3号",
      email: "test@test.com",
    },
    date : "2022/08/11",    //TODO 문의 없음 respondedAt 요거?
    reviewScore: 1,
    content: "33ラフ公開や制作工程の紹介、他にも何かやれそうな事があったら公開できればと思います。ご支援いただいた分は作業環境・技術向上に使わせていただきます。よろしくお願いいたします。",
    authorResponse: "33リヒターさん噂はかねがね、って感じだったけど本当に面白い人だった。ドナースマルク映画のイメージが強いからだいぶ引っ張られてはいたけど、トム・シリングより多弁な人だというこ",
    respondedAt: "2022/05/11 23:21",
    responsePublic: true,
  },
]};



export default function DashboardSalesReview(props) {
  const [stateData, setStateData] = useState(undefined);
  const reduxSalesId = useSelector(({dashboard}) => dashboard.salesId);
  const reduxAuthors = useSelector(({post}) => post.authorMine?.authors);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const refArrow = useRef([]);
  const refAnswer = useRef([]);

  //==============================================================================
  // function
  //==============================================================================

  const setSelectedItem = (id) => {
    let index = undefined;
    for( let i = 0; i < stateData?.reviews?.length; i++ ){
      if( stateData.reviews[i].productId === id ){
        index = i;
        break;
      }
    }

    if( index !== undefined ){
      refArrow.current[index].setRotate(true);
      refAnswer.current[index].setShow(true);
      refAnswer.current[index].scrollIntoView();
    }
  };
  //==============================================================================
  // api
  //==============================================================================
  const getSalesReview = async (page) => {
    const formData = new FormData();
    formData.append('authorId', reduxAuthors[0].id);
    if( page ){
      formData.append('page', page);
    }
    
    const {status, data} = await getShopReviewAuthorFromServer(formData);
    console.log('getSalesReview', status, data);
    
    if( status === 200 ){
      setStateData(data);
      // setStateData(tempData);
    }
    else{
      showOneButtonPopup(dispatch, data);
    }
  };

  /**
     응답 g
  * @version 1.0.0
  * @author 2hyunkook
  * @param props
  * @return
  */
  const setShopReviewAuthor = async (check, text, item) => {
    let json = {
      authorResponse: text,
      responsePublic: !check,
      hiddenByAuthor: false,
      inquiryId: item?.productId,
    };
    const {status, data} = await editShopReviewAuthorToServer(json);
    console.log('setShopReviewAuthor', status, data);
    
    if( status === 200 ){
      setSelectedItem(item?.productId);
    }
    else{
      showOneButtonPopup(dispatch, data);
    }
    
    setSelectedItem(item?.productId);
  };

  const setReport = async (item, type, content) => {
    let json = {
      type: type,
      content: content
    };
    const {status, data} = await setShopReviewReportToServer(item.productId, json);
    console.log('setReport', status, data);
    
    if( status === 200 ){
      
    }
    else{
      showOneButtonPopup(dispatch, data);
    }
  };

  //==============================================================================
  // event
  //==============================================================================
  /**
    회답 이벤트 
  * @version 1.0.0
  * @author 2hyunkook
  */
  const handleItemClickAnswer = (item, index) => {
    console.log('handleItemClickAnswer', item);

    refAnswer.current[index].setShow(true);
    refArrow.current[index].setRotate(true);

    dispatch(
      showModal({
        title: text.answer,
        contents: <InquiryPopup text={text} item={item} onClick={(check, text) => setShopReviewAuthor(check, text, item)} />,
      })
    );
  };

  /**
    통보(신고) 이벤트 
  * @version 1.0.0
  * @author 2hyunkook
  */
  const handleItemClickReport = (item, index, type, content) => {
    console.log('handleItemClickReport', item);
    setReport(item, type, content);
  };

  /**
    화살표 이벤트  
  * @version 1.0.0
  * @author 2hyunkook
  */
  const handleItemArrow = (value, isSelected, index) => {
    refAnswer.current[index].setShow(isSelected);
  };

  /**
    모바일 클릭 이벤트 
  * @version 1.0.0
  * @author 2hyunkook
  */
  const handleItemMobile = useCallback((index) => {
    refArrow.current[index].setRotate(true);
  }, []);
  //==============================================================================
  // hook & render
  //==============================================================================

  const renderSalesInquiryList = () => {
    if (stateData?.reviews?.length === 0) {
      return <EmptyTr text={text.empty_message} />;
    }

    return stateData?.reviews?.map((item, index) => {
      return (
        <Fragment  key={index}>
          <tr className="tr-q">
            <td className="hide-m">{item.productId}</td>
            <td className="td_imgs2">
              <div className="cx_thumb"><span><Image hash={item?.product?.thumbnailImage} alt={""} /></span></div>
            </td>
            <td className="td_subject">{item?.product?.name}</td>
            <td className="td_txt0"><span className="view-m">{text.startAt}：</span>{item.date}</td>
            <td className="td_txt0"><span className="view-m">{text.creator}：</span>{item?.account?.name || item?.account?.email}</td>
            <td className="td_star">
              <div className="t_star">
                <span className={`s${item.reviewScore}`}>
                  <FontAwesomeIcon icon={faStar}/><FontAwesomeIcon icon={faStar}/><FontAwesomeIcon icon={faStar}/><FontAwesomeIcon icon={faStar}/><FontAwesomeIcon icon={faStar}/>
                </span>
              </div>
            </td>
            <td className="td_btns2 ta-r et_botm1">
              <div className="d-ib">
                <div className="btn-pk s blue2" onClick={() => handleItemClickAnswer(item, index)}>{text.answer}</div>
                <ReportButton onClick={(type, content) => handleItemClickReport(item, index, type, content)} text={text.report}></ReportButton>
              </div>
            </td>
            <td className="hide-m ta-c">
              <div className="arr" ><ArrowRight className="fs16 pointer" ref={el => (refArrow.current[index] = el)} callback={handleItemArrow} value={item} index={index}  /></div>
            </td>
          </tr>
          <AnswerTr 
            ref={el => (refAnswer.current[index] = el)}
            type={'salesReview'}
            item={item}
            text={text}
            index={index}
            callback={handleItemMobile}
          />
        </Fragment>
    );
    });
  };

  useLayoutEffect(() => {
    //check author
    if( reduxAuthors && reduxAuthors?.length > 0 ){
      //리스트 불러오기
      getSalesReview( params.page === undefined ? 1 : params.page );
    }
    else{
      showOneButtonPopup( dispatch, text.must_register_creator, () => navigate('/author/register') );
    }

    return () => dispatch( initSalesIdAction() );
  }, [params]);

  
  useEffect(() => {
    if( reduxSalesId !== undefined && stateData !== undefined ){
      setSelectedItem( reduxSalesId );
    }
  }, [reduxSalesId, stateData,]);

  return (
    <>

      <div className="inr-c">

        <div className="tbl_basic mtbl_ty1 ">
          <table className="list">
            <caption>list</caption>
            <colgroup>
              <col className="num" />
              <col className="imgs2" />
              <col className="" />
              <col className="wid4" />
              <col className="wid4" />
              <col className="wid4" />
              <col className="wid4" />
              <col className="wid5 hide-m" />
            </colgroup>
            <thead>
              <tr>
                <th className="hide-m">{text.number}</th>
                <th>{text.product}</th>
                <th>{text.title}</th>
                <th>{text.create_date}</th>
                <th>{text.creator}</th>
                <th>{text.rating}</th>
                <th></th>
                <th className="hide-m"></th>
              </tr>
            </thead>
            <tbody>
              {
                renderSalesInquiryList()
              }
            </tbody>
          </table>
        </div>

        <Pagination
          meta={stateData?.meta}
          callback={(page) => navigate(`/dashboard/product/sales/review/${page}`)}
          />

      </div>

    </>
  );
}
