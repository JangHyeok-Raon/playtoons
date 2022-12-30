import React, { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { setContainer } from "@/modules/redux/ducks/container";
import LandingPage from "./LandingPage";
import { setDim } from "@/modules/redux/ducks/dim";

const App = () => {
  const dispatch = useDispatch();

  const handleContainer = useCallback(() => {
    const container = {
      isHeaderShow: true,
      isMenuShow: false,
      containerClass: "container landing",
      headerClass: "header",
      headerType: null,
      menuType: "MAIN",
      activeMenu: null,
      isDetailView: false,
      isFooterShow: true,
    };
    dispatch(setContainer(container));
    dispatch(setDim({ dimType: null, isShow: false }));
  }, [dispatch]);

  useEffect(() => {
    handleContainer();
  }, []);

  return (
    <Routes>
      <Route index element={<LandingPage />} />
    </Routes>
  );
};

export default App;
