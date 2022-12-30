import React, { useState } from "react";
import Author from "./Author";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const AuthorItems = ({ curationNum }) => {
  const curations = useSelector(({ landing }) => landing.curations);
  const [items, setItems] = useState([]);
  useEffect(() => {
    if (curations && curationNum) {
      setItems(curations[curationNum]);
    }
  }, [curations, curationNum]);

  return (
    <>
      {items &&
        items.map((item, index) => (
          <Author key={`author_${index}`} item={item} />
        ))}
    </>
  );
};

export default AuthorItems;
