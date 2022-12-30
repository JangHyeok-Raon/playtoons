import React, { useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/pro-solid-svg-icons";
import useFilePath from "@/hook/useFilePath";
import { Link } from "react-router-dom";
import { currentPostInit } from "@/modules/redux/ducks/post";
import { useDispatch } from "react-redux";
const Item = ({ item }) => {
  const dispatch = useDispatch();
  const { filePath, loading } = useFilePath(item?.thumbnailImage);

  const handleCurrentPostInit = useCallback(() => {
    dispatch(currentPostInit());
  }, [dispatch]);
  return (
    <li>
      {item && (
        <Link
          to={`/post/detail/webtoon/${item?.id}`}
          onClick={handleCurrentPostInit}
        >
          <div className="cx_thumb">
            <span>{!loading && <img src={filePath} alt="" />}</span>
            <p className="t_like">
              <FontAwesomeIcon icon={faHeart} />
              <span>{item.likeCount}</span>
            </p>
          </div>
          <div className="cx_txt">
            <p className="h1">{item.title}</p>
            <p className="t1">{item.author?.nickname}</p>
            <p className="t1 c-gray">{`${item.number || "null"}`}話</p>
            <div className="lst_tag">
              {item.tags?.map((tag, index) => (
                <div key={`tag_${index}`} className="i_tag">
                  #{tag?.name}
                </div>
              ))}
            </div>
          </div>
        </Link>
      )}
    </li>
  );
};

export default Item;
