import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Page404 = () => {
  const isLogined = useSelector(({ login }) => login.isLogined);
  const homeURL = isLogined ? "/home" : "/";
  return (
    <div className="contents page404">
      <div className="wrap_404">
        <div className="txt">
          <p className="h1">お探しのページは見つかりませんでした。</p>
          <p className="t1">URLが間違っているか、ページが存在しません。</p>
          <div className="btn-bot">
            <Link to={homeURL} className="btn-pk n blue2">
              ホームに戻る
            </Link>
          </div>
        </div>
        <div className="imgs">
          <img src={require("@IMAGES/img_404.png")} alt="404" />
        </div>
      </div>
    </div>
  );
};

export default Page404;
