import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faShare } from "@fortawesome/pro-solid-svg-icons";

const PaymentPlan = () => {
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

        <div className="hd_titbox2 hide-m">
          <h2 className="m_tit1">注文内容を確認</h2>
        </div>

        <div className="cont_payment">
          <div className="area_payment">
            <div className="titbox view-m">
              <p className="h1">
                <strong>大学のリンゴ一個の重さで10メートルの素材</strong>
              </p>
              <p className="t1">注文番号 : 48493A321F312</p>
            </div>

            <div className="box_thumb">
              <div className="thumb">
                <ImgSpan
                  bgImg={require("@IMAGES/img_mainplan1.jpg")}
                  style={{ backgroundSize: "auto 150%" }}
                ></ImgSpan>
              </div>
              <div className="txt">
                <p className="h1">ダイヤモンドプラン</p>
                <div className="t_profile">
                  <ImgSpan
                    className="im"
                    bgImg={require("@IMAGES/img_profile.png")}
                  ></ImgSpan>
                  <p>七語つきみ@TFO7</p>
                </div>
                <p className="c1">1,200PC</p>
              </div>
            </div>
          </div>

          <div className="area_payment">
            <h2 className="tit1">クーポン使用</h2>
            <div className="col">
              <h3 className="tit2">クーポン選択</h3>
              <select name="" id="" className="select1 w100p">
                <option value="">使用可能なクーポン1枚</option>
              </select>
            </div>
            <div className="col">
              <h3 className="tit2">クーポンコードを入力</h3>
              <div className="inp_btn">
                <input
                  type="text"
                  className="inp_txt w100p"
                  placeholder="クーポンコードを入力"
                />
                <button type="button" className="btn-pk n blue2">
                  適用する
                </button>
              </div>
            </div>
          </div>

          <div className="area_payment total">
            <h2 className="tit1 view-m">お支払い金額</h2>
            <ul className="col list2">
              <li>
                <span>支援期限</span>
                <span>2022/08/10 ~ 2022/09/12</span>
              </li>
              <li>
                <span>次回のお支払い</span>
                <span>2022/09/12</span>
              </li>
            </ul>
            <ul className="col list1">
              <li>
                <span>金額</span>
                <span>1,057,466PC</span>
              </li>
              <li>
                <span>クーポン割引</span>
                <span>-123,456PC</span>
              </li>
            </ul>
            <div className="col ta-c">
              <p className="tit2 hide-m">次の金額をお支払いします。</p>
              <p className="c1">
                <span className="view-m">合計金額</span>
                <span>934,010PC</span>
              </p>

              {/*<!-- 1. 모바일에서 안보임 -->*/}
              <label className="inp_checkbox hide-m">
                <input type="checkbox" />
                <span>毎月のお支払いに同意します。</span>
              </label>
              <button type="button" className="btn-pk n blue w100p hide-m">
                <span>お支払い</span>
              </button>
            </div>
          </div>

          <div className="area_payment pay">
            <h2 className="tit1">お支払い方法</h2>
            <div className="col lst_radio">
              <div className="on">
                <label className="inp_radio">
                  <input
                    type="radio"
                    name="radio01"
                    data-name="radio_con1"
                    checked
                    onclick="radioChk(this);"
                  />
                  <span>ポイント</span>
                </label>
                <div id="radio_con1" className="col_view">
                  <p className="tit2">保有Playcoin</p>
                  <div className="inp_btn">
                    <p className="c1">2,144,003,102PC</p>
                    <button type="button" className="btn-pk n blue">
                      チャージ
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <label className="inp_radio">
                  <input
                    type="radio"
                    name="radio01"
                    onclick="radioChk(this);"
                  />
                  <span>クレジットカード</span>
                </label>
              </div>
              <div>
                <label className="inp_radio">
                  <input
                    type="radio"
                    name="radio01"
                    onclick="radioChk(this);"
                  />
                  <span>銀行振込</span>
                </label>
              </div>
              <div>
                <label className="inp_radio">
                  <input
                    type="radio"
                    name="radio01"
                    onclick="radioChk(this);"
                  />
                  <span>コンビニ払い</span>
                </label>
              </div>
            </div>
          </div>

          <div className="btn-bot view-m">
            {/*<!-- 1. 모바일에서 위치변경 -->*/}
            <label className="inp_checkbox">
              <input type="checkbox" />
              <span>毎月のお支払いに同意します。</span>
            </label>
            <button type="button" className="btn-pk n blue w100p">
              <span>お支払い</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ImgSpan = styled.span`
  background-image: url(${(props) => props.bgImg});
`;

export default PaymentPlan;
