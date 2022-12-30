import React, { useRef, useState, useCallback, useEffect } from "react";
import Calendar from "@COMPONENTS/dashboard/Calendar";
import { useDispatch } from "react-redux";
import { showOneButtonPopup } from "@/common/common";
import Inquiry from "./Inquiry";
import { getInquiryMine } from "@API/storeService";

const InquiryItems = () => {
  const dispatch = useDispatch();
  const startRef = useRef(null);
  const endRef = useRef(null);
  const [items, setItems] = useState([]);

  const handleClickCalendar = (name, date) => {
    const startDate = name === "start" ? date : startRef.current.getDate();
    const endDate = name === "end" ? date : endRef.current.getDate();

    if (endDate === undefined) {
      return true;
    }

    if (startDate.getTime() >= endDate.getTime()) {
      showOneButtonPopup(dispatch, "開始日は終了日より大きくできません。");
      return false;
    }

    return true;
  };

  const getInquiryItems = useCallback(async () => {
    const params = {};
    const response = await getInquiryMine(params);
    if (response?.status === 200) {
      setItems(response?.data?.inquiries);
    }
  }, []);

  useEffect(() => {
    getInquiryItems();
  }, []);

  return (
    <div className="inr-c">
      <div className="hd_titbox2">
        <h2 className="h_tit1 mb10">
          <strong>お問合せ期限</strong>
        </h2>

        <div className="inp_cal">
          <div>
            <label htmlFor="calendar_first1">開始日</label>
            <Calendar
              ref={startRef}
              name={"start"}
              className={""}
              callback={handleClickCalendar}
              type="1month"
              isMaxDate={false}
            />
          </div>
          <div>
            <label htmlFor="calendar_last1">終了日</label>
            <Calendar
              ref={endRef}
              name={"start"}
              className={""}
              callback={handleClickCalendar}
              type="now"
              isMaxDate={false}
            />
          </div>
        </div>
      </div>

      <div className="tbl_basic mtbl_ty1">
        <table className="list">
          <caption>목록</caption>
          <colgroup>
            <col className="num" />
            <col className="imgs2" />
            <col />
            <col className="wid4" />
            <col className="wid4" />
            <col className="wid3" />
            <col className="wid5 hide-m" />
          </colgroup>
          <thead>
            <tr>
              <th className="hide-m">番号</th>
              <th>商品</th>
              <th>タイトル</th>
              <th>販売者</th>
              <th>作成日</th>
              <th></th>
              <th className="hide-m"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <Inquiry key={`inquiry_${index}`} item={item} />
            ))}
            <Inquiry />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InquiryItems;
