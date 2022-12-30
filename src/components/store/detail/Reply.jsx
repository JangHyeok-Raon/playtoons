import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar } from "@fortawesome/pro-solid-svg-icons";
import { convertContraction } from "@/common/common";

const Favorit = () => {
  return (
    <div className="box_drop box_favorit">
      <ul>
        <li>
          <button type="button">
            <span className="i_favorit1">313</span>
          </button>
        </li>
        <li>
          <button type="button">
            <span className="i_favorit2">414</span>
          </button>
        </li>
        <li>
          <button type="button">
            <span className="i_favorit3">1.2k</span>
          </button>
        </li>
        <li>
          <button type="button">
            <span className="i_favorit4">512</span>
          </button>
        </li>
        <li>
          <button type="button">
            <span className="i_favorit5">512</span>
          </button>
        </li>
        <li>
          <button type="button">
            <span className="i_favorit6">0</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

const Comment = ({ item }) => {
  const [favoritShow, setFavoritShow] = useState(false);
  return (
    <>
      <div className="col">
        <div className="toptit">
          <div className="imgs">
            <ImgSpan bgImg={item?.profileImage}></ImgSpan>
          </div>
          <div>
            <p className="h1">{item?.title}</p>
            <div className="t_star">
              <span className={`s${item?.starCount}`}>
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
              </span>
            </div>
            <p className="d1">{item?.date}</p>
          </div>
          <div className="rgh">
            {/*<!-- 이미 누른것엔 on 추가 -->*/}
            <button
              type="button"
              className="btn01 on"
              onClick={() => setFavoritShow(!favoritShow)}
            >
              <FontAwesomeIcon icon={faHeart} />
              {convertContraction(item?.likeCount)}
            </button>
            {favoritShow && <Favorit />}
          </div>
        </div>
        <div className="conts">
          <p className="t1">{item?.content}</p>
        </div>
      </div>
    </>
  );
};

const ImgSpan = styled.span`
  background-image: url(${(props) => props.bgImg});
`;

export default Comment;
