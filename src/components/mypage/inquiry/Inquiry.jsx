import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faShare } from "@fortawesome/pro-solid-svg-icons";

const Inquiry = ({ item }) => {
  return (
    <>
      <tr className="tr_q">
        <td className="hide-m">1</td>
        <td className="td_imgs2">
          <div className="cx_thumb">
            <span>
              <img src={require("@IMAGES/tmp_comic1.jpg")} alt="사진" />
            </span>
          </div>
        </td>
        <td className="td_subject">大学のリンゴ一個の重さで10メートルの素材</td>
        <td className="td_txt0 t-dot">
          <span className="view-m">作成者 : </span>
          七語つきみ@TFO7七語つきみ@TFO7七語つきみ@TFO7七語つきみ@TFO7七語つきみ@TFO7
        </td>
        <td className="td_txt0">2022/06/01</td>
        <td className="td_btns2 ta-r et_botm1">
          <div className="d-ib">
            <a href="#" className="btn-pk s blue2 mw100p">
              <span>削除</span>
            </a>
          </div>
        </td>
        <td className="hide-m ta-c">
          <button type="button" className="arr" onclick="tblQR1(this);">
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </td>
      </tr>
      <tr className="tr_a">
        <td className="hide-m"></td>
        <td colSpan="5" className="ta-l">
          <div className="tx_a1">
            <button
              type="button"
              className="arr view-m"
              onclick="tblQR2(this);"
            ></button>
            <p className="t1">
              ラフ公開や制作工程の紹介、他にも何かやれそうな事があったら公開できればと思います。ご支援いただいた分は作業環境・技術向上に使わせていただきます。よろしくお願いいたします。
            </p>
          </div>
          <div className="tx_a2">
            <span className="re view-m">
              <FontAwesomeIcon icon={faShare} />
            </span>
            <p className="t2">
              <span className="i-txt">販売者</span>
              <span>2022/05/11 23:21時</span>
            </p>
            <p className="t1">
              リヒターさん噂はかねがね、って感じだったけど本当に面白い人だった。ドナースマルク映画のイメージが強いからだいぶ引っ張られてはいたけど、トム・シリングより多弁な人だというこ
            </p>
          </div>
        </td>
        <td className="hide-m ta-c"></td>
      </tr>
    </>
  );
};

export default Inquiry;
