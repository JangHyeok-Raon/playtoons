import React, { useCallback, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmarkLarge,
  faCircleCheck,
  faCircleXmark,
  faCircleInfo,
} from "@fortawesome/pro-solid-svg-icons";
import { useEffect } from "react";

const active = {
  opacity: "1",
  transition: "opacity 500ms",
};

const hidden = {
  opacity: "0",
  visibility: "hidden",
  transition: "opacity 500ms , visibility 500ms",
};

const SharePopup = ({ onClose }) => {
  const url = window.location.href;
  const [isShow, setIsShow] = useState(false);
  const [toastData, setToastData] = useState();

  const handleCopy = useCallback(() => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        const param = {
          type: "success",
          message: "コピーされました。",
          timeout: 1500,
        };
        setToastData(param);
        setIsShow(true);
        setTimeout(() => {
          setIsShow(false);
        }, 1500);
      })
      .catch((e) => {
        console.log("error : ", e);
      });
  }, [url]);

  useEffect(() => {
    if (!isShow) {
      setTimeout(() => {
        setToastData(null);
      }, 500);
    }
  }, [isShow]);
  return (
    <>
      <div className="popup_dim">
        <div id="popShare" className="layerPopup pop_share">
          <div className="popup">
            <div className="pop_head">
              <h2 className="title">シェアーする</h2>
              <button
                type="button"
                className="btn_pop_close b-close"
                onClick={onClose}
              >
                <FontAwesomeIcon className="fa-solid" icon={faXmarkLarge} />
              </button>
            </div>
            <div className="pop_cont">
              <ul>
                <li className="ico1">
                  <a href="#">animate</a>
                </li>
                <li className="ico2">
                  <a href="#">twitter</a>
                </li>
                <li className="ico3">
                  <a href="#">facebook</a>
                </li>
              </ul>
              <div className="inp_btn">
                <div className="inp_txt w100p">{url}</div>
                <button
                  type="button"
                  className="btn-pk n blue2"
                  onClick={() => handleCopy()}
                >
                  コピー
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`toast_msg ${toastData?.type}`}
        style={isShow ? active : hidden}
      >
        {toastData?.type === "success" && (
          <FontAwesomeIcon icon={faCircleCheck} />
        )}
        {toastData?.type === "error" && (
          <FontAwesomeIcon icon={faCircleXmark} />
        )}
        {toastData?.type === "information" && (
          <FontAwesomeIcon icon={faCircleInfo} />
        )}
        <span>{toastData?.message}</span>
      </div>
    </>
  );
};

export default SharePopup;
