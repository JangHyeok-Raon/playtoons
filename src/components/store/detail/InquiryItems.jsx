import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faReply } from "@fortawesome/pro-solid-svg-icons";

const InquiryItems = () => {
  return (
    <>
      <div className="lst_comm2 ty1">
        <div className="col">
          <div className="toptit">
            <p className="h1">
              *******L <span className="d1">2022.06.01</span>
            </p>
          </div>
          <div className="conts">
            <div className="bat">
              <span className="i-txt">質問</span>
            </div>
            <p className="t1">
              #SSSRearise
              はシンプルに技術とのフュージョンがめちゃくちゃイカしてた。印刷技術もこだわりもえぐい。米山さん目当てで行っ
              たけれども、タイキさんの空気感とかNAJI柳田さんの没入感とか思いっきり感じれてよかったな?
            </p>
          </div>
        </div>
        <div className="col reply">
          <div className="ico view-m">
            <FontAwesomeIcon icon={faReply} />
          </div>
          <div className="toptit">
            <p className="h1">
              <strong>魔法のポプコ</strong>
              <span className="d1">2022.06.01</span>
            </p>
          </div>
          <div className="conts">
            <div className="bat">
              <span className="i-txt">回答</span>
            </div>
            <p className="t1">
              リヒターさん噂はかねがね、って感じだったけど本当に面白い人だった。ドナースマルク映画のイメージが強いからだいぶ
              引っ張られてはいたけど、トム・シリングより多弁な人だということが伝わってきた。
            </p>
          </div>
        </div>
        <div className="col">
          <div className="toptit">
            <p className="h1">
              *******L <span className="d1">2022.06.01</span>
            </p>
          </div>
          <div className="conts">
            <p className="t1 t_lock">
              <FontAwesomeIcon icon={faLock} />
              販売者のみ確認できます。
            </p>
          </div>
        </div>
        <div className="col reply">
          <div className="ico view-m">
            <FontAwesomeIcon icon={faReply} />
          </div>
          <div className="toptit">
            <p className="h1">
              <strong>魔法のポプコ</strong>
              <span className="d1">2022.06.01</span>
            </p>
          </div>
          <div className="conts">
            <p className="t1 t_lock">
              <FontAwesomeIcon icon={faLock} />
              販売者のみ確認できます。
            </p>
          </div>
        </div>

        <div className="botm">
          <a href="#">お問い合わせをもっと見る</a>
        </div>
      </div>
    </>
  );
};

export default InquiryItems;
