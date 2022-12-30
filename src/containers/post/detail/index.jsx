import React, { useEffect, useCallback } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import Novel from "./Novel";
import Webtoon from "./Webtoon";
import Page404 from "@COMPONENTS/Page404";
import { setContainer } from "@/modules/redux/ducks/container";

const App = () => {
  const dispatch = useDispatch();
  const handleContainer = useCallback(() => {
    const container = {
      headerClass: "header ty1 mdetail",
      containerClass: "container sub mpost bg",
      isHeaderShow: true,
      isMenuShow: false,
      headerType: "post",
      menuType: "MAIN",
      isDetailView: true,
      isFooterShow: false,
    };
    dispatch(setContainer(container));
  }, [dispatch]);

  useEffect(() => {
    handleContainer();
  }, [dispatch]);
  return (
    <Routes>
      <Route path={"novel/:id"} element={<Novel />} />
      <Route path={"webtoon/:id"} element={<Webtoon />} />
      <Route path={"*"} element={<Page404 />} />
    </Routes>
  );
};

export default App;
