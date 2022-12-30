import React from "react";
import { Link } from "react-router-dom";
import useFilePath from "@/hook/useFilePath";
import tempChracter from '@IMAGES/main_visual_img.png';    //sample image

const BestWebtoon = ({ item, color }) => {
  const { filePath, loading } = useFilePath(item?.characterImage);
  return (
    <Link to={`/post/detail/webtoon/${item?.id}`}>
      <div className="cx_thumb" style={{ backgroundColor: item?.mainColor || color }}>
        <span>{!loading && <img src={filePath || tempChracter} alt="" />}</span>
      </div>
      <div className="cx_txt">
        <p className="h1">{item?.title}</p>
        <p className="t1">{item?.outline}</p>
      </div>
    </Link>
  );
};

export default BestWebtoon;
