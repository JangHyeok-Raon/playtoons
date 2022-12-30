import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import useFilePath from "@/hook/useFilePath";
import { useDispatch } from "react-redux";
import { currentPostInit } from "@/modules/redux/ducks/post";

const Curation = ({ item }) => {
  const dispatch = useDispatch();
  const { filePath, loading } = useFilePath(item?.thumbnailImage);

  const handleCurrentPostInit = useCallback(() => {
    dispatch(currentPostInit());
  }, [dispatch]);
  return (
    <Link to={`/post/detail/novel/${item.id}`} onClick={handleCurrentPostInit}>
      {!loading && <img src={filePath} className='top' />}
    </Link>
  );
};

export default Curation;
