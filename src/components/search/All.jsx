import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faCircleChevronLeft,
  faCircleChevronRight,
  faHeart,
} from "@fortawesome/pro-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const All = () => {
  const location = useLocation();

  useEffect(() => {
    if (location?.state?.text) {
      // location?.state?.text 검색키워드
    }
  }, [location?.state?.text]);

  return (
    <>
      <div className="area_schmain inr-c">
        <div className="hd_titbox">
          <h2 className="m_tit1 mb0">人気</h2>
        </div>

        <div className="lst_comic1 long">
          <div id="mainSlider1" className="swiper-container mySwiper1">
            <div className="swiper-wrapper">
              <div className="cx swiper-slide">
                <Link to="">
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
                    <p className="t1 c-blue">ウェブトゥーン</p>
                    <p className="h1">
                      大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル
                    </p>
                    <p className="t1">Studio reBorn</p>
                    {/*<!-- 202210 한줄로 되어있으면 두줄로  -->*/}
                    <p className="t1">43話</p>
                    {/*<!-- 202210 한줄로 되어있으면 두줄로  -->*/}
                  </div>
                </Link>
              </div>
              <div className="cx swiper-slide">
                <Link to="">
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
                    <p className="t1 c-blue">ウェブトゥーン</p>
                    <p className="h1">
                      大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル
                    </p>
                    <p className="t1">Studio reBorn</p>
                    <p className="t1">43話</p>
                  </div>
                </Link>
              </div>
              <div className="cx swiper-slide">
                <Link to="">
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
                    <p className="t1 c-blue">ウェブトゥーン</p>
                    <p className="h1">
                      大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル
                    </p>
                    <p className="t1">Studio reBorn</p>
                    <p className="t1">43話</p>
                  </div>
                </Link>
              </div>
              <div className="cx swiper-slide">
                <Link to="">
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
                    <p className="t1 c-blue">ウェブトゥーン</p>
                    <p className="h1">
                      大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル
                    </p>
                    <p className="t1">Studio reBorn</p>
                    <p className="t1">43話</p>
                  </div>
                </Link>
              </div>
              <div className="cx swiper-slide">
                <Link to="">
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
                    <p className="t1 c-blue">ウェブトゥーン</p>
                    <p className="h1">
                      大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル
                    </p>
                    <p className="t1">Studio reBorn</p>
                    <p className="t1">43話</p>
                  </div>
                </Link>
              </div>
              <div className="cx swiper-slide">
                <Link to="">
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
                    <p className="t1 c-blue">ウェブトゥーン</p>
                    <p className="h1">
                      大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル
                    </p>
                    <p className="t1">Studio reBorn</p>
                    <p className="t1">43話</p>
                  </div>
                </Link>
              </div>
              <div className="cx swiper-slide">
                <Link to="">
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
                    <p className="t1 c-blue">ウェブトゥーン</p>
                    <p className="h1">
                      大学のリンゴ一個の重さで10メートル大学のリンゴ一個の重さで10メートル
                    </p>
                    <p className="t1">Studio reBorn</p>
                    <p className="t1">43話</p>
                  </div>
                </Link>
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
          <Link to="" className="rgh btn-pk n blue2">
            <span className="ico_arr_link">
              すべてみる <FontAwesomeIcon icon={faAngleRight} />
            </span>
          </Link>
        </div>
        <div className="lst_main_comic">
          <ul>
            <li>
              <Link to="">
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
              </Link>
            </li>
            <li>
              <Link to="">
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
              </Link>
            </li>
            <li>
              <Link to="">
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
              </Link>
            </li>
            <li>
              <Link to="">
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
              </Link>
            </li>
            <li>
              <Link to="">
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
              </Link>
            </li>
            <li>
              <Link to="">
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
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="area_schmain inr-c">
        <div className="hd_titbox">
          <h2 className="m_tit1 mb0">クリエーター</h2>
          <Link to="" className="rgh btn-pk n blue2">
            <span className="ico_arr_link">
              すべてみる <FontAwesomeIcon icon={faAngleRight} />
            </span>
          </Link>
        </div>
        <div className="slider_profile">
          <div className="box_profile">
            <Link to="">
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
            </Link>
          </div>
          <div className="box_profile">
            <Link to="">
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
            </Link>
          </div>
          <div className="box_profile">
            <Link to="">
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
            </Link>
          </div>
          <div className="box_profile">
            <Link to="">
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
            </Link>
          </div>
          <div className="box_profile">
            <Link to="">
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
            </Link>
          </div>
          <div className="box_profile">
            <Link to="">
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
            </Link>
          </div>
          <div className="box_profile">
            <Link to="">
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
            </Link>
          </div>
          <div className="box_profile">
            <Link to="">
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
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

const ImgDiv = styled.div`
  background-image: url(${(props) => props.bgImg});
`;

export default All;
