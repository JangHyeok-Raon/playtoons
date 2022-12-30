import React from "react";
import HomeItem from "./HomeItem";
import { useSelector } from "react-redux";

const HomeItems = () => {
  const items = useSelector(({ home }) => home.contents);

  return (
    <>
      {items?.map((item, index) => (
        <HomeItem key={`cover_${index}`} item={item} />
      ))}
    </>
  );
};

export default HomeItems;
