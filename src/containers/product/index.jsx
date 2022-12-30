import React, { useCallback, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setContainer } from "@/modules/redux/ducks/container";
import Page404 from "@COMPONENTS/Page404";
import Edit from "./Edit";
import Upload from "./Upload";

const App = () => {
  const dispatch = useDispatch();

  const handleContainer = useCallback(() => {
    const container = {
      headerClass: "header ty1",
      containerClass: "container sub post",
      isHeaderShow: true,
      isMenuShow: false,
      headerType: "product",
      menuType: "MAIN",
      isDetailView: true,
      isFooterShow: false,
    };
    dispatch(setContainer(container));
  }, [dispatch]);

  useEffect(() => {
    handleContainer();
  }, []);
  return (
    <>
      <Routes>
        <Route path={"*"} element={<Page404 />} />
        <Route path={"edit/:id"} element={<Edit />} />
        <Route path={"upload"} element={<Upload />} />
      </Routes>
    </>
  );
};

export default App;
