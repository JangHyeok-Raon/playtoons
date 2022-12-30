import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import EulaPopup from "@COMPONENTS/EulaPopup";
import { setMenuShow } from "@/modules/redux/ducks/container";

const Register = () => {
  const dispatch = useDispatch();
  const [isEulaPopupShow, setIsEulaPopupShow] = useState(false);

  useEffect(() => {
    dispatch(setMenuShow(false));
  }, [dispatch]);

  return (
    <>
      <div id="container" className="container author_main">
        <div className="bxMain">
          <div className="bg">
            <span className="hide-m">
              <img src={require("@IMAGES/visual_author.png")} alt="" />
            </span>
            <span className="view-m">
              <img src={require("@IMAGES/visual_author_m.png")} alt="" />
            </span>
          </div>
          <div className="cont">
            <p className="h1">誰でも感じられる創作の楽しさ</p>
            <p className="t1">
              クリエイターになって自分の作品を <br />
              世界に広め、収益を得よう！
            </p>
            <button
              className="btn-pk blue bdrs"
              onClick={() => setIsEulaPopupShow(!isEulaPopupShow)}
            >
              クリエイターになる
            </button>
          </div>
        </div>

        <div className="area_main mmain1">
          <div className="inr-c">
            <div className="lft">
              <h2 className="h_tit0">コンテンツで繋ぐ</h2>
              <p className="t1">
                あなたが好きなファンのための
                <br />
                専用コンテンツを製作してシェアでき、
                <br />
                ファンともっと緊密にコミュニケーションする
                <br />
                ことができます。国境を越えて、
                <br />
                あなたのコンテンツがユーザーとつながる
                <br />
                素晴らしい経験を体験してみてください！
              </p>
            </div>
            <div className="rgh">
              <img src={require("@IMAGES/main_1.png")} alt="" />
            </div>
          </div>
        </div>

        <div className="area_main mmain2">
          <div className="inr-c">
            <h2 className="h_tit0">収益を得る活動</h2>
            <ul className="list">
              <li>
                <div className="thumb">
                  <ImgBgSpan bgImg={require("@IMAGES/main2_1.png")}></ImgBgSpan>
                </div>
                <div className="txt">
                  <p className="h1">投稿</p>
                  <p className="t1">
                    ウェブトゥーン、ウェブ小説、写真集など
                    <br />
                    様々な分野のコンテンツを
                    <br />
                    有料でアップできます。
                  </p>
                </div>
              </li>
              <li>
                <div className="thumb">
                  <ImgBgSpan bgImg={require("@IMAGES/main2_2.png")}></ImgBgSpan>
                </div>
                <div className="txt">
                  <p className="h1">支援</p>
                  <p className="t1">
                    「支援」という機能で、
                    <br />
                    ファンにコンテンツを限定的に
                    <br />
                    提供することができます。
                  </p>
                </div>
              </li>
              <li>
                <div className="thumb">
                  <ImgBgSpan bgImg={require("@IMAGES/main2_3.png")}></ImgBgSpan>
                </div>
                <div className="txt">
                  <p className="h1">マケットに登録</p>
                  <p className="t1">
                    ウェブトゥーンクリエイターのための
                    <br />
                    3Dアセット、企業向けAPI、ePubなどを
                    <br />
                    販売することができます。
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="area_main mmain3">
          <div className="inr-c">
            <ul className="list1">
              <li>
                <p>
                  ユーザーが作成したコメントに
                  <br />
                  返信してコミュニケーションを！
                </p>
              </li>
              <li>
                <p>
                  投稿したコンテンツで
                  <br />
                  ユーザーさんの色々な反応が！
                </p>
              </li>
            </ul>

            <div className="imgs">
              <div>
                <span className="hide-m">
                  <img src={require("@IMAGES/main_3.png")} alt="" />
                </span>
                <span className="view-m">
                  <img src={require("@IMAGES/main_3m.png")} alt="" />
                </span>
              </div>
            </div>

            <ul className="list2">
              <li>
                <p>
                  フォロー数を増やして
                  <br />
                  インフルエンサーになれる！
                </p>
              </li>
              <li>
                <p>
                  ユーザーがファンになり、
                  <br />
                  安定なクリエイター活動ができる！
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="area_main mmain4">
          <div className="inr-c">
            <div className="lft">
              <h2 className="h_tit0">みつけてもらおう、自分の活かし方。</h2>
              <p className="t1">
                今すぐ、クリエイターになって <br />
                創作活動をしましょう！
              </p>

              <button
                className="btn-pk blue bdrs"
                onClick={() => setIsEulaPopupShow(!isEulaPopupShow)}
              >
                クリエイターになる
              </button>
            </div>
            <div className="rgh">
              <img src={require("@IMAGES/main_4.png")} alt="" />
              <p className="desc_copy">&copy;Studio reBorn</p>
            </div>
          </div>
        </div>
      </div>

      {isEulaPopupShow && (
        <EulaPopup handleClose={() => setIsEulaPopupShow(false)} />
      )}
    </>
  );
};

const ImgBgSpan = styled.span`
  background-image: url(${(props) => props.bgImg});
`;

export default Register;
