import React, { useCallback, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setContainer } from "@/modules/redux/ducks/container";
import Page404 from "@COMPONENTS/Page404";
import Payment from "./Payment";
import PaymentPlan from "./PaymentPlan";
import PaymentComplete from "./PaymentComplete";
import PaymentDetail from "./PaymentDetail";

const App = () => {
  const dispatch = useDispatch();

  const handleContainer = useCallback(() => {
    const container = {
      headerClass: "header",
      containerClass: "container dashboard payment",
      isHeaderShow: true,
      isMenuShow: true,
      headerType: "post",
      menuType: "MAIN",
      isDetailView: false,
      activeMenu: "",
      isFooterShow: false,
    };
    dispatch(setContainer(container));
  }, [dispatch]);

  useEffect(() => {
    handleContainer();
  }, []);
  return (
    <Routes>
      <Route index element={<Payment />} />
      <Route path="/plan" element={<PaymentPlan />} />
      <Route path="/complete" element={<PaymentComplete />} />
      <Route path="/detail" element={<PaymentDetail />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export default App;
