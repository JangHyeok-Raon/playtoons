import React, { useCallback, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import List from "./List";
import Post from "./Post";
import Register from "./Register";
import RegisterForm from "./RegisterForm";
import Store from "./Store";
import Detail from "./Detail";
import { setContainer } from "@/modules/redux/ducks/container";
import Page404 from "@COMPONENTS/Page404";

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const handleContainer = useCallback(() => {
    const container = {
      headerClass: "header",
      containerClass: "container dashboard author",
      isHeaderShow: true,
      isMenuShow: true,
      headerType: "post",
      menuType: "MAIN",
      isDetailView: false,
      activeMenu: "creatorList",
      isFooterShow: false,
    };

    if (location.pathname === "/author/register") {
      container.containerClass = "container author_main";
      container.isMenuShow = false;
      container.isFooterShow = true;
    }

    dispatch(setContainer(container));
  }, [dispatch, location]);

  useEffect(() => {
    handleContainer();
  }, []);
  return (
    <Routes>
      <Route path="store" element={<Store />} />
      <Route path="list" element={<List />} />
      <Route path="post/:id" element={<Post />} />
      <Route path="/:id" element={<Post />} />
      <Route path="register" element={<Register />} />
      <Route path="register/form" element={<RegisterForm />} />
      <Route path="detail/:type/:id" element={<Detail />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export default App;
