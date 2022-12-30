import React, { useState, useCallback, useRef } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { recoverCheckCode } from "@API/accountService";

const RecoverCheck = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, expireOn } = location.state;
  const [seconds, setSeconds] = useState(0);

  const [code, setCode] = useState(null);
  const codeRef = useRef(null);

  const [isCodeErrorShow, setIsCodeErrorShow] = useState(false);
  const [codeErrorMsg, setCodeErrorMsg] = useState(null);

  const [isCheckErrorShow, setIsCheckErrorShow] = useState(false);
  const [checkErrorMsg, setCheckErrorMsg] = useState(false);

  /**
   * email State 변경 함수
   * @param {Event} e
   */
  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleRecoverCheck = useCallback(async () => {
    if (!code) {
      codeRef.current.focus();
      setIsCodeErrorShow(true);
      setCodeErrorMsg("Code 없음");
      return;
    } else {
      setIsCodeErrorShow(false);
      setCodeErrorMsg(null);
    }
    const response = await recoverCheckCode({ code });

    const { status } = response;
    if (status === 200) {
      navigate("../recover-confirm", { state: { code } });
    } else {
      setIsCheckErrorShow(true);
      setCheckErrorMsg(`코드 참조 : ${status}`);
    }
  }, [code, navigate]);

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
      <h1 className="logo">パスワードを再設定</h1>
      <div className="txt">
        <p className="c-blue">{email}</p>
        <p>宛に認証用メールを送信しました。</p>
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
        <div className="inbox ty1">
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
            {/*<!-- 인증코드 남은시간 -->*/}
            <button type="button" className="btn-pk s blue bdrs" disabled>
              <span>再転送</span>
            </button>
            {/*<!-- 재전송 버튼 활성화 시 disabled 제거 -->*/}
          </div>
        </div>
        <div className="btns ty1">
          <button
            type="submit"
            className="btn-pk mem blue"
            onClick={handleRecoverCheck}
          >
            <span>確認する</span>
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

export default RecoverCheck;
