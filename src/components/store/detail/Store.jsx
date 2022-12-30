import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faShare } from "@fortawesome/pro-solid-svg-icons";
import Comments from "./Comments";
import { getProductDetail } from "@API/storeService";

const Store = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);

  const getProduct = async (id) => {
    try {
      const response = await getProductDetail(id);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (params.id) {
      setLoading(true);
      getProduct(params.id);
    }
  }, [params.id]);

  return (
    <div className="contents">
      {!loading && (
        <div className="wrap_store_detail">
          <div className="store_dcont">
            <div className="tit_btn">
              <button type="button" className="btn_back view-m">
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
            <div className="tit_sd">
              <div className="box_timesale view-m">
                {/*<!-- 모바일에서 위치 변경 : 모바일 -->*/}
                <p>
                  セール終了まで <strong className="c-green">09:12:10</strong>
                </p>
              </div>

              <h2 className="h1">大学のリンゴ一個の重さで10メートルの素材</h2>
              <div className="lst_tag">
                <div className="i_tag">#アクション</div>
                <div className="i_tag">#異世界</div>
              </div>
            </div>

            <div className="cont_sd">
              <img src={require("@IMAGES/tmp_comic3.png")} alt="" />
            </div>
            <button type="button" className="btn-pk n gray w100p view-m">
              もっとみる
            </button>
          </div>

          <div className="store_dcost">
            <div className="box_timesale hide-m">
              {/*<!-- 모바일에서 위치 변경  : PC-->*/}
              <p>
                セール終了まで <strong className="c-green">09:12:10</strong>
              </p>
            </div>

            <div className="box_profile">
              <ImgDiv
                className="pf_thumb"
                bgImg={require("@IMAGES/tmp_profile_bg.png")}
              ></ImgDiv>
              <div className="pf_txt">
                <div className="icon">
                  <img src={require("@IMAGES/img_profile.png")} alt="profile" />
                </div>
                <p className="h1">名前のない人間23349名前のない人間23349</p>
                <div className="btns">
                  <a href="#" className="btn-pk n blue">
                    <span>フォロー</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="box_scost">
              <h2 className="tit">商品の詳細</h2>
              <div className="txt">
                <ul>
                  <li>
                    <span>ファイル形式</span>
                    <span>.OBJ</span>
                  </li>
                  <li>
                    <span>作業期限</span>
                    <span>2-3日</span>
                  </li>
                  <li>
                    <span>ライセンス</span>
                    <span>ビジネス利用可</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="box_scost">
              <h2 className="tit">価格オプション</h2>
              <div className="txt">
                <p>すべての資料をPSD化</p>
                <select name="" id="" className="select1">
                  <option value="">オプション選択</option>
                </select>
                <p>ファイル</p>
                <select name="" id="" className="select1">
                  <option value="">オプション選択</option>
                </select>
              </div>
            </div>

            <div className="btn-bot">
              <div className="cost">
                <p>参考価格</p>
                <p className="sale">
                  <em>30%</em>
                  <span>123,456,879PC</span>
                </p>
              </div>
              <div className="cost">
                <p>合計金額</p>
                <p className="c-blue">
                  <strong>934,010PC</strong>
                </p>
              </div>
              <button type="button" className="btn-pk b blue w100p">
                <span>購入する</span>
              </button>
            </div>
          </div>

          <Comments />
        </div>
      )}
    </div>
  );
};

const ImgDiv = styled.div`
  background-image: url(${(props) => props.bgImg});
`;

export default Store;
