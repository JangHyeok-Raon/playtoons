import React, { useCallback, useEffect, useState, useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/pro-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import { recoverConfirmPassword } from "@API/accountService";

const RecoverConfirm = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const code = state?.code;
  if (!code) {
    navigate("/account/recover");
  }
  const [newPwd, setNewPwd] = useState(null);
  const passwordRef = useRef(null);

  const [newPwdCheck, setNewPwdCheck] = useState(null);
  const rePasswordRef = useRef(null);

  const [isPwdShow, setIsPwdShow] = useState(false);
  const [isRePwdShow, setIsRePwdShow] = useState(false);

  const [isPasswordErrorShow, setIsPasswordErrorShow] = useState(false);
  const [isRePasswordErrorShow, setIsRePasswordErrorShow] = useState(false);
  const [isConfirmErrorShow, setIsConfirmErrorShow] = useState(false);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState(null);
  const [rePasswordErrorMsg, setRePasswordErrorMsg] = useState(null);
  const [confirmErrorMsg, setConfirmErrorMsg] = useState(null);

  const handleNewPwdChage = (e) => {
    setNewPwd(e.target.value);
  };
  const handleNewPwdCheckChage = (e) => {
    setNewPwdCheck(e.target.value);
  };

  const handlePwdConfirm = useCallback(async () => {
    if (!newPwd) {
      passwordRef.current.focus();
      setIsPasswordErrorShow(true);
      setPasswordErrorMsg("password 없음");
      return;
    } else {
      setIsPasswordErrorShow(false);
      setPasswordErrorMsg(null);
    }
    if (!newPwdCheck) {
      rePasswordRef.current.focus();
      setIsRePasswordErrorShow(true);
      setRePasswordErrorMsg("re password 없음");
      return;
    } else {
      setIsRePasswordErrorShow(false);
      setRePasswordErrorMsg(null);
    }

    if (newPwd !== newPwdCheck) {
      rePasswordRef.current.focus();
      setIsRePasswordErrorShow(true);
      setRePasswordErrorMsg("password 불일치");
      return;
    }
    const response = await recoverConfirmPassword({
      password: newPwd,
      code: code,
    });

    const { status } = response;
    if (status === 200) {
      navigate("/account");
    } else {
      setIsConfirmErrorShow(true);
      setConfirmErrorMsg(`코드 참조 : ${status}`);
    }
  }, [newPwd, newPwdCheck, code, navigate]);

  return (
    <>
      <h1 className="logo">パスワードを再設定</h1>
      <div className="txt">
        <p>ログインIDとして使用中の</p>
        <p>メールアドレスを入力してください。</p>
      </div>

      {isConfirmErrorShow && (
        <div className="box_error">
          <p className="t1">
            <span className="ico_error">Error Message</span>
          </p>
          <p className="t2">{confirmErrorMsg}</p>
        </div>
      )}

      <div className="area_member">
        <div className="inbox ty1">
          <div className={`${isPasswordErrorShow ? "error" : ""} col`}>
            <label htmlFor="pwd" className="h">
              パスワード
            </label>
            <input
              type={`${isPwdShow ? "text" : "password"}`}
              id="pwd"
              className="inp_txt w100p"
              onChange={handleNewPwdChage}
              ref={passwordRef}
            />
            <button
              type="button"
              className={`${isPwdShow ? "active" : ""} btn_eyes`}
              onClick={() => setIsPwdShow(!isPwdShow)}
            >
              <span className="show">
                <FontAwesomeIcon icon={faEye} />
              </span>
              <span className="hide">
                <FontAwesomeIcon icon={faEyeSlash} />
              </span>
            </button>

            {isPasswordErrorShow && (
              <p className="t_error">
                <span className="ico_error">{passwordErrorMsg}</span>
              </p>
            )}
          </div>
          <div className={`${isRePasswordErrorShow ? "error" : ""} col`}>
            <label htmlFor="rePwd" className="h">
              パスワード確認
            </label>
            <input
              type={`${isRePwdShow ? "text" : "password"}`}
              id="rePwd"
              className="inp_txt w100p"
              onChange={handleNewPwdCheckChage}
              ref={rePasswordRef}
            />
            <button
              type="button"
              className={`${isRePwdShow ? "active" : ""} btn_eyes`}
              onClick={() => setIsRePwdShow(!isRePwdShow)}
            >
              <span className="show">
                <FontAwesomeIcon icon={faEye} />
              </span>
              <span className="hide">
                <FontAwesomeIcon icon={faEyeSlash} />
              </span>
            </button>
            {isRePasswordErrorShow && (
              <p className="t_error">
                <span className="ico_error">{rePasswordErrorMsg}</span>
              </p>
            )}
          </div>
        </div>
        <div className="btns ty1">
          <button
            type="submit"
            className="btn-pk mem blue"
            onClick={handlePwdConfirm}
          >
            <span>パスワード変更</span>
          </button>
          <button
            type="submit"
            className="btn-pk mem blue2"
            onClick={() => navigate("../recover")}
          >
            <span>戻る</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default RecoverConfirm;
