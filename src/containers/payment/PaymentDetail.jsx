import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faShare,
  faTriangleExclamation,
} from "@fortawesome/pro-solid-svg-icons";

const PaymentDetail = () => {
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
          <h2 className="m_tit1">大学のリンゴ一個の重さで10メートルの素材</h2>
          <p className="t1">注文番号 : 48493A321F312</p>
          <p className="d1">2022/06/01 19:21</p>
        </div>

        <div className="lft_purch">
          <div className="area_payment">
            <div className="box_thumb">
              <div className="thumb">
                <ImgSpan bgImg={require("@IMAGES/tmp_comic1.jpg")}></ImgSpan>
              </div>
              <div className="txt">
                <p className="h1">大学のリンゴ一個の重さで10メートルの素材</p>
                <p className="t1">
                  ラフ公開や制作工程の紹介、他にも何かやれそうな事があったら
                  公開できればと思います。ご支援いただいた分は作業環境・技術向上に
                  使わせていただきます。よろしくお願いいたします。
                </p>
                <div className="lst_exe">
                  <div className="ico">.skb</div>
                  <div className="ico">.obj</div>
                </div>
                <p className="c1">1,200PC</p>
                <div className="btns">
                  <a href="#" className="btn-pk n blue mw100p">
                    <span>ダウンロード</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rgh_purch">
          <div className="box_license">
            <div className="icon">
              <FontAwesomeIcon icon={faTriangleExclamation} />
            </div>
            <div>
              <p className="t1">ライセンスの利用範囲</p>
              <p className="t2">事業者は利用不可です。</p>
            </div>
          </div>
          <div className="box_infor">
            <h2 className="h_tit1 ta-c hide-m">販売者情報</h2>

            <div className="col">
              <p className="tit1">販売者</p>
              <div className="t_profile">
                <ImgSpan
                  className="im"
                  bgImg={require("@IMAGES/img_profile.png")}
                ></ImgSpan>
                <p>七語つきみ@TFO7</p>
              </div>
            </div>

            <ul className="col">
              <li>
                <p className="tit1">法人番号</p>
                <p>6012401016428</p>
              </li>
              <li>
                <p className="tit1">商号又は名称</p>
                <p>株式会社虹色</p>
              </li>
              <li>
                <p className="tit1">本店又は主たる事務所の所在地</p>
                <p>東京都渋谷区渋谷1丁目12番2号</p>
              </li>
            </ul>
            <div className="btn-bot">
              <a href="#" className="btn-pk n blue2 w100p">
                販売者にお問い合わせ
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ImgSpan = styled.span`
  background-image: url(${(props) => props.bgImg});
`;

export default PaymentDetail;
