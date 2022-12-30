import { useRef, useState } from "react";

//temp data
import tempImg1 from "@IMAGES/temp_seller_image.png";

import { convertMoneyStyleString, showOneButtonPopup } from "@/common/common";
import Calendar from "@/components/dashboard/Calendar";
import Image from "@/components/dashboard/Image";
import Pagination from "@/components/dashboard/MyPagination";
import { getAuthorIdFromServer } from "@/services/dashboardService";
import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";

const text = {
  see_product : "商品一覧",
  sales_detail: "販売内訳",
  qna_product: "商品のお問い合せ",
  see_review : "レビュ一覧",
  product_name : "商品名",
  number : "番号",
  product: "商品",
  title: "タイトル",
  price : "価格",
  date : "販売開始日",
  amount : "数量",
  start_date : "開始日",
  end_date: "終了日",
  during_sales : "期間内の売上総額",
  count : "個",
  
};

const tempData = {
  sales: "144,232 PC",
  meta: {
    currentPage: 1,
    itemCount: 3,
    itemsPerPage: 10,
    totalPages: 1,
    totalItems: 3
  },
  list: [
    {
      number : "1",
      image : tempImg1,
      title : "大学のリンゴ一個の重さで10メートルの素材",
      price : "1200000CP",
      date : "2022/06/11",
      amount: "32",
    },
    {
      number : "2",
      image : tempImg1,
      title : "大学のリンゴ一個の重さで10メートルの素材",
      price : "1200000CP",
      date : "2022/06/11",
      amount: "330000",
    },
    {
      number : "3",
      image : tempImg1,
      title : "大学のリンゴ一個の重さで10メートルの素材",
      price : "1200000CP",
      date : "2022/06/11",
      amount: "2300",
    },
  ]
};



export default function DashboardSalesList(props) {
  const [stateData, setStateData] = useState(undefined);
  const dispatch = useDispatch();
  const refCalendarStart = useRef();
  const refCalendarEnd = useRef();

  //==============================================================================
  // api
  //==============================================================================

  const getSaleList = async (page, startAt, endAt) => {
    const params = new FormData();
    if( page !== undefined ){
      params.append('page', page);
    }
    if( startAt !== undefined ){
      params.append('startAt', startAt);
    }
    if( endAt !== undefined ){
      params.append('endAt', endAt);
    }
    
    const {status, data} = await getAuthorIdFromServer(params);
    console.log('getSaleList', status, data);
    
    if( status === 200 ){
      setStateData(tempData);
    }
    else{
      showOneButtonPopup(dispatch, data);
    }
    
  };
  //==============================================================================
  // event
  //==============================================================================
  const handleChange = (page) => {
    getSaleList(page);
  };

  const handleClickCalendar = (name, date) => {
    const startDate = name === 'start' ? date : refCalendarStart.current.getDate();
    const endDate = name === 'end' ? date : refCalendarEnd.current.getDate();
    
    if( endDate === undefined ){
      return true;
    }

    if( startDate.getTime() >= endDate.getTime() ){
      showOneButtonPopup(dispatch, '開始日は終了日より大きくできません。');
      return false;
    }

    getSaleList(1, startDate, endDate);
    return true;
  };
  //==============================================================================
  // hook & render
  //==============================================================================
  const renderSalesList = () => {
    return stateData?.list?.map((item, index) => {
      return (
        <tr key={index}>
          <td className="hide-m">{item.number}</td>
          <td className="td_imgs2">
            <div className="cx_thumb"><span><Image hash={item.image} /></span></div>
          </td>
          <td className="td_subject">{item.title}</td>
          <td className="td_number3">{item.price}</td>
          <td className="td_txt1"><span className="view-m">{text.date}：</span>{item.date}</td>
          <td className='td_txt mbdb0'><span className="view-m">{text.amount}</span>{convertMoneyStyleString(item.amount)}<em className="view-m">{text.count}</em></td>
          <td className="hide-m">
          </td>
        </tr>
      );
    });
  };

  useLayoutEffect(() => {
    getSaleList();
  }, []);
  
  return (
    <>

      <div className="inr-c">
        <div className="hd_titbox2 pdty1">
          {/* mobile */}
          <h2 className="h_tit0 mb15 view-m">販売内訳の期限</h2>

          <div className="inp_cal">
            <div>
              <label htmlFor="calendar_first1">{text.start_date}</label>
              <Calendar 
                ref={refCalendarStart}
                name={"start"}
                className={''}
                type={"1month"} 
                callback={handleClickCalendar} />
            </div>
            <div>
              <label htmlFor="calendar_last1">{text.end_date}</label>
              <Calendar 
                ref={refCalendarEnd}
                name={"end"}
                className={''}
                type={"none"} 
                callback={handleClickCalendar} />
            </div>
          </div>

          <h2 className="h_tit1">
            <span className="mr20">{text.during_sales}</span> 
            <br className="view-m"/>
            <strong className="c-black mfont1">{stateData?.sales}</strong>
          </h2>
        </div>


        <div className="tbl_basic mtbl_ty1">
          <table className="list">
            <caption>list</caption>
            <colgroup>
              <col className="num" />
              <col className="imgs2" />
              <col className="" />
              <col className="wid2" />
              <col className="wid4" />
              <col className="wid4" />
              <col className="wid4 hide-m" />
            </colgroup>
            <thead>
              <tr>
                <th className="hide-m">{text.number}</th>
                <th>{text.product}</th>
                <th>{text.title}</th>
                <th>{text.price}</th>
                <th>{text.date}</th>
                <th>{text.amount}</th>
                <th className="hide-m"></th>
              </tr>
            </thead>
            <tbody>
              {
                renderSalesList()
              }
            </tbody>
          </table>
        </div>
        
        <Pagination
          meta={stateData?.meta}
          callback={handleChange}
          />

      </div>

    </>
  );
}
