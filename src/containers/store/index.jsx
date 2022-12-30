import React, { useCallback, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setContainer } from "@/modules/redux/ducks/container";
import Page404 from "@COMPONENTS/Page404";
import Store from "./Store";
import Detail from "./Detail";

const App = () => {
  const dispatch = useDispatch();

  const handleContainer = useCallback(() => {
    const container = {
      headerClass: "header",
      containerClass: "container store_main",
      isHeaderShow: true,
      isMenuShow: true,
      headerType: "post",
      menuType: "MAIN",
      isDetailView: false,
      activeMenu: "maquettePlace",
      isFooterShow: false,
    };
    dispatch(setContainer(container));
  }, [dispatch]);

  useEffect(() => {
    handleContainer();
  }, []);
  return (
    <Routes>
      <Route index element={<Store />} />
      <Route path="*" element={<Page404 />} />
      <Route path="detail/:id" element={<Detail />} />
    </Routes>
  );
};

export default App;
