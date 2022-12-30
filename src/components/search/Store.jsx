import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronLeft, faHeart } from "@fortawesome/pro-solid-svg-icons";
import { Link } from "react-router-dom";

const Store = () => {
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
      <div className="top_search inr-c">
        <h2 className="m_tit1">
          <span className="c-blue">“学校”</span>の検索結果 4112件
        </h2>

        <div className="box_category">
          <div className="tit">カテゴリ</div>
          <div className="cont">
            {/*<!-- 첫번째? 하위메뉴 있음-->*/}
            <ul>
              <li>
                <Link to="">すべて(3841)</Link>
              </li>
              <li>
                <Link to="">学校(1231)</Link>
              </li>
              <li>
                <Link to="">epub(123)</Link>
              </li>
              <li>
                <Link to="">api(11)</Link>
              </li>
            </ul>

            <p className="h1">
              <Link to="">
                <FontAwesomeIcon icon={faCircleChevronLeft} />
                学校(3841)
              </Link>
            </p>
            <ul className="dep2">
              <li>
                <Link to="">すべて(3841)</Link>
              </li>
              <li>
                <Link to="">学校(1231)</Link>
              </li>
              <li>
                <Link to="">epub(123)</Link>
              </li>
              <li>
                <Link to="">api(11)</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="sel ta-r">
          <label className="inp_checkbox">
            <input type="checkbox" />
            <span>skp/cs3o</span>
          </label>
          <label className="inp_checkbox">
            <input type="checkbox" />
            <span>obj/fbx</span>
          </label>
          <div className="btn_select1">
            <button
              type="button"
              className="select_tit"
              onClick={() => setIsOrderOpen(!isOrderOpen)}
            >
              {selectOrder.name}
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
      </div>

      <div className="area_schmain2 inr-c">
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
    </>
  );
};

const ImgSpan = styled.div`
  background-image: url(${(props) => props.bgImg});
`;

export default Store;
