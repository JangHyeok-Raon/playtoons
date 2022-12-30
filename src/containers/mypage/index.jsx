import React, { useEffect, useState } from "react";
import {
  Route,
  Routes,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { setContainer } from "@/modules/redux/ducks/container";
import PurchaseItems from "@COMPONENTS/mypage/purchase/PurchaseItems";
import ReviewItems from "@COMPONENTS/mypage/review/ReviewItems";
import InquiryItems from "@COMPONENTS/mypage/inquiry/InquiryItems";
import Page404 from "@COMPONENTS/Page404";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [type, setType] = useState(null);

  useEffect(() => {
    const container = {
      headerClass: "header",
      containerClass: "container list",
      isHeaderShow: true,
      isMenuShow: false,
      headerType: "post",
      menuType: "",
      isDetailView: false,
      activeMenu: "",
      isFooterShow: false,
    };
    dispatch(setContainer(container));
  }, [dispatch]);

  useEffect(() => {
    if (location?.pathname.includes("purchase")) {
      setType("purchase");
    } else if (location?.pathname.includes("review")) {
      setType("review");
    } else if (location?.pathname.includes("inquiry")) {
      setType("inquiry");
    } else {
      setType("purchase");
    }
  }, [location.pathname]);

  return (
    <>
      <div className="hd_tabbox">
        <div className="tabs ty1">
          <ul className="inr-c">
            <li
              className={type === "purchase" ? "on" : ""}
              onClick={() => navigate("purchase")}
            >
              <Link to="">
                <span>購入一覧</span>
              </Link>
            </li>
            <li
              className={type === "review" ? "on" : ""}
              onClick={() => navigate("review")}
            >
              <Link to="">
                <span>レビューリスト</span>
              </Link>
            </li>
            <li
              className={type === "inquiry" ? "on" : ""}
              onClick={() => navigate("inquiry")}
            >
              <Link to="">
                <span>お問合せ一覧</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <Routes>
        <Route path="purchase" element={<PurchaseItems />} />
        <Route path="review" element={<ReviewItems />} />
        <Route path="inquiry" element={<InquiryItems />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
};

export default App;
