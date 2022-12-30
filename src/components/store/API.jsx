import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/pro-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/pro-light-svg-icons";
import { faChevronRight } from "@fortawesome/pro-regular-svg-icons";

const API = ({ openSearch }) => {
  const orderTypes = [
    {
      code: "RECOMMEND",
      name: "おすすめ順",
    },
    {
      code: "LATEST",
      name: "最新順",
    },
  ];
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [selectOrder, setSelectOrder] = useState(orderTypes[0]);

  const handleOrderChange = useCallback((item) => {
    setSelectOrder(item);
    setIsOrderOpen(false);
  }, []);

  return (
    <>
      <div className="main_sch2 inr-c">
        <div className="lft path">
          <p>
            ホーム
            <FontAwesomeIcon icon={faChevronRight} />
          </p>
          <p className="current">API</p>
        </div>
        <div className="rgh">
          <div className="box_sch">
            <button type="button" className="btns">
              <span>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </span>
            </button>
            <input type="text" className="inp_txt" placeholder="商品名" />
          </div>
        </div>
      </div>

      <div className="main_area">
        <div className="inr-c">
          <div className="main_sch_ty1 ta-r">
            <div className="btn_select1">
              <button
                type="button"
                className="select_tit"
                onClick={() => setIsOrderOpen(!isOrderOpen)}
              >
                {selectOrder?.name}
              </button>
              {isOrderOpen && (
                <div className="select_list">
                  <ul>
                    {orderTypes.map((item, index) => (
                      <li
                        key={`orderType_${index}`}
                        onClick={() => handleOrderChange(item)}
                      >
                        <Link to="">{item.name}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="lst_store1 widn">
            <div className="cx">
              <Link to="">
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
                      <strong>1000PC</strong>
                    </p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="cx">
              <Link to="">
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
                      <strong>1000PC</strong>
                    </p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="cx">
              <Link to="">
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
                      <strong>1000PC</strong>
                    </p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="cx">
              <Link to="">
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
                      <strong>1000PC</strong>
                    </p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="cx">
              <Link to="">
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
                      <strong>1000PC</strong>
                    </p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="cx">
              <Link to="">
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
                      <strong>1000PC</strong>
                    </p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="cx">
              <Link to="">
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
                      <strong>1000PC</strong>
                    </p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="cx">
              <Link to="">
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
                      <strong>1000PC</strong>
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const ImgSpan = styled.span`
  background-image: url(${(props) => props.bgImg});
`;

export default API;
