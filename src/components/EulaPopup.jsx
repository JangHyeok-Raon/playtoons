import React, { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkLarge } from "@fortawesome/pro-solid-svg-icons";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { getEulaVersion, updateAccount } from "@API/accountService";
import { useNavigate } from "react-router-dom";

const EulaPopup = ({ handleClose, readonly = false }) => {
  const [agree, setAgree] = useState(false);
  const [isErrorShow, setIsErrorShow] = useState(false);
  const [eulaVersion, setEulaVersion] = useState(0);
  const [content, setContent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getEulaVersionFn() {
      const { data, status } = await getEulaVersion("author");
      if (status === 200) {
        const { version, content } = data.agreement;
        setEulaVersion(version);
        setContent(content);
      } else {
        setEulaVersion(null);
        setContent(null);
      }
    }
    getEulaVersionFn();
  }, []);

  const handleAgree = useCallback(async () => {
    if (!agree) {
      setIsErrorShow(true);
      return;
    }

    //2022.10.20 register form 으로 이동, author 등록 허용 횟수 확인 필요
    navigate("/author/register/form");
  }, [navigate, agree]);

  return (
    <div className="popup_dim">
      <div id="popTerms" className="layerPopup pop_terms">
        <div className="popup">
          <div className="pop_head">
            <h2 className="title">クリエイター登録</h2>
            <button
              type="button"
              className="btn_pop_close b-close"
              onClick={handleClose}
            >
              <FontAwesomeIcon icon={faXmarkLarge} fontSize={24} />
            </button>
          </div>
          <div className="pop_cont">
            <div className="wrap_login">
              <div className="area_terms">
                <div className="in scrollY">
                  <MarkdownPreview source={content} className='markdown' />
                </div>
              </div>

              {!readonly && (
                <div className={`${isErrorShow && !agree ? "error" : ""} inps`}>
                  <label className="inp_checkbox">
                    <input
                      type="checkbox"
                      onChange={(e) => setAgree(e.target.checked)}
                    />
                    <span>利用規約に同意します。</span>
                  </label>
                  {isErrorShow && !agree && (
                    <p className="t_error">
                      <span className="ico_error">
                        必須項目をチェックしてください。
                      </span>
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
          {!readonly && (
            <div className="pop_botm">
              <button
                type="button"
                className="btn-pk blue"
                onClick={handleAgree}
              >
                クリエイターになる
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EulaPopup;
