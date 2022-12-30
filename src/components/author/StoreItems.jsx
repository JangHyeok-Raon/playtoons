import React from "react";
import { useSelector } from "react-redux";
import StoreItem from "./StoreItem";

const StoreItems = () => {
  const currentAuthor = useSelector(({ author }) => author.currentAuthor);
  return (
    <div className="lst_store1 widn">
      {currentAuthor?.products &&
        currentAuthor?.products?.map((item, index) => (
          <StoreItem key={`item_${index}`} item={item} />
        ))}
    </div>
  );
};

export default StoreItems;
