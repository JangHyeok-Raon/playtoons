import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/pro-solid-svg-icons";
import BestWebtoonItems from "@COMPONENTS/home/webtoon/BestWebtoonItems";
import { Link } from "react-router-dom";

const Character = ({ curation }) => {
  return (
    <div className="main_area">
      <div className="inr-c">
        <div className="hd_titbox">
          <h2 className="m_tit1">{curation?.title}</h2>
          <Link to="#" className="rgh btn-pk n blue2 view-m">
            <span className="ico_arr_link">
              すべてみる
              <FontAwesomeIcon icon={faAngleRight} />
            </span>
          </Link>
        </div>

        <div className="lst_adcomic1">
          <BestWebtoonItems curationNum={curation?.id} />
        </div>
      </div>
    </div>
  );
};

export default Character;
