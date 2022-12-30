import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="main_area mb1">
      <div className="ad_longad1">
        <div className="inr-c">
          <div className="imgs">
            <ImgBgSpan bgImg={require("@IMAGES/longad_img.png")}></ImgBgSpan>
          </div>
          <div className="txt">
            <p className="h1">クリエイターになる</p>
            <p className="t1">自分の作品を世界に届けよう！</p>
            <Link to="/author/register" className="btn-pk bdrs">
              詳しくみる
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const ImgBgSpan = styled.span`
  background-image: url(${(props) => props.bgImg});
`;

export default Register;
