import React, { useCallback, useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/pro-solid-svg-icons";
import { updateAccount } from "@API/accountService";
import { useNavigate } from "react-router-dom";

const UpdatePasswordConfirm = () => {
  const isLogined = useSelector(({ login }) => login.isLogined);
  const userInfo = useSelector(({ login }) => login.userInfo);
  const navigate = useNavigate();
  const [password, setPassword] = useState(null);
  const passwordRef = useRef(null);
  const [rePassword, setRePassword] = useState(null);
  const rePasswordRef = useRef(null);

  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [isRePasswordShow, setIsRePasswordShow] = useState(false);

  const [isPasswordErrorShow, setIsPasswordErrorShow] = useState(false);
  const [isRePasswordErrorShow, setIsRePasswordErrorShow] = useState(false);
  const [isConfirmErrorShow, setIsConfirmErrorShow] = useState(false);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState(null);
  const [rePasswordErrorMsg, setRePasswordErrorMsg] = useState(null);
  const [confirmErrorMsg, setConfirmErrorMsg] = useState(null);

  useEffect(() => {
    if (!isLogined) {
      // 로그인 된 상태가 아니라면 로그인 페이지로
      navigate("/account", {
        state: { next: "/account/update-password-check" },
      });
    }
  }, [isLogined, navigate]);

  const handlePasswordConfirm = useCallback(async () => {
    if (!password) {
      passwordRef.current.focus();
      setIsPasswordErrorShow(true);
      setPasswordErrorMsg("비밀번호를 입력하세요.");
      return;
    } else {
      setIsPasswordErrorShow(false);
      setPasswordErrorMsg(null);
    }

    if (!rePassword) {
      rePasswordRef.current.focus();
      setIsRePasswordErrorShow(true);
      setRePasswordErrorMsg("재확인 비밀번호를 입력하세요.");
      return;
    } else {
      setIsRePasswordErrorShow(false);
      setRePasswordErrorMsg(null);
    }

    if (password !== rePassword) {
      setIsRePasswordErrorShow(true);
      setRePasswordErrorMsg("비밀번호가 같지 않습니다.");
      return;
    }

    const response = await updateAccount({
      email: userInfo.email,
      password: password,
    });
    const { status } = response;
    if (status === 200) {
      /**
       * @todo Update Email 을 들어오기 전 페이지로 이동
       * */
      navigate("/");
    } else {
      setIsConfirmErrorShow(true);
      setConfirmErrorMsg(`코드 참조 : ${status}`);
    }
  }, [password, rePassword, userInfo, navigate]);

  return (
    <>
      <h1 className="logo">パスワードの変更</h1>
      <div className="txt">
        <p>新しいパスワードを入力してください。</p>
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
        <div className="inbox ty3">
          <div className={`${isPasswordErrorShow ? "error" : ""} col`}>
            <label htmlFor="pwd" className="h">
              パスワード
            </label>
            <input
              type={`${isPasswordShow ? "text" : "password"}`}
              id="pwd"
              className="inp_txt w100p"
              onChange={(e) => setPassword(e.target.value)}
              ref={passwordRef}
            />
            <button
              type="button"
              className={`${isPasswordShow ? "active" : ""} btn_eyes`}
              onClick={() => setIsPasswordShow(!isPasswordShow)}
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
              type={`${isRePasswordShow ? "text" : "password"}`}
              id="rePwd"
              className="inp_txt w100p"
              onChange={(e) => setRePassword(e.target.value)}
              ref={rePasswordRef}
            />
            <button
              type="button"
              className={`${isRePasswordShow ? "active" : ""} btn_eyes`}
              onClick={() => setIsRePasswordShow(!isRePasswordShow)}
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
        <div className="btns">
          <button
            type="submit"
            className="btn-pk mem blue"
            onClick={handlePasswordConfirm}
          >
            <span>パスワード変更</span>
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

export default UpdatePasswordConfirm;
