import React, { useCallback, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/pro-solid-svg-icons";
import { register } from "@API/accountService";
import { useSelector } from "react-redux";
import useActions from "@/hook/useActions";
import { loginRequest } from "@REDUX/ducks/login";

const Register = () => {
  const navigate = useNavigate();
  const [onLogin] = useActions([loginRequest], []);

  const isLogined = useSelector(({ login }) => login.isLogined);
  const [email, setEmail] = useState(null);
  const emailRef = useRef(null);
  const [password, setPassword] = useState(null);
  const passwordRef = useRef(null);
  const [rePassword, setRePassword] = useState(null);
  const rePasswordRef = useRef(null);
  const [referralCode, setReferralCode] = useState(null);

  const [isPwdShow, setIsPwdShow] = useState(false);
  const [isRePwdShow, setIsRePwdShow] = useState(false);

  const [isEmailErrorShow, setIsEmailErrorShow] = useState(false);
  const [isPasswordErrorShow, setIsPasswordErrorShow] = useState(false);
  const [isRePasswordErrorShow, setIsRePasswordErrorShow] = useState(false);
  const [isRegisterErrorShow, setIsRegisterErrorShow] = useState(false);

  const [emailErrorMsg, setEmailErrorMsg] = useState(null);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState(null);
  const [rePasswordErrorMsg, setRePasswordErrorMsg] = useState(null);
  const [registerErrorMsg, setRegisterErrorMsg] = useState(null);

  useEffect(() => {
    if (isLogined) {
      console.log(isLogined);
    }
  }, [isLogined]);
  /**
   * email State 변경 함수
   * @param {Event} e
   */
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  /**
   * password State 변경 함수
   * @param {Event} e
   */
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  /**
   * rePassword State 변경 함수
   * @param {Event} e
   */
  const handleRePasswordChange = (e) => {
    setRePassword(e.target.value);
  };

  /**
   * referralCode State 변경 함수
   * @param {Event} e
   */
  const handleReferralCodeChange = (e) => {
    setReferralCode(e.target.value);
  };

  const handleRegister = useCallback(async () => {
    if (!email) {
      emailRef.current.focus();
      setIsEmailErrorShow(true);
      setEmailErrorMsg("email 없음");
      return;
    } else {
      setIsEmailErrorShow(false);
      setEmailErrorMsg(null);
    }
    if (!password) {
      passwordRef.current.focus();
      setIsPasswordErrorShow(true);
      setPasswordErrorMsg("password 없음");
      return;
    } else {
      setIsPasswordErrorShow(false);
      setPasswordErrorMsg(null);
    }
    if (!rePassword) {
      rePasswordRef.current.focus();
      setIsRePasswordErrorShow(true);
      setRePasswordErrorMsg("re password 없음");
      return;
    } else {
      setIsRePasswordErrorShow(false);
      setRePasswordErrorMsg(null);
    }
    if (password !== rePassword) {
      // Password 불일치
      rePasswordRef.current.focus();
      setIsRePasswordErrorShow(true);
      setRePasswordErrorMsg("Password 불일치");
      return;
    } else {
      setIsRePasswordErrorShow(false);
      setRePasswordErrorMsg(null);
    }
    const response = await register({
      email,
      password,
      referralCode,
      eulaVersion: 0,
      privacyVersion: 0,
    });

    const { status } = response;
    if (status === 201) {
      const { expireOn } = response.data;

      const data = {
        email,
        password,
      };
      onLogin(data);

      navigate("../verify", { state: { email, password, expireOn } });
    } else if (status === 400) {
      alert("파라미터 검증 실패");
    } else if (status === 403) {
      emailRef.current.focus();
      setIsRegisterErrorShow(true);
      setRegisterErrorMsg("사용이 제한된 이메일 주소");
    } else if (status === 409) {
      emailRef.current.focus();
      setIsRegisterErrorShow(true);
      setRegisterErrorMsg("이미 등록된 이메일 주소");
    } else if (status === 403) {
      alert("코드 참조");
    }
  }, [email, password, rePassword, referralCode, navigate, onLogin]);

  return (
    <>
      <h1 className="logo">会員登録</h1>
      {isRegisterErrorShow && (
        <div className="box_error">
          <p className="t1">
            <span className="ico_error">Error Message</span>
          </p>
          <p className="t2">{registerErrorMsg}</p>
        </div>
      )}
      <div className="area_member">
        <div className="inbox">
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
          <div className={`${isPasswordErrorShow ? "error" : ""} col`}>
            <label htmlFor="pwd" className="h">
              パスワード
            </label>
            <input
              type={isPwdShow ? "text" : "password"}
              id="pwd"
              className="inp_txt w100p"
              onChange={handlePasswordChange}
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
              type={isRePwdShow ? "text" : "password"}
              id="rePwd"
              className="inp_txt w100p"
              onChange={handleRePasswordChange}
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
          <div className="col">
            <label htmlFor="id" className="h">
              紹介コード
            </label>
            <input
              type="text"
              id="id"
              className="inp_txt w100p"
              onChange={handleReferralCodeChange}
            />
          </div>
        </div>
        <div className="btns">
          <button
            type="submit"
            className="btn-pk mem blue"
            onClick={handleRegister}
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

      <div className="botm">
        <a href="#" className="t2">
          プライバシーポリシー
        </a>
      </div>
    </>
  );
};

export default Register;
