import React, { useRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Purchase from "./Purchase";
import Calendar from "@COMPONENTS/dashboard/Calendar";
import { showOneButtonPopup } from "@/common/common";
import { useDispatch } from "react-redux";

const PurchaseItems = () => {
  const dispatch = useDispatch();
  const startRef = useRef(null);
  const endRef = useRef(null);

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

  return (
    <div className="inr-c">
      <div className="hd_titbox2">
        <h2 className="h_tit1 mb10">
          <strong>購入期限</strong>
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
            <col className="wid4" />
          </colgroup>
          <thead>
            <tr>
              <th className="hide-m">番号</th>
              <th>商品</th>
              <th>タイトル</th>
              <th>価格</th>
              <th>日時</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <Purchase />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PurchaseItems;
