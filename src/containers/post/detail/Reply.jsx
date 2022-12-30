import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/pro-solid-svg-icons";
import { faEllipsisVertical } from "@fortawesome/pro-regular-svg-icons";
import { useSelector } from "react-redux";
import useFilePath from "@/hook/useFilePath";
import ReportPopup from "../ReportPopup";
import DeletePopup from "../DeletePopup";
import ReplyControlBox from "../ReplyControlBox";
import {
  updateReaction,
  insertLikeReaction,
  deleteLikeReaction,
} from "@API/reactionService";
import Image from "@/components/dashboard/Image";
import { getReactionDate } from "@/common/common";

const TEXT = {
  before_year: "年前",
  before_month: "月前",
  before_day: "日前",
  before_hour: "時間前",
  before_minute: "分前",
  before_second: "秒前",
};

const Reply = ({ item }) => {
  const currentPost = useSelector(({ post }) => post.currentPost);
  // 댓글 수정 시 입력폼으로 변경하기 위한 Flag
  const [content, setContent] = useState(item?.content);

  const [isEdit, setIsEdit] = useState(false);
  const [isLikeShow, setIsLikeShow] = useState(false);
  const [isDeletePopupShow, setIsDeletePopupShow] = useState(false);
  const [isReportPopupShow, setIsReportPopupShow] = useState(false);
  const { filePath: profileImgURL, loading: profileImgLoading } = useFilePath(
    item?.profileImage
  );
  // 댓글 제어 모달 Flag
  const [isReplyControlShow, setIsReplyControlShow] = useState(false);

  const handleUpdate = useCallback(async () => {
    if (!content) {
      alert("내용없음");
      return;
    }
    const response = await updateReaction({ content });
    if (response.status === 200) {
      alert("수정 완료");
    } else {
      alert("수정 실패");
    }
  }, [content]);

  const handleLike = useCallback(async () => {
    const reactionId = 0;
    if (isLikeShow) {
      const response = await deleteLikeReaction(reactionId);
      if (response?.status === 200) {
        alert("좋아요 성공");
        setIsLikeShow(true);
      } else {
        alert("좋아요 실패");
        setIsLikeShow(false);
      }
    } else {
      const response = await insertLikeReaction(reactionId);
      if (response?.status === 200) {
        alert("좋아요 삭제 성공");
        setIsLikeShow(false);
      } else {
        alert("좋아요 삭제 실패");
        setIsLikeShow(true);
      }
    }
  }, [isLikeShow]);

  return (
    <>
      <div className={`col ${item?.level > 1 ? "col_re" : ""}`}>
        <div className="imgs">
          {!profileImgLoading && (
            <ImgProfileSpan bgImg={profileImgURL}></ImgProfileSpan>
          )}
        </div>
        {(!isEdit && (
          <div className="conts">
            {/* 댓글 내용 */}

            <p className="h1">
              {currentPost?.author?.id === item?.accountId && (
                <span className="i-writer">作成者</span>
              )}
              {item?.account?.nickname}
            </p>

            <p className="h1">{item?.name}</p>
            <p className="d1">
              {/*<span>3日前</span>*/}
              <span>{getReactionDate(item?.createdAt, TEXT)}</span>
              <span>コメント</span>
            </p>
            {/* 삭제시 className 에 c-gray 추가 */}
            {item?.deleted ? (
              <p className="t1 c-gray">削除されたコメントです。</p>
            ) : (
              <>
                <p className="t1">{item?.content}</p>
                {item?.iconImage && (
                  <p className="icon_image">
                    <Image hash={item?.iconImage} />
                  </p>
                )}
              </>
            )}
            <div className="rgh">
              <button type="button" className="btn01" onClick={handleLike}>
                <FontAwesomeIcon icon={faHeart} /> {item?.likeCount}
              </button>
              {isLikeShow && (
                <div className="box_drop box_favorit">
                  <ul>
                    <li>
                      <button type="button">
                        <span className="i_favorit1">313</span>
                      </button>
                    </li>
                    <li>
                      <button type="button">
                        <span className="i_favorit2">414</span>
                      </button>
                    </li>
                    <li>
                      <button type="button">
                        <span className="i_favorit3">1.2k</span>
                      </button>
                    </li>
                    <li>
                      <button type="button">
                        <span className="i_favorit4">512</span>
                      </button>
                    </li>
                    <li>
                      <button type="button">
                        <span className="i_favorit5">512</span>
                      </button>
                    </li>
                    <li>
                      <button type="button">
                        <span className="i_favorit6">0</span>
                      </button>
                    </li>
                  </ul>
                </div>
              )}

              <button
                type="button"
                className="btn02"
                onClick={() => setIsReplyControlShow(!isReplyControlShow)}
              >
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </button>
              {isReplyControlShow && (
                <ReplyControlBox
                  item={item}
                  setIsEdit={setIsEdit}
                  setIsDeletePopupShow={setIsDeletePopupShow}
                  setIsReportPopupShow={setIsReportPopupShow}
                  setIsReplyControlShow={setIsReplyControlShow}
                />
              )}
            </div>
          </div>
        )) || (
          <div className="comm">
            {/* 댓글 수정시 입력란 */}
            <textarea
              className="textarea1"
              placeholder="ログインして投稿する"
              onChange={(e) => setContent(e.target.value)}
              value={content || ""}
            ></textarea>
            <div className="btns">
              <div className="l">
                <button type="button" className="btn-pk s blue2">
                  <span>アイコン</span>
                </button>
              </div>
              <div className="r">
                <button
                  type="button"
                  className="btn-pk s tran"
                  onClick={() => setIsEdit(false)}
                >
                  <span>取り消</span>
                </button>
                <button
                  type="button"
                  className="btn-pk s blue"
                  onClick={handleUpdate}
                >
                  <span>登録する</span>
                </button>
              </div>
            </div>
          </div>
        )}
        {isDeletePopupShow && (
          <DeletePopup
            onClose={() => setIsDeletePopupShow(false)}
            postId={currentPost?.id}
          />
        )}
        {isReportPopupShow && (
          <ReportPopup
            onClose={() => setIsReportPopupShow(false)}
            postId={item?.id}
            content={currentPost?.content}
          />
        )}
      </div>
    </>
  );
};

const ImgProfileSpan = styled.span`
  background-image: url(${(props) => props.bgImg});
`;

export default Reply;
