import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkLarge } from "@fortawesome/pro-solid-svg-icons";

const SearchPopup = ({ handleClose, onSearch }) => {
  const [text, setText] = useState(null);
  return (
    <div className="popup_dim">
      <div id="popSearch" className="layerPopup pop_search">
        <div className="popup">
          <div className="pop_head">
            <h2 className="title">ハッシュタグ検索</h2>
            <button
              type="button"
              className="btn_pop_close b-close"
              onClick={handleClose}
            >
              <FontAwesomeIcon icon={faXmarkLarge} className="btn_pop_close" />
            </button>
          </div>
          <div className="pop_cont">
            <input
              type="text"
              className="inp_txt w100p"
              placeholder="ハッシュタグ名"
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div className="pop_botm">
            <button
              type="button"
              className="btn-pk blue2"
              onClick={handleClose}
            >
              キャンセル
            </button>
            <button
              type="button"
              className="btn-pk blue"
              onClick={() => {
                onSearch(text);
                handleClose();
              }}
            >
              検索
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPopup;
