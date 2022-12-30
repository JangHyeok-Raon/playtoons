import {
  faCommentQuote,
  faHeart,
  faLock,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const Hashtag = () => {
  return (
    <div className="area_schmain2 inr-c">
      <div className="lst_detail">
        <ul>
          <li className="item">
            <Link to="">
              <div className="thumb">
                <img src={require("@IMAGES/tmp_comic1.jpg")} alt="" />
              </div>
              <div className="txt">
                <p className="h1">
                  2話 :
                  シェルターアークシェルターアークシェルターアークシェルターアークシェルターアーク
                </p>
                <p className="t1">
                  モと戦う為、特殊チームレンジャーを創設したが、
                  <br />
                  クモの圧倒的な力には勝てず。
                </p>
              </div>
              <div className="botm">
                <div className="lst_tag">
                  <div className="i_tag">#アクション</div>
                  <div className="i_tag">#異世界</div>
                </div>

                <p className="d1">2022/09/12 12:00</p>
                <button type="button" className="btn01">
                  <FontAwesomeIcon icon={faHeart} />
                  1.2k
                </button>
                <button type="button" className="btn01">
                  <FontAwesomeIcon icon={faCommentQuote} />
                  966
                </button>
              </div>
            </Link>
          </li>
          <li className="item">
            <Link to="">
              <div className="thumb">
                <img src={require("@IMAGES/tmp_comic1.jpg")} alt="" />
                <div className="area_lock">
                  {/*<!-- 잠금 -->*/}
                  <div>
                    <p>
                      <FontAwesomeIcon icon={faLock} />
                    </p>
                  </div>
                </div>
              </div>
              <div className="txt">
                <p className="h1">
                  <span className="i-txt">支援</span>3話 : シェルターアーク
                </p>
                <p className="t1">
                  モと戦う為、特殊チームレンジャーを創設したが、
                  <br />
                  クモの圧倒的な力には勝てず。
                </p>
              </div>
              <div className="botm">
                <div className="lst_tag">
                  <div className="i_tag">#アクション</div>
                  <div className="i_tag">#異世界</div>
                </div>

                <p className="d1">2022/09/12 12:00</p>
                <button type="button" className="btn01">
                  <FontAwesomeIcon icon={faHeart} />
                  1.2k
                </button>
                <button type="button" className="btn01">
                  <FontAwesomeIcon icon={faCommentQuote} />
                  966
                </button>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Hashtag;
