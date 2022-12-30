import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faXmarkLarge } from "@fortawesome/pro-solid-svg-icons";
import {
  faEllipsisVertical,
  faFlag,
  faPenToSquare,
  faTrash,
} from "@fortawesome/pro-light-svg-icons";
import useFilePath from "@/hook/useFilePath";
import { Link } from "react-router-dom";

const Comment = ({ item }) => {
  // 대댓글 여부
  const [isReComment, setIsReComment] = useState(false);
  const [isLikeBoxShow, setIsLikeBoxShow] = useState(false);
  const [isMenuBoxShow, setIsMenuBoxShow] = useState(false);
  const [isEditShow, setIsEditShow] = useState(false);
  const [isDeleteShow, setIsDeleteShow] = useState(false);
  const [isReportShow, setIsReportShow] = useState(false);

  const { filePath, loading } = useFilePath(item?.profileImgURL);

  return (
    <div className={`col ${isReComment ? "col_re" : ""}`}>
      <div className="imgs">
        {!loading && (
          <ImgProfileSpan
            bgImg={filePath || require("@IMAGES/img_profile.png")}
          ></ImgProfileSpan>
        )}
      </div>
      <div
        className="conts"
        style={{ visibility: isEditShow ? "hidden" : "visible" }}
      >
        <p className="h1">
          <span className="i-writer">作成者</span>
          {item.author}
        </p>
        <p className="d1">
          <span>{item.date}</span>
          <span>コメント</span>
        </p>
        <p className="t1">{item.comment}</p>
        <div className="rgh">
          <button
            type="button"
            className="btn01"
            onClick={() => setIsLikeBoxShow(!isLikeBoxShow)}
          >
            <FontAwesomeIcon icon={faHeart} />
            {item.likeCount}
          </button>
          {isLikeBoxShow && (
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
            onClick={() => setIsMenuBoxShow(!isMenuBoxShow)}
          >
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </button>
          {/*<!-- 이부분이 다름 -->*/}
          {isMenuBoxShow && (
            <div className="box_drop">
              <ul>
                <li onClick={() => setIsEditShow(true)}>
                  <Link to="">
                    <FontAwesomeIcon icon={faPenToSquare} />
                    修正
                  </Link>
                </li>
                <li onClick={() => setIsDeleteShow(true)}>
                  <Link to="">
                    <FontAwesomeIcon icon={faTrash} />
                    削除
                  </Link>
                </li>
                <li onClick={() => setIsReportShow(true)}>
                  <Link to="">
                    <FontAwesomeIcon icon={faFlag} />
                    通報
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div
        className="comm"
        style={{ visibility: isEditShow ? "visible" : "hidden" }}
      >
        <textarea
          name=""
          id=""
          className="textarea1"
          placeholder="ログインして投稿する"
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
              onClick={() => setIsEditShow(false)}
            >
              <span>取り消</span>
            </button>
            <button type="button" className="btn-pk s blue">
              <span>登録する</span>
            </button>
          </div>
        </div>
      </div>
      {isDeleteShow && (
        <div className="popup_dim">
          <div id="popDelete" className="layerPopup pop_delete">
            <div className="popup">
              <div className="pop_head">
                <h2 className="title">コメント削除</h2>
                <button
                  type="button"
                  className="btn_pop_close b-close"
                  onClick={() => setIsDeleteShow(false)}
                >
                  <FontAwesomeIcon icon={faXmarkLarge} />
                </button>
              </div>
              <div className="pop_cont">
                <p className="ta-c">コメントを削除しますか？</p>
              </div>
              <div className="pop_botm">
                <button
                  type="button"
                  className="btn-pk blue2"
                  onClick={() => setIsDeleteShow(false)}
                >
                  キャンセル
                </button>
                <button type="button" className="btn-pk blue">
                  削除する
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {isReportShow && (
        <div id="popReport" className="layerPopup pop_report">
          <div className="popup">
            <div className="pop_head">
              <h2 className="title">通報</h2>
              <button type="button" className="btn_pop_close b-close">
                <FontAwesomeIcon icon={faXmarkLarge} />
              </button>
            </div>
            <div className="pop_cont">
              <p className="ta-c">通報する理由を選択してください。</p>

              <label className="inp_radio">
                <input type="radio" name="radio" value="1" />
                <span>スパム</span>
              </label>
              <label className="inp_radio">
                <input type="radio" name="radio" value="2" />
                <span>迷惑行為</span>
              </label>
              <label className="inp_radio">
                <input type="radio" name="radio" value="3" />
                <span>出会い目的</span>
              </label>
              <label className="inp_radio">
                <input type="radio" name="radio" value="4" />
                <span>その他</span>
              </label>
              <textarea
                className="textarea1"
                placeholder="詳細(任意)"
              ></textarea>
            </div>
            <div className="pop_botm">
              <button type="button" className="btn-pk blue">
                通報する
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ImgProfileSpan = styled.span`
  background-image: url(${(props) => props.bgImg});
`;

export default Comment;
