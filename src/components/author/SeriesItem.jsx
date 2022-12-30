import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faObjectUnion } from "@fortawesome/pro-solid-svg-icons";
import useFilePath from "@/hook/useFilePath";
import { getPostSeriesCount as getPostSeriesCountAPI } from "@API/postService";

const SeriesItem = ({ item }) => {
  const { filePath: thumbnailImgURL, loading: thumbnailImgLoading } =
    useFilePath(item?.coverImage);
  const [seriesCount, setSeriesCount] = useState(0);

  useEffect(() => {
    async function getPostSeriesCount(id) {
      const response = await getPostSeriesCountAPI(item?.id);
      if (response.status === 200) {
        setSeriesCount(response.data.count);
      }
    }
    if (item?.id) {
      getPostSeriesCount(item?.id);
    }
  }, [item]);

  return (
    <li>
      <Link
        to={`/author/detail/series/${item?.id}`}
        state={{ postType: item.type.code }}
      >
        <div className="thumb">
          {!thumbnailImgLoading && <SpanImg bgImg={thumbnailImgURL}></SpanImg>}
        </div>
        <div className="txt">
          <p className="t1">{item?.type?.name}</p>
          <p className="h1">{item?.title}</p>
          <button type="button" className="btn-pk s blue2">
            <FontAwesomeIcon icon={faObjectUnion} />
            {seriesCount}
          </button>
        </div>
      </Link>
    </li>
  );
};

const SpanImg = styled.span`
  background-image: url(${(props) => props.bgImg});
`;

export default SeriesItem;
