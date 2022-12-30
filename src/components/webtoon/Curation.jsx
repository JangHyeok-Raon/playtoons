import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { getAuthor as getAuthorAPI } from "@API/authorService";
import useFilePath from "@/hook/useFilePath";
import { currentPostInit } from "@/modules/redux/ducks/post";
import { useDispatch } from "react-redux";

const Curation = ({ item }) => {
  const dispatch = useDispatch();
  const { filePath, loading } = useFilePath(item?.thumbnailImage);
  const [author, setAuthor] = useState(null);

  async function getAuthor(id) {
    const response = await getAuthorAPI(id);
    if (response.status === 200) {
      setAuthor(response?.data?.author);
    }
  }

  useEffect(() => {
    if (!author && item?.authorId) {
      getAuthor(item?.authorId);
    }
  }, [author, item]);

  const handleCurrentPostInit = useCallback(() => {
    dispatch(currentPostInit());
  }, [dispatch]);
  return (
    <Link
      to={`/post/detail/webtoon/${item.id}`}
      onClick={handleCurrentPostInit}
    >
      {!loading && (
        <ContBgDiv className="cont" bgImg={filePath}>
          <div style={{ color: "#fff" }}>
            <p className="b1">
              <span className="i-txt">おすすめ作品</span>
            </p>
            <p className="h1">{item.title}</p>
            <p className="t1">{item.outline}</p>
            <p className="t2">{item.author?.name}</p>
          </div>
        </ContBgDiv>
      )}
    </Link>
  );
};

const ContBgDiv = styled.div`
  color: #fff;
  background-image: url(${(props) => props.bgImg});
`;

export default Curation;
