import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getCurationList as getCurationListAPI } from "@/services/curationService";
import useFilePath from "@/hook/useFilePath";
import { Link } from "react-router-dom";

const WebNovelItem = ({ item }) => {
  const { filePath, loading } = useFilePath(item?.thumbnailImage);
  return (
    <div className="col">
      <Link to={`/post/detail/novel/${item?.id}`}>
        <div className="thumb">
          {!loading && <ImgBgSpan bgImg={filePath}></ImgBgSpan>}
        </div>
        <div className="txt">
          <p className="h1">{item?.title}</p>
          <p className="t1">{item?.outline}</p>
        </div>
      </Link>
    </div>
  );
};

const ImgBgSpan = styled.span`
  background-image: url(${(props) => props.bgImg});
`;

export default WebNovelItem;
