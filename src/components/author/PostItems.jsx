import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/pro-light-svg-icons";
import PostItem from "./PostItem";
import { useSelector } from "react-redux";

const PostItems = () => {
  const currentAuthor = useSelector(({ author }) => author.currentAuthor);

  return (
    <>
      <div className="lst_detail">
        <ul>
          {currentAuthor?.posts &&
            currentAuthor?.posts?.map((post, index) => (
              <PostItem key={`post_${index}`} item={post} />
            ))}
        </ul>
      </div>

      <div className="pagenation">
        <ul>
          <li className="prev">
            <a href="#">
              <FontAwesomeIcon icon={faAngleLeft} />
            </a>
          </li>
          <li className="on">
            <a href="#">1</a>
          </li>
          <li className="next">
            <a href="#">
              <FontAwesomeIcon icon={faAngleRight} />
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};
export default PostItems;
