import React, { useState, useImperativeHandle, forwardRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDay } from "@fortawesome/pro-duotone-svg-icons";
import moment from "moment";
import { useEffect } from "react";
import DatePicker from "react-datepicker";
import { ko, ja, es } from "date-fns/esm/locale";
import { DATE_FORMAT } from "@/common/constant";

/**
*
   Calendar component
   <Calendar 
    ref={refCalendarEnd}
    name={"end"}
    type={"none"} 
    callback={handleClickCalendar} />
*
* @version 1.0.0
* @author 2hyunkook
* @param type 'none', 'now', '3month', '1month', '1week', '1day' 타입만 정의 되어 있음. 필요하면 getInitDate에서 정의해서 사용
* @param callback 날짜를 선택했을 경우 callback
* @return
*/
export default forwardRef(function Calendar(props, ref) {
  const {
    type,
    name,
    callback,
    className,
    popupClassName,
    value,
    isMaxDate = true,
  } = props;
  const [stateDate, setStateDate] = useState(undefined);
  const [stateOpen, setStateOpen] = useState(false);

  //==============================================================================
  // function
  //==============================================================================

  const getInitDate = () => {
    const now = new Date();
    if (type === "now") {
      return now;
    } else if (type === "3month") {
      return new Date(now.setMonth(now.getMonth() - 3));
    } else if (type === "1month") {
      return new Date(now.setMonth(now.getMonth() - 1));
    } else if (type === "1week") {
      return new Date(now.setDate(now.getDate() - 7));
    } else if (type === "1day") {
      return new Date(now.setDate(now.getDate() - 1));
    }

    //none
    return undefined;
  };

  const getStateDateFormated = () => {
    if (stateDate === undefined) {
      return "";
    }

    return moment(stateDate).format(DATE_FORMAT);
  };

  //==============================================================================
  // event
  //==============================================================================
  const handleClickDate = (date) => {
    if (callback === undefined) {
      setStateDate(date);
    } else {
      if (callback?.(name, date)) {
        setStateDate(date);
      }
    }
  };

  //==============================================================================
  // hook & render
  //==============================================================================
  useImperativeHandle(ref, () => ({
    getDate: () => {
      return stateDate;
    },
    getDateFormatted: () => {
      return getStateDateFormated();
    },
  }));

  useEffect(() => {
    setStateDate(value || getInitDate());
  }, [value]);

  return (
    <div className={`inp_cal`}>
      <div className="relative">
        <FontAwesomeIcon
          className={`cal_ico ${stateOpen ? "cal_blue" : ""}`}
          icon={faCalendarDay}
        />
        <DatePicker
          locale={ja}
          className="inp_txt calendar datepicker_last"
          selected={stateDate}
          maxDate={isMaxDate ? new Date() : undefined}
          onCalendarOpen={() => setStateOpen(true)}
          onCalendarClose={() => setStateOpen(false)}
          onChange={(date) => handleClickDate(date)}
          dateFormat="yyyy-MM-dd"
        />
      </div>
    </div>
  );
});
