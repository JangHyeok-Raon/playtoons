import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFlag,
  faPenToSquare,
  faTrash,
} from "@fortawesome/pro-light-svg-icons";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ReplyControlBox = ({
  item,
  setIsEdit,
  setIsDeletePopupShow,
  setIsReportPopupShow,
  setIsReplyControlShow,
}) => {
  const userInfo = useSelector(({ login }) => login.userInfo);
  const ref = useRef();

  const handleClickOutside = (e) => {
    if (ref && !ref.current.contains(e.target)) {
      setIsReplyControlShow(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <div className="box_drop" ref={ref}>
      <ul>
        {(item.userId === userInfo.id && (
          <>
            <li onClick={() => setIsEdit(true)}>
              <Link to="">
                <FontAwesomeIcon icon={faPenToSquare} />
                {` 修正`}
              </Link>
            </li>
            <li onClick={() => setIsDeletePopupShow(true)}>
              <Link to="">
                <FontAwesomeIcon icon={faTrash} />
                {` 削除`}
              </Link>
            </li>
          </>
        )) || (
          <li onClick={() => setIsReportPopupShow(true)}>
            <Link to="">
              <FontAwesomeIcon icon={faFlag} />
              {` 通報`}
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default ReplyControlBox;
