import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setDim } from "@/modules/redux/ducks/dim";

export const ScrollToTop = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(setDim({ dimType: null, isShow: false }));
  }, [dispatch, pathname]);

  return null;
};

export default ScrollToTop;
