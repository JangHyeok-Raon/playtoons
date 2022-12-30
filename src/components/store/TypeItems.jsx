import React from "react";
import { useSelector } from "react-redux";
import TypeItem from "./TypeItem";

const TypeItems = ({ selectTab, setSelectTab }) => {
  const productTypes = useSelector(({ store }) => store.productTypes);
  return (
    <ul className="inr-c">
      {productTypes?.map((item, index) => {
        return (
          <TypeItem
            key={`type_${index}`}
            item={item}
            selectTab={selectTab}
            setSelectTab={setSelectTab}
          />
        );
      })}
    </ul>
  );
};

export default TypeItems;
