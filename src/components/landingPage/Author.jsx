import React, { useCallback } from "react";
import styled from "styled-components";
import useFilePath from "@/hook/useFilePath";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { currentAuthorInit } from "@/modules/redux/ducks/author";

const Author = ({ item }) => {
  const dispatch = useDispatch();
  const { filePath: backgroundImgURL, loading: backgroundImgLoading } =
    useFilePath(item?.backgroundImage);
  const { filePath: profileImgURL, loading: profileImgLoading } = useFilePath(
    item?.profileImage
  );

  const handleCurrentAuthorInit = useCallback(() => {
    dispatch(currentAuthorInit());
  }, [dispatch]);

  return (
    <div className="box_profile">
      <Link
        to={`/author/post/${item.id}`}
        state={{ item: item }}
        onClick={handleCurrentAuthorInit}
      >
        {!backgroundImgLoading && (
          <ImgTmpProfileBgDiv
            className="pf_thumb"
            bgImg={backgroundImgURL}
          ></ImgTmpProfileBgDiv>
        )}
        <div className="pf_txt">
          <div className="icon">
            {!profileImgLoading && <img src={profileImgURL} alt="profile" />}
          </div>
          <p className="h1">{item.nickname}</p>
          <p className="t1">{item.description}</p>
        </div>
      </Link>
    </div>
  );
};

const ImgTmpProfileBgDiv = styled.div`
  background-image: url(${(props) => props.bgImg});
  height: 80px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

export default Author;
