import React, { useState, useCallback, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateAccount } from "@API/accountService";

/**
 * 이메일 변경을 위해 새 이메일 입력 받는 폼
 */
const UpdateEmail = () => {
  const isLogined = useSelector(({ login }) => login.isLogined);
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const emailRef = useRef(null);
  const [isEmailErrorShow, setIsEmailErrorShow] = useState(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState(null);

  const [isUpdateErrorShow, setIsUpdateErrorShow] = useState(false);
  const [updateErrorMsg, setUpdateErrorMsg] = useState(null);

  useEffect(() => {
    if (!isLogined) {
      // 로그인 된 상태가 아니라면 로그인 페이지로
      navigate("/account", { state: { next: "/account/update-email" } });
    }
  }, [isLogined, navigate]);

  const handleUpdateEmail = useCallback(async () => {
    if (!email) {
      emailRef.current.focus();
      setIsEmailErrorShow(true);
      setEmailErrorMsg("email 없음");
      return;
    } else {
      setIsEmailErrorShow(false);
      setEmailErrorMsg(null);
    }
    const params = { email };
    const response = await updateAccount(params);
    const { status } = response;
    if (response.status === 200) {
      const { expireOn } = response.data;
      navigate("../update-email-verify", { state: { expireOn, email } });
    } else {
      setIsUpdateErrorShow(true);
      setUpdateErrorMsg(`코드 참조 : ${status}`);
    }
  }, [email, navigate]);

  return (
    <>
      <h1 className="logo">メールアドレスの変更</h1>
      <div className="txt">
        <p>新しいメールアドレスを入力してください。</p>
      </div>

      {isUpdateErrorShow && (
        <div className="box_error">
          <p className="t1">
            <span className="ico_error">Error Message</span>
          </p>
          <p className="t2">{updateErrorMsg}</p>
        </div>
      )}

      <div className="area_member">
        <div className="inbox ty2">
          <div className={`${isEmailErrorShow ? "error" : ""} col`}>
            <label htmlFor="id" className="h">
              新しいメールアドレス
            </label>
            <input
              type="text"
              id="id"
              className="inp_txt w100p"
              onChange={(e) => setEmail(e.target.value)}
              ref={emailRef}
            />
            {isEmailErrorShow && (
              <p className="t_error">
                <span className="ico_error">{emailErrorMsg}</span>
              </p>
            )}
          </div>
        </div>
        <div className="btns">
          <button
            type="submit"
            className="btn-pk mem blue"
            onClick={handleUpdateEmail}
          >
            <span>次へ</span>
          </button>
          <button
            type="submit"
            className="btn-pk mem blue2"
            onClick={() => navigate(-1)}
          >
            <span>戻る</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default UpdateEmail;
