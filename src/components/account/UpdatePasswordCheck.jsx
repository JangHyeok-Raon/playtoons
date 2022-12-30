import React, { useState, useRef, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginPasswordCheck } from "@API/loginService";

/**
 * 비밀번호 변경을 위해 기존 비밀번호 입력 폼
 */
const UpdatePasswordCheck = () => {
  const isLogined = useSelector(({ login }) => login.isLogined);
  const navigate = useNavigate();
  const [password, setPassword] = useState(null);
  const passwordRef = useRef(null);

  const [isPasswordErrorShow, setIsPasswordErrorShow] = useState(false);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState(null);
  const [isCheckErrorShow, setIsCheckErrorShow] = useState(false);
  const [checkErrorMsg, setCheckErrorMsg] = useState(null);

  useEffect(() => {
    if (!isLogined) {
      // 로그인 된 상태가 아니라면 로그인 페이지로
      navigate("/account", {
        state: { next: "/account/update-password-check" },
      });
    }
  }, [isLogined, navigate]);

  const handleUpdatePasswordCheck = useCallback(async () => {
    if (!password) {
      passwordRef.current.focus();
      setIsPasswordErrorShow(true);
      setPasswordErrorMsg("패스워드를 입력하세요.");
      return;
    } else {
      setIsPasswordErrorShow(false);
      setPasswordErrorMsg(null);
    }

    const response = await loginPasswordCheck({ password });
    console.log("response : ", response);
    const { status } = response;
    if (status === 200) {
      navigate("../update-password-confirm");
    } else {
      setIsCheckErrorShow(true);
      setCheckErrorMsg(`코드 참조 : ${status}`);
    }
  }, [password, navigate]);

  return (
    <>
      <h1 className="logo">パスワードの変更</h1>
      <div className="txt">
        <p>既存のパスワードを入力してください。</p>
      </div>

      {isCheckErrorShow && (
        <div className="box_error">
          <p className="t1">
            <span className="ico_error">Error Message</span>
          </p>
          <p className="t2">{checkErrorMsg}</p>
        </div>
      )}

      <div className="area_member">
        <div className="inbox ty2">
          <div className={`${isPasswordErrorShow ? "error" : ""} col`}>
            <label htmlFor="id" className="h">
              既存のパスワード
            </label>
            <input
              type="password"
              id="id"
              className="inp_txt w100p"
              onChange={(e) => setPassword(e.target.value)}
              ref={passwordRef}
            />
            {isPasswordErrorShow && (
              <p className="t_error">
                <span className="ico_error">{passwordErrorMsg}</span>
              </p>
            )}
          </div>
        </div>
        <div className="btns">
          <button
            type="submit"
            className="btn-pk mem blue"
            onClick={handleUpdatePasswordCheck}
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

export default UpdatePasswordCheck;
