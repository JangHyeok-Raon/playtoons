import React, { useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkLarge } from "@fortawesome/pro-solid-svg-icons";
import { deleteReaction } from "@API/reactionService";

const DeletePopup = ({ onClose, postId }) => {
  const handleDelete = useCallback(async () => {
    const response = await deleteReaction(postId);
    console.log(response);
    if (response.status === 200) {
      alert("삭제 완료");
    } else {
      alert("삭제 실패");
    }
  }, [postId]);
  return (
    <div className="popup_dim">
      <div className="layerPopup pop_delete">
        <div className="popup">
          <div className="pop_head">
            <h2 className="title">コメント削除</h2>
            <button
              type="button"
              className="btn_pop_close b-close"
              onClick={onClose}
            >
              <FontAwesomeIcon icon={faXmarkLarge} />
            </button>
          </div>
          <div className="pop_cont">
            <p className="ta-c">コメントを削除しますか？</p>
          </div>
          <div className="pop_botm">
            <button type="button" className="btn-pk blue2" onClick={onClose}>
              キャンセル
            </button>
            <button
              type="button"
              className="btn-pk blue"
              onClick={handleDelete}
            >
              削除する
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;
