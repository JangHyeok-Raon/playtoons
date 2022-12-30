import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import useFilePath from "@/hook/useFilePath";
import { currentAuthorInit } from "@/modules/redux/ducks/author";

const RecentItem = ({ item }) => {
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
        to={{
          pathname: `/author/post/${item?.id}`,
        }}
        state={{ item: item }}
        onClick={handleCurrentAuthorInit}
      >
        {/* 이미지 default 값 필요 */}
        {!backgroundImgLoading && (
          <ImgTmpProfileBgDiv className="pf_thumb" bgImg={backgroundImgURL} />
        )}
        <div className="pf_txt">
          <div className="icon">
            {/* 이미지 default 값 필요 */}
            {!profileImgLoading && <img src={profileImgURL} />}
          </div>
          <p className="h1">{item?.nickname}</p>
          <p className="t1">{item?.description}</p>
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
export default RecentItem;
