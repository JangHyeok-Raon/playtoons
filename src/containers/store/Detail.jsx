import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setContainer } from "@/modules/redux/ducks/container";
import Store from "@COMPONENTS/store/detail/Store";

const Detail = () => {
  const dispatch = useDispatch();
  const handleContainer = useCallback(() => {
    const container = {
      isHeaderShow: true,
      isMenuShow: true,
      containerClass: "container store_detail",
      headerClass: "header",
      headerType: null,
      menuType: "MAIN",
      activeMenu: "maquettePlace",
      isDetailView: false,
      isFooterShow: false,
    };
    dispatch(setContainer(container));
  }, [dispatch]);

  useEffect(() => {
    handleContainer();
  }, []);
  return <Store />;
};

export default Detail;
