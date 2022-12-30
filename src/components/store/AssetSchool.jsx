import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faHeart } from "@fortawesome/pro-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/pro-light-svg-icons";

const AssetSchool = ({ openSearch }) => {
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
      <div className="main_sch">
        <div className="inr-c">
          <div className="lft">
            <Link to="" className="btn-pk n blue bdrs">
              すべて
            </Link>
            <button
              type="button"
              className="btn_sch_input"
              onClick={() => openSearch()}
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} /> ハッシュタグ検索
            </button>

            <Link to="" className="btn-pk n blue2 bdrs">
              異世界
              <button type="button" className="btn_sch_del">
                <FontAwesomeIcon icon={faCircleXmark} />
              </button>
            </Link>
            <Link to="" className="btn-pk n blue2 bdrs">
              SF
              <button type="button" className="btn_sch_del">
                <FontAwesomeIcon icon={faCircleXmark} />
              </button>
            </Link>
            <Link to="" className="btn-pk n blue2 bdrs">
              恋愛
              <button type="button" className="btn_sch_del">
                <FontAwesomeIcon icon={faCircleXmark} />
              </button>
            </Link>
            <Link to="" className="btn-pk n blue2 bdrs">
              アクション
              <button type="button" className="btn_sch_del">
                <FontAwesomeIcon icon={faCircleXmark} />
              </button>
            </Link>
            <Link to="" className="btn-pk n blue2 bdrs">
              日常
              <button type="button" className="btn_sch_del">
                <FontAwesomeIcon icon={faCircleXmark} />
              </button>
            </Link>
            <Link to="" className="btn-pk n blue2 bdrs">
              その他
              <button type="button" className="btn_sch_del">
                <FontAwesomeIcon icon={faCircleXmark} />
              </button>
            </Link>
          </div>
          <div className="rgh mty1">
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
        </div>
      </div>

      <div className="main_area">
        <div className="inr-c">
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

export default AssetSchool;
