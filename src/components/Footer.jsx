import React, { useState } from "react";
import { Link } from "react-router-dom";
import EulaPopup from "@COMPONENTS/EulaPopup";
import PrivacyPopup from "./PrivacyPopup";

const Footer = () => {
  const [isEulaPopupShow, setIsEulaPopupShow] = useState(false);
  const [isPrivacyPopupShow, setIsPrivacyPopupShow] = useState(false);

  return (
    <>
      <footer id="footer" className="footer">
        <div className="inr-c">
          <div className="foo_logo">PlayToons</div>
          <p className="copy">&copy;Rocketstaff All Right Reserved.</p>

          <div className="rgh">
            <Link to="" onClick={() => setIsEulaPopupShow(!isEulaPopupShow)}>
              利用規約
            </Link>
            <Link
              to=""
              onClick={() => setIsPrivacyPopupShow(!isPrivacyPopupShow)}
            >
              プライバシーポリシー
            </Link>
            <a href="#">会社情報</a>
          </div>
        </div>
      </footer>
      {isEulaPopupShow && (
        <EulaPopup
          handleClose={() => setIsEulaPopupShow(false)}
          readonly={true}
        />
      )}
      {isPrivacyPopupShow && (
        <PrivacyPopup
          handleClose={() => setIsPrivacyPopupShow(false)}
          readonly={true}
        />
      )}
    </>
  );
};

export default Footer;
