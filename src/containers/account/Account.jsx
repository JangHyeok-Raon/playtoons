import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setContainer } from "@/modules/redux/ducks/container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/pro-solid-svg-icons";
import Login from "@COMPONENTS/auth/Login";
import Register from "@COMPONENTS/account/Register";
import Agreement from "@COMPONENTS/account/Agreement";
import Verify from "@COMPONENTS/account/Verify";
import Recover from "@COMPONENTS/account/Recover";
import RecoverCheck from "@COMPONENTS/account/RecoverCheck";
import RecoverConfirm from "@COMPONENTS/account/RecoverConfirm";
import UpdateEmail from "@COMPONENTS/account/UpdateEmail";
import UpdateEmailVerify from "@COMPONENTS/account/UpdateEmailVerify";
import Close from "@COMPONENTS/account/Close";
import UpdatePasswordCheck from "@COMPONENTS/account/UpdatePasswordCheck";
import UpdatePasswordConfirm from "@COMPONENTS/account/UpdatePasswordConfirm";

const Account = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const container = {
      isHeaderShow: false,
      isMenuShow: false,
      containerClass: "",
      headerClass: "head",
      headerType: null,
      menuType: null,
      activeMenu: null,
      isDetailView: false,
      isFooterShow: false,
    };
    dispatch(setContainer(container));
  }, [dispatch]);

  return (
    <div id="wrap">
      <section className="wrap_login">
        <header className="head">
          <div className="inr-c">
            <button
              type="button"
              className="btn_back"
              onClick={() => navigate(-1)}
            >
              <span className="icon">
                <FontAwesomeIcon icon={faAngleLeft} />
              </span>
            </button>
          </div>
        </header>

        <div className="inr-c">
          <div className="inner">
            <Routes>
              <Route path={"*"} element={<Login />} />
              <Route path={"/register"} element={<Register />} />
              <Route path={"/agreement"} element={<Agreement />} />
              <Route path={"/verify"} element={<Verify />} />
              <Route path={"/recover"} element={<Recover />} />
              <Route path={"/recover-check"} element={<RecoverCheck />} />
              <Route path={"/recover-confirm"} element={<RecoverConfirm />} />
              <Route path={"/update-email"} element={<UpdateEmail />} />
              <Route
                path={"/update-email-verify"}
                element={<UpdateEmailVerify />}
              />
              <Route path={"/close"} element={<Close />} />
              <Route
                path={"/update-password-check"}
                element={<UpdatePasswordCheck />}
              />
              <Route
                path={"/update-password-confirm"}
                element={<UpdatePasswordConfirm />}
              />
            </Routes>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Account;
