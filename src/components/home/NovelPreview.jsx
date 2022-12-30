import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/pro-solid-svg-icons";
import WebNovelItems from "./WebNovelItems";

const NovelPreview = ({ curation }) => {
  return (
    <div className="main_area">
      <div className="inr-c">
        <div className="hd_titbox">
          <h2 className="m_tit1">{curation?.title}</h2>
          <a href="#" className="rgh btn-pk n blue2 view-m">
            <span className="ico_arr_link">
              すべてみる <FontAwesomeIcon icon={faAngleRight} />
            </span>
          </a>
        </div>

        <WebNovelItems curationNum={curation?.id} />
      </div>
    </div>
  );
};

export default NovelPreview;
