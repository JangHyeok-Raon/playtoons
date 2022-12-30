import React, { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { setContainer } from "@/modules/redux/ducks/container";
import Home from "./Home";
import { setDim } from "@/modules/redux/ducks/dim";

const App = () => {
  const dispatch = useDispatch();

  const handleContainer = useCallback(() => {
    const container = {
      isHeaderShow: true,
      isMenuShow: true,
      containerClass: "container dashboard landing log_landing",
      headerClass: "header",
      headerType: "post",
      menuType: "MAIN",
      activeMenu: "search",
      isDetailView: false,
      isFooterShow: false,
    };
    dispatch(setContainer(container));
    dispatch(setDim({ dimType: null, isShow: false }));
  }, [dispatch]);

  useEffect(() => {
    handleContainer();
  }, []);

  return (
    <Routes>
      <Route index element={<Home />} />
    </Routes>
  );
};

export default App;
