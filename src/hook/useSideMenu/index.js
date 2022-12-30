import { useState, useEffect, useCallback } from "react";

/**
 * Side menu hook
 * @returns isSideMenuShow / handleChange
 */
export default function useSideMenu() {
  const [isSideMenuShow, setIsSideMenuShow] = useState(true);
  const handleChange = useCallback(() => {
    console.log("isSideMenuShow : ", isSideMenuShow);
    setIsSideMenuShow(!isSideMenuShow);
  }, [isSideMenuShow]);

  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (windowSize?.width <= 960) {
      setIsSideMenuShow(false);
    }
  }, [windowSize]);

  return {
    isSideMenuShow,
    handleChange,
  };
}
