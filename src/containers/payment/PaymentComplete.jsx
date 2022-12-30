import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faShare } from "@fortawesome/pro-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/pro-regular-svg-icons";

const PaymentComplete = () => {
  return (
    <div className="contents">
      <div className="inr-c">
        <div className="head_con view-m">
          <button type="button" className="btn_back">
            <span className="icon">
              <FontAwesomeIcon icon={faAngleLeft} />
            </span>
          </button>
          <button type="button" className="btn_share">
            <span className="icon">
              <FontAwesomeIcon icon={faShare} />
            </span>
          </button>
        </div>

        <div className="hd_titbox2">
          <h2 className="m_tit1">お支払いの確認</h2>
          <p className="t_chk">
            <FontAwesomeIcon icon={faCircleCheck} />
            お支払いを完了しました。
          </p>
        </div>

        <div className="area_payment comp">
          <div className="titbox">
            <p className="h1 view-m">
              <strong>大学のリンゴ一個の重さで10メートルの素材</strong>
            </p>
            <p className="t1">注文番号 : 48493A321F312</p>
            <p className="d1">2022/06/01 19:21</p>
          </div>

          <div className="box_thumb">
            <div className="thumb">
              <ImgSpan bgImg={require("@IMAGES/tmp_comic1.jpg")}></ImgSpan>
            </div>
            <div className="txt">
              <p className="h1">大学のリンゴ一個の重さで10メートルの素材</p>
              <div className="t_profile">
                <ImgSpan
                  className="im"
                  bgImg={require("@IMAGES/img_profile.png")}
                ></ImgSpan>
                <p>七語つきみ@TFO7</p>
              </div>
              <div className="lst_exe">
                <div className="ico">.skb</div>
                <div className="ico">.obj</div>
              </div>
              <p className="c1">1,200PC</p>
              <div className="btns">
                <a href="#" className="btn-pk n blue mw100p">
                  <span>お支払い詳細へ</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="btn-bot mty1">
          <a href="#" className="btn-pk n blue2 wid1">
            <span className="view-m">元のページへ</span>戻る
          </a>
        </div>
      </div>
    </div>
  );
};

const ImgSpan = styled.span`
  background-image: url(${(props) => props.bgImg});
`;

export default PaymentComplete;
