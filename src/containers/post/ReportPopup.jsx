import React, { useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkLarge } from "@fortawesome/pro-solid-svg-icons";
import { reportReaction } from "@API/reactionService";

const ReportPopup = ({ onClose, content, postId }) => {
  const handleReport = useCallback(async () => {
    const params = {
      type: "sexual",
      content: content,
    };

    const response = await reportReaction({ id: postId, params });
    if (response.status === 201) {
      alert("신고 완료");
      onClose();
    } else {
      alert("신고 실패");
    }
  }, [content, postId, onClose]);

  return (
    <div className="popup_dim">
      <div className="layerPopup pop_report">
        <div className="popup">
          <div className="pop_head">
            <h2 className="title">通報</h2>
            <button
              type="button"
              className="btn_pop_close b-close"
              onClick={onClose}
            >
              <FontAwesomeIcon icon={faXmarkLarge} fontSize={24} />
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
            <textarea className="textarea1" placeholder="詳細(任意)"></textarea>
          </div>
          <div className="pop_botm">
            <button
              type="button"
              className="btn-pk blue"
              onClick={handleReport}
            >
              通報する
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPopup;
