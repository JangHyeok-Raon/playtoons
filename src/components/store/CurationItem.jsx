import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faHeart } from "@fortawesome/pro-solid-svg-icons";
import {
  getCurationList,
  getCurationList as getCurationListAPI,
} from "@API/curationService";

const CurationItem = ({ item }) => {
  const [products, setProducts] = useState([]);

  const getCurationList = useCallback(async () => {
    const response = await getCurationListAPI(item?.curation?.id);
    if (response?.status === 200) {
      setProducts(response?.data?.products);
    }
  }, [item]);

  useEffect(() => {
    getCurationList();
  }, []);

  return (
    <div className="main_area">
      <div className="inr-c">
        <div className="hd_titbox">
          <h2 className="m_tit1 mb0">{item?.curation?.title}</h2>
          <a href="#" className="rgh btn-pk n blue2">
            <span className="ico_arr_link">
              すべてみる
              <FontAwesomeIcon icon={faAngleRight} />
            </span>
          </a>
        </div>
        <div className="lst_store1 mb0 widn">
          <div className="cx">
            <a href="#">
              {products?.saleRatio && (
                <div className="cx_per">{products?.saleRatio}%</div>
              )}

              <div className="cx_thumb">
                <span>
                  <img src={require("@IMAGES/tmp_comic1.jpg")} alt="사진" />
                </span>
                <p className="t_like">
                  <FontAwesomeIcon icon={faHeart} />
                  <span>1.2k</span>
                </p>
              </div>
              <div className="cx_txt">
                <p className="h1">
                  大学のリンゴ一個の重さで10メートルペンとハウスセットと本棚セット
                </p>
                <div className="btm">
                  <div className="t_profile">
                    <ImgSpan
                      className="im"
                      bgImg={require("@IMAGES/img_profile.png")}
                    ></ImgSpan>
                    <span>
                      Studio reBornStudio reBornStudio reBornStudio reBorn
                    </span>
                  </div>
                  <p className="c1">
                    <span className="line">2000PC</span>
                    <strong className="b">7200PC</strong>
                  </p>
                </div>
              </div>
            </a>
          </div>
          <div className="cx">
            <a href="#">
              <div className="cx_per">60%</div>
              <div className="cx_thumb">
                <span>
                  <img src={require("@IMAGES/tmp_comic1.jpg")} alt="사진" />
                </span>
                <p className="t_like">
                  <FontAwesomeIcon icon={faHeart} />
                  <span>1.2k</span>
                </p>
              </div>
              <div className="cx_txt">
                <p className="h1">
                  大学のリンゴ一個の重さで10メートルペンとハウスセットと本棚セット
                </p>
                <div className="btm">
                  <div className="t_profile">
                    <ImgSpan
                      className="im"
                      bgImg={require("@IMAGES/img_profile.png")}
                    ></ImgSpan>
                    <span>名前のない</span>
                  </div>
                  <p className="c1">
                    <span className="line">2000PC</span>
                    <strong className="b">7200PC</strong>
                  </p>
                </div>
              </div>
            </a>
          </div>
          <div className="cx">
            <a href="#">
              <div className="cx_per">60%</div>
              <div className="cx_thumb">
                <span>
                  <img src={require("@IMAGES/tmp_comic1.jpg")} alt="사진" />
                </span>
                <p className="t_like">
                  <FontAwesomeIcon icon={faHeart} />
                  <span>1.2k</span>
                </p>
              </div>
              <div className="cx_txt">
                <p className="h1">
                  大学のリンゴ一個の重さで10メートルペンとハウスセットと本棚セット
                </p>
                <div className="btm">
                  <div className="t_profile">
                    <ImgSpan
                      className="im"
                      bgImg={require("@IMAGES/img_profile.png")}
                    ></ImgSpan>
                    <span>Studio reBornStudio reBorn</span>
                  </div>
                  <p className="c1">
                    <span className="line">2000PC</span>
                    <strong className="b">7200PC</strong>
                  </p>
                </div>
              </div>
            </a>
          </div>
          <div className="cx">
            <a href="#">
              <div className="cx_per">60%</div>
              <div className="cx_thumb">
                <span>
                  <img src={require("@IMAGES/tmp_comic1.jpg")} alt="사진" />
                </span>
                <p className="t_like">
                  <FontAwesomeIcon icon={faHeart} />
                  <span>1.2k</span>
                </p>
              </div>
              <div className="cx_txt">
                <p className="h1">
                  大学のリンゴ一個の重さで10メートルペンとハウスセットと本棚セット
                </p>
                <div className="btm">
                  <div className="t_profile">
                    <ImgSpan
                      className="im"
                      bgImg={require("@IMAGES/img_profile.png")}
                    ></ImgSpan>
                    <span>Studio reBornStudio reBorn</span>
                  </div>
                  <p className="c1">
                    <span className="line">2000PC</span>
                    <strong className="b">7200PC</strong>
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const ImgSpan = styled.span`
  background-image: url(${(props) => props.bgImg});
`;

export default CurationItem;
