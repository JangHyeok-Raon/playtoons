import React, { useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { recover } from "@API/accountService";

const Recover = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const emailRef = useRef(null);
  const [isEmailErrorShow, setIsEmailErrorShow] = useState(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState(null);

  const [isRecoverErrorShow, setIsRecoverErrorShow] = useState(false);
  const [recoverErrorMsg, setRecoverErrorMsg] = useState(null);

  /**
   * email State 변경 함수
   * @param {Event} e
   */
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleRecover = useCallback(async () => {
    if (!email) {
      setIsEmailErrorShow(true);
      setEmailErrorMsg("email 없음");
      return;
    } else {
      setIsEmailErrorShow(false);
      setEmailErrorMsg(null);
    }
    const response = await recover({ email });
    const { status } = response;
    if (status === 200) {
      const { expireOn } = response.data;
      navigate("../recover-check", { state: { email, expireOn } });
    } else {
      setIsRecoverErrorShow(true);
      setRecoverErrorMsg(`코드 참조 : ${status}`);
    }
  }, [email, navigate]);

  return (
    <>
      <h1 className="logo">パスワードを再設定</h1>
      <div className="txt">
        <p>ログインIDとして使用中の</p>
        <p>メールアドレスを入力してください。</p>
      </div>
      {isRecoverErrorShow && (
        <div className="box_error">
          <p className="t1">
            <span className="ico_error">Error Message</span>
          </p>
          <p className="t2">{recoverErrorMsg}</p>
        </div>
      )}

      <div className="area_member">
        <div className="inbox ty1">
          <div className={`${isEmailErrorShow ? "error" : ""} col`}>
            <label htmlFor="id" className="h">
              メールアドレス
            </label>
            <input
              type="text"
              id="id"
              className="inp_txt w100p"
              onChange={handleEmailChange}
              ref={emailRef}
            />
            {isEmailErrorShow && (
              <p className="t_error">
                <span className="ico_error">{emailErrorMsg}</span>
              </p>
            )}
          </div>
        </div>
        <div className="btns ty1">
          <button
            type="submit"
            className="btn-pk mem blue"
            onClick={handleRecover}
          >
            <span>次へ</span>
          </button>
          <button
            type="submit"
            className="btn-pk mem blue2"
            onClick={() => navigate("/account")}
          >
            <span>戻る</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Recover;
