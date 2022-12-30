import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faCircleChevronLeft,
  faCircleChevronRight,
  faHeart,
} from "@fortawesome/pro-solid-svg-icons";

const Search = () => {
  const [selectTab, setSelectTab] = useState("SEARCH");
  return (
    <>
      <div className="hd_tabbox">
        <div className="tabs ty1">
          <ul className="inr-c">
            <li
              className={selectTab === "SEARCH" ? "on" : ""}
              onClick={() => setSelectTab("SEARCH")}
            >
              <Link to="">
                <span>探索</span>
              </Link>
            </li>
            <li
              className={selectTab === "STORE" ? "on" : ""}
              onClick={() => setSelectTab("STORE")}
            >
              <Link to="">
                <span>マケットプレイス</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="top_search inr-c">
        <h2 className="m_tit1">
          <span className="c-blue">“エヴァンゲリオン”</span>の検索結果 4112件
        </h2>
        <div className="in ty1">
          <div className="lft">
            <div className="tabs ty2">
              <ul>
                <li className="on">
                  <a href="#">すべて</a>
                </li>
                <li>
                  <a href="#">シリーズ</a>
                </li>
                <li>
                  <a href="#">ハッシュタグ</a>
                </li>
                <li>
                  <a href="#">クリエイター</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="rgh">
            <div className="btn_select1">
              <button type="button" className="select_tit">
                おすすめ順
              </button>
              <div className="select_list">
                <ul>
                  <li>
                    <a href="#">おすすめ順</a>
                  </li>
                  <li>
                    <a href="#">最新順</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="area_schmain inr-c">
        <div className="hd_titbox">
          <h2 className="m_tit1 mb0">人気</h2>
        </div>

        <div className="lst_comic1 long">
          <div id="mainSlider1" className="swiper-container mySwiper1">
            <div className="swiper-wrapper">
              <div className="cx swiper-slide">
                <a href="#">
                  <div className="cx_thumb">
                    <span>
                      <img src="../images/tmp/tmp_comic2.jpg" alt="사진" />
                    </span>
                    <p className="t_like">
                      <i className="fa-solid fa-heart"></i>
                      <span>1.2k</span>
                    </p>
                  </div>
                  {/*<!-- 202209 ico수정 -->*/}
                  <div className="cx_txt">
                    <p className="t1 c-blue">ウェブトゥーン</p>
                    <p className="h1">
                      大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル
                    </p>
                    <p className="t1">Studio reBorn</p>
                    {/*<!-- 202210 한줄로 되어있으면 두줄로  -->*/}
                    <p className="t1">43話</p>
                    {/*<!-- 202210 한줄로 되어있으면 두줄로  -->*/}
                  </div>
                </a>
              </div>
              <div className="cx swiper-slide">
                <a href="#">
                  <div className="cx_thumb">
                    <span>
                      <img src="../images/tmp/tmp_comic2.jpg" alt="사진" />
                    </span>
                    <p className="t_like">
                      <i className="fa-solid fa-heart"></i>
                      <span>1.2k</span>
                    </p>
                  </div>
                  {/*<!-- 202209 ico수정 -->*/}
                  <div className="cx_txt">
                    <p className="t1 c-blue">ウェブトゥーン</p>
                    <p className="h1">
                      大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル
                    </p>
                    <p className="t1">Studio reBorn</p>
                    <p className="t1">43話</p>
                  </div>
                </a>
              </div>
              <div className="cx swiper-slide">
                <a href="#">
                  <div className="cx_thumb">
                    <span>
                      <img src="../images/tmp/tmp_comic2.jpg" alt="사진" />
                    </span>
                    <p className="t_like">
                      <i className="fa-solid fa-heart"></i>
                      <span>1.2k</span>
                    </p>
                  </div>
                  {/*<!-- 202209 ico수정 -->*/}
                  <div className="cx_txt">
                    <p className="t1 c-blue">ウェブトゥーン</p>
                    <p className="h1">
                      大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル
                    </p>
                    <p className="t1">Studio reBorn</p>
                    <p className="t1">43話</p>
                  </div>
                </a>
              </div>
              <div className="cx swiper-slide">
                <a href="#">
                  <div className="cx_thumb">
                    <span>
                      <img src="../images/tmp/tmp_comic2.jpg" alt="사진" />
                    </span>
                    <p className="t_like">
                      <i className="fa-solid fa-heart"></i>
                      <span>1.2k</span>
                    </p>
                  </div>
                  {/*<!-- 202209 ico수정 -->*/}
                  <div className="cx_txt">
                    <p className="t1 c-blue">ウェブトゥーン</p>
                    <p className="h1">
                      大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル
                    </p>
                    <p className="t1">Studio reBorn</p>
                    <p className="t1">43話</p>
                  </div>
                </a>
              </div>
              <div className="cx swiper-slide">
                <a href="#">
                  <div className="cx_thumb">
                    <span>
                      <img src="../images/tmp/tmp_comic2.jpg" alt="사진" />
                    </span>
                    <p className="t_like">
                      <i className="fa-solid fa-heart"></i>
                      <span>1.2k</span>
                    </p>
                  </div>
                  {/*<!-- 202209 ico수정 -->*/}
                  <div className="cx_txt">
                    <p className="t1 c-blue">ウェブトゥーン</p>
                    <p className="h1">
                      大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル
                    </p>
                    <p className="t1">Studio reBorn</p>
                    <p className="t1">43話</p>
                  </div>
                </a>
              </div>
              <div className="cx swiper-slide">
                <a href="#">
                  <div className="cx_thumb">
                    <span>
                      <img src="../images/tmp/tmp_comic2.jpg" alt="사진" />
                    </span>
                    <p className="t_like">
                      <i className="fa-solid fa-heart"></i>
                      <span>1.2k</span>
                    </p>
                  </div>
                  {/*<!-- 202209 ico수정 -->*/}
                  <div className="cx_txt">
                    <p className="t1 c-blue">ウェブトゥーン</p>
                    <p className="h1">
                      大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル
                    </p>
                    <p className="t1">Studio reBorn</p>
                    <p className="t1">43話</p>
                  </div>
                </a>
              </div>
              <div className="cx swiper-slide">
                <a href="#">
                  <div className="cx_thumb">
                    <span>
                      <img src="../images/tmp/tmp_comic2.jpg" alt="사진" />
                    </span>
                    <p className="t_like">
                      <i className="fa-solid fa-heart"></i>
                      <span>1.2k</span>
                    </p>
                  </div>
                  {/*<!-- 202209 ico수정 -->*/}
                  <div className="cx_txt">
                    <p className="t1 c-blue">ウェブトゥーン</p>
                    <p className="h1">
                      大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル
                    </p>
                    <p className="t1">Studio reBorn</p>
                    <p className="t1">43話</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <button type="button" className="swiper-button-prev bt_mainSlider1">
            <FontAwesomeIcon icon={faCircleChevronLeft} />
          </button>
          <button type="button" className="swiper-button-next bt_mainSlider1">
            <FontAwesomeIcon icon={faCircleChevronRight} />
          </button>
        </div>
      </div>

      <div className="area_schmain inr-c">
        <div className="hd_titbox">
          <h2 className="m_tit1 mb0">シリーズ</h2>
          <a href="#" className="rgh btn-pk n blue2">
            <span className="ico_arr_link">
              すべてみる <FontAwesomeIcon icon={faAngleRight} />
            </span>
          </a>
        </div>
        <div className="lst_main_comic">
          <ul>
            <li>
              <a href="#">
                <div className="cx_thumb">
                  <span>
                    <img src={require("@IMAGES/tmp_comic2.jpg")} alt="사진" />
                  </span>
                  <p className="t_like">
                    <FontAwesomeIcon icon={faHeart} />
                    <span>1.2k</span>
                  </p>
                </div>
                {/*<!-- 202209 ico수정 -->*/}
                <div className="cx_txt">
                  <p className="h1">シェルター・アークシェルター・アーク</p>
                  <p className="t1">Studio reBorn</p>
                  <p className="t1 c-gray">96話</p>
                  <div className="lst_tag">
                    <div className="i_tag">#男性におすすめ</div>
                    <div className="i_tag">#異世界</div>
                    <div className="i_tag">#初公開</div>
                    <div className="i_tag">#SF</div>
                    <div className="i_tag">#BL</div>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div className="cx_thumb">
                  <span>
                    <img src={require("@IMAGES/tmp_comic2.jpg")} alt="사진" />
                  </span>
                  <p className="t_like">
                    <FontAwesomeIcon icon={faHeart} />
                    <span>1.2k</span>
                  </p>
                </div>
                {/*<!-- 202209 ico수정 -->*/}
                <div className="cx_txt">
                  <p className="h1">シェルター・アーク</p>
                  <p className="t1">Studio reBorn</p>
                  <p className="t1 c-gray">96話</p>
                  <div className="lst_tag">
                    <div className="i_tag">#男性におすすめ</div>
                    <div className="i_tag">#異世界</div>
                    <div className="i_tag">#初公開</div>
                    <div className="i_tag">#SF</div>
                    <div className="i_tag">#BL</div>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div className="cx_thumb">
                  <span>
                    <img src={require("@IMAGES/tmp_comic2.jpg")} alt="사진" />
                  </span>
                  <p className="t_like">
                    <FontAwesomeIcon icon={faHeart} />
                    <span>1.2k</span>
                  </p>
                </div>
                {/*<!-- 202209 ico수정 -->*/}
                <div className="cx_txt">
                  <p className="h1">シェルター・アーク</p>
                  <p className="t1">Studio reBorn</p>
                  <p className="t1 c-gray">96話</p>
                  <div className="lst_tag">
                    <div className="i_tag">#男性におすすめ</div>
                    <div className="i_tag">#異世界</div>
                    <div className="i_tag">#初公開</div>
                    <div className="i_tag">#SF</div>
                    <div className="i_tag">#BL</div>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div className="cx_thumb">
                  <span>
                    <img src={require("@IMAGES/tmp_comic2.jpg")} alt="사진" />
                  </span>
                  <p className="t_like">
                    <FontAwesomeIcon icon={faHeart} />
                    <span>1.2k</span>
                  </p>
                </div>
                {/*<!-- 202209 ico수정 -->*/}
                <div className="cx_txt">
                  <p className="h1">シェルター・アーク</p>
                  <p className="t1">Studio reBorn</p>
                  <p className="t1 c-gray">96話</p>
                  <div className="lst_tag">
                    <div className="i_tag">#男性におすすめ</div>
                    <div className="i_tag">#異世界</div>
                    <div className="i_tag">#初公開</div>
                    <div className="i_tag">#SF</div>
                    <div className="i_tag">#BL</div>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div className="cx_thumb">
                  <span>
                    <img src={require("@IMAGES/tmp_comic2.jpg")} alt="사진" />
                  </span>
                  <p className="t_like">
                    <FontAwesomeIcon icon={faHeart} />
                    <span>1.2k</span>
                  </p>
                </div>
                {/*<!-- 202209 ico수정 -->*/}
                <div className="cx_txt">
                  <p className="h1">シェルター・アーク</p>
                  <p className="t1">Studio reBorn</p>
                  <p className="t1 c-gray">96話</p>
                  <div className="lst_tag">
                    <div className="i_tag">#男性におすすめ</div>
                    <div className="i_tag">#異世界</div>
                    <div className="i_tag">#初公開</div>
                    <div className="i_tag">#SF</div>
                    <div className="i_tag">#BL</div>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div className="cx_thumb">
                  <span>
                    <img src={require("@IMAGES/tmp_comic2.jpg")} alt="사진" />
                  </span>
                  <p className="t_like">
                    <FontAwesomeIcon icon={faHeart} />
                    <span>1.2k</span>
                  </p>
                </div>
                {/*<!-- 202209 ico수정 -->*/}
                <div className="cx_txt">
                  <p className="h1">シェルター・アーク</p>
                  <p className="t1">Studio reBorn</p>
                  <p className="t1 c-gray">96話</p>
                  <div className="lst_tag">
                    <div className="i_tag">#男性におすすめ</div>
                    <div className="i_tag">#異世界</div>
                    <div className="i_tag">#初公開</div>
                    <div className="i_tag">#SF</div>
                    <div className="i_tag">#BL</div>
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="area_schmain inr-c">
        <div className="hd_titbox">
          <h2 className="m_tit1 mb0">クリエーター</h2>
          <a href="#" className="rgh btn-pk n blue2">
            <span className="ico_arr_link">
              すべてみる <FontAwesomeIcon icon={faAngleRight} />
            </span>
          </a>
        </div>
        <div className="slider_profile">
          <div className="box_profile">
            <a href="#">
              <ImgDiv
                className="pf_thumb"
                bgImg={require("@IMAGES/tmp_profile_bg.png")}
              ></ImgDiv>
              <div className="pf_txt">
                <div className="icon">
                  <img src={require("@IMAGES/img_profile.png")} alt="profile" />
                </div>
                <p className="h1">名前のない人間23349名前のない人間23349</p>
                <p className="t1">
                  はみんぐです。アニメーター、 イラスト、MV制作🥀🥀 音楽、
                  ファッション、夜と光の絵…
                </p>
              </div>
            </a>
          </div>
          <div className="box_profile">
            <a href="#">
              <ImgDiv
                className="pf_thumb"
                bgImg={require("@IMAGES/tmp_profile_bg.png")}
              ></ImgDiv>
              <div className="pf_txt">
                <div className="icon">
                  <img src={require("@IMAGES/img_profile.png")} alt="profile" />
                </div>
                <p className="h1">名前のない人間23349名前のない人間23349</p>
                <p className="t1">
                  はみんぐです。アニメーター、 イラスト、MV制作🥀🥀 音楽、
                  ファッション、夜と光の絵…
                </p>
              </div>
            </a>
          </div>
          <div className="box_profile">
            <a href="#">
              <ImgDiv
                className="pf_thumb"
                bgImg={require("@IMAGES/tmp_profile_bg.png")}
              ></ImgDiv>
              <div className="pf_txt">
                <div className="icon">
                  <img src={require("@IMAGES/img_profile.png")} alt="profile" />
                </div>
                <p className="h1">名前のない人間23349名前のない人間23349</p>
                <p className="t1">
                  はみんぐです。アニメーター、 イラスト、MV制作🥀🥀 音楽、
                  ファッション、夜と光の絵…
                </p>
              </div>
            </a>
          </div>
          <div className="box_profile">
            <a href="#">
              <ImgDiv
                className="pf_thumb"
                bgImg={require("@IMAGES/tmp_profile_bg.png")}
              ></ImgDiv>
              <div className="pf_txt">
                <div className="icon">
                  <img src={require("@IMAGES/img_profile.png")} alt="profile" />
                </div>
                <p className="h1">名前のない人間23349名前のない人間23349</p>
                <p className="t1">
                  はみんぐです。アニメーター、 イラスト、MV制作🥀🥀 音楽、
                  ファッション、夜と光の絵…
                </p>
              </div>
            </a>
          </div>
          <div className="box_profile">
            <a href="#">
              <ImgDiv
                className="pf_thumb"
                bgImg={require("@IMAGES/tmp_profile_bg.png")}
              ></ImgDiv>
              <div className="pf_txt">
                <div className="icon">
                  <img src={require("@IMAGES/img_profile.png")} alt="profile" />
                </div>
                <p className="h1">名前のない人間23349名前のない人間23349</p>
                <p className="t1">
                  はみんぐです。アニメーター、 イラスト、MV制作🥀🥀 音楽、
                  ファッション、夜と光の絵…
                </p>
              </div>
            </a>
          </div>
          <div className="box_profile">
            <a href="#">
              <ImgDiv
                className="pf_thumb"
                bgImg={require("@IMAGES/tmp_profile_bg.png")}
              ></ImgDiv>
              <div className="pf_txt">
                <div className="icon">
                  <img src={require("@IMAGES/img_profile.png")} alt="profile" />
                </div>
                <p className="h1">名前のない人間23349名前のない人間23349</p>
                <p className="t1">
                  はみんぐです。アニメーター、 イラスト、MV制作🥀🥀 音楽、
                  ファッション、夜と光の絵…
                </p>
              </div>
            </a>
          </div>
          <div className="box_profile">
            <a href="#">
              <ImgDiv
                className="pf_thumb"
                bgImg={require("@IMAGES/tmp_profile_bg.png")}
              ></ImgDiv>
              <div className="pf_txt">
                <div className="icon">
                  <img src={require("@IMAGES/img_profile.png")} alt="profile" />
                </div>
                <p className="h1">名前のない人間23349名前のない人間23349</p>
                <p className="t1">
                  はみんぐです。アニメーター、 イラスト、MV制作🥀🥀 音楽、
                  ファッション、夜と光の絵…
                </p>
              </div>
            </a>
          </div>
          <div className="box_profile">
            <a href="#">
              <ImgDiv
                className="pf_thumb"
                bgImg={require("@IMAGES/tmp_profile_bg.png")}
              ></ImgDiv>
              <div className="pf_txt">
                <div className="icon">
                  <img src={require("@IMAGES/img_profile.png")} alt="profile" />
                </div>
                <p className="h1">名前のない人間23349名前のない人間23349</p>
                <p className="t1">
                  はみんぐです。アニメーター、 イラスト、MV制作🥀🥀 音楽、
                  ファッション、夜と光の絵…
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

const ImgDiv = styled.div`
  background-image: url(${(props) => props.bgImg});
`;

export default Search;
