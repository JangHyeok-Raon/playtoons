import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Author = () => {
  return (
    <div className="area_schmain2 inr-c">
      <div className="lst_sch_profile">
        <div className="box_profile">
          <div className="pf_thumb bind3">
            <ImgDiv bgImg={require("@IMAGES/tmp_profile_bg.png")}></ImgDiv>
            <ImgDiv bgImg={require("@IMAGES/tmp_profile_bg.png")}></ImgDiv>
            <ImgDiv bgImg={require("@IMAGES/tmp_profile_bg.png")}></ImgDiv>
          </div>
          <div className="pf_txt">
            <div className="icon">
              <img src={require("@IMAGES/img_profile.png")} alt="profile" />
            </div>
            <p className="h1">
              名前のない人間23349名前のない人間23349名前のない人間23349名前のない人間23349
            </p>
            <p className="t1">
              はみんぐです。アニメーター、イラスト、MV制作🥀🥀 音
              楽、ファッション、夜と光の絵。
              ポートフォリオ…ポーフォリファッション、夜と光の絵。
              夜と光の絵。ポートフォリオ…ポートフォリ
              はみんぐです。アニメーター、イラスト、MV制作🥀🥀 音
              楽、ファッション、夜と光の絵。
              ポートフォリオ…ポーフォリファッション、夜と光の絵はみんぐです。アニメーター、イラスト、MV制作🥀🥀
              音 楽、ファッション、夜と光の絵。
              ポートフォリオ…ポーフォリファッション、夜と光の絵。
              夜と光の絵。ポートフォリオ…ポートフォリ
              はみんぐです。アニメーター、イラスト、MV制作🥀🥀 音
              楽、ファッション、夜と光の絵。
              ポートフォリオ…ポーフォリファッション、夜と光の絵…
            </p>
            <div className="btns">
              <Link to="" className="btn-pk n blue">
                <span>フォロー</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ImgDiv = styled.div`
  background-image: url(${(props) => props.bgImg});
`;

export default Author;
