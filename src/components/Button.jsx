import React from "react";
import styled from "styled-components";
import { Body1, Border05pxTiara } from "@/styledMixins";

const LoginTxtSns = styled.span`
  ${Body1}
  flex: 1;
  font-weight: 700;
  white-space: nowrap;
  text-align: center;
  align-self: center;
  color: var(${(props) => props.color});
`;

const BtnStyle = styled.div`
  ${Border05pxTiara}
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  display: flex;
  margin-top: ${(props) => props.marginTop};
  margin-bottom: ${(props) => props.marginBottom};
  margin-left: ${(props) => props.marginLeft};
  margin-right: ${(props) => props.marginRight};
  border-radius: ${(props) => props.borderRadius};
  text-align: center;
  cursor: pointer;
  background-color: var(${(props) => props.bgColor});
  background-image: url(${(props) => props.bgImage});
  background-repeat: no-repeat;
  background-size: 24px 24px;
  background-position: 30px center;
  border-width: 1px;
  border-style: solid;
  border-color: var(${(props) => props.bdColor});
`;

const Button = ({
  text,
  snsType,
  color,
  bgColor,
  bdColor,
  width = "400px",
  height = "40px",
  borderRadius = "20px",
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  callback,
}) => {
  let bgImage;

  switch (snsType) {
    case "GOOGLE":
      bgImage = require("@ICONS/authlogin-ico-google.png");
      break;
    case "TWITTER":
      bgImage = require("@ICONS/authlogin-ico-twitter.png");
      break;
    case "APPLE":
      bgImage = require("@ICONS/authlogin-ico-apple.png");
      break;
    default:
  }

  return (
    <BtnStyle
      bgImage={bgImage}
      bgColor={bgColor}
      bdColor={bdColor}
      onClick={callback}
      width={width}
      height={height}
      marginTop={marginTop}
      marginBottom={marginBottom}
      marginLeft={marginLeft}
      marginRight={marginRight}
      borderRadius={borderRadius}
    >
      <LoginTxtSns className="login-txt-sns" color={color}>
        {text}
      </LoginTxtSns>
    </BtnStyle>
  );
};

export default Button;
