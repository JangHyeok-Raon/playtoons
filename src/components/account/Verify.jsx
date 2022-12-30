import React, { useCallback, useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import moment from "moment";
import { verifyCheckCode } from "@API/accountService";
import useActions from "@/hook/useActions";
import { loginRequest } from "@REDUX/ducks/login";

const Verify = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, password, expireOn } = location.state;
  const [onLogin] = useActions([loginRequest], []);

  const [seconds, setSeconds] = useState(0);

  const [code, setCode] = useState(null);
  const codeRef = useRef(null);

  const [isCodeErrorShow, setIsCodeErrorShow] = useState(false);
  const [codeErrorMsg, setCodeErrorMsg] = useState(null);

  const [isVerifyErrorShow, setIsVerifyErrorShow] = useState(false);
  const [verifyErrorMsg, setVerifyErrorMsg] = useState(false);

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleVerify = useCallback(async () => {
    if (!code) {
      codeRef.current.focus();
      setIsCodeErrorShow(true);
      setCodeErrorMsg("Code 없음");
      return;
    } else {
      setIsCodeErrorShow(false);
      setCodeErrorMsg(null);
    }
    const response = await verifyCheckCode({ code });
    console.log(response);
    const { status } = response;
    if (status === 200) {
      const params = { email, password };
      onLogin(params);
      navigate("../agreement", { state: params });
    } else {
      setIsVerifyErrorShow(true);
      setVerifyErrorMsg(`코드 참조 : ${status}`);
    }
  }, [code, codeRef, onLogin, email, password, navigate]);

  useEffect(() => {
    if (expireOn) {
      const today = new Date();
      const endDay = moment(expireOn);

      const duration = moment.duration(endDay.diff(today));
      const sec = duration.asSeconds();

      setSeconds(sec);
    }
  }, [expireOn]);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (parseInt(seconds) > 0) {
        setSeconds(parseInt(seconds) - 1);
      } else {
        clearInterval(countdown);
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [seconds]);

  return (
    <>
      <h1 className="logo">メールアドレス確認</h1>
      <div className="txt">
        <p className="c-blue">{email}</p>
        <p>宛に認証用メールを送信しました。</p>
      </div>

      {isVerifyErrorShow && (
        <div className="box_error">
          <p className="t1">
            <span className="ico_error">Error Message</span>
          </p>
          <p className="t2">{verifyErrorMsg}</p>
        </div>
      )}

      <div className="area_member">
        <div className="inbox ty3">
          <div className={`${isCodeErrorShow ? "error" : ""} col`}>
            <label htmlFor="id" className="h">
              認証コード
            </label>
            <input
              type="text"
              id="id"
              className="inp_txt w100p"
              onChange={handleCodeChange}
              ref={codeRef}
            />
            {isCodeErrorShow && (
              <p className="t_error">
                <span className="ico_error">{codeErrorMsg}</span>
              </p>
            )}
          </div>
          <div className="col_link">
            <span className="t c-gray">
              残り{seconds < 10 ? `0${seconds}` : seconds}秒
            </span>
            {/* <!-- 인증코드 남은시간 --> */}
            <button type="button" className="btn-pk s blue bdrs" disabled>
              <span>再転送</span>
            </button>
          </div>
        </div>
        <div className="btns pt0">
          <button
            type="submit"
            className="btn-pk mem blue"
            onClick={handleVerify}
          >
            <span>確認する</span>
          </button>
          <button type="submit" className="btn-pk mem blue2">
            <span>戻る</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Verify;
