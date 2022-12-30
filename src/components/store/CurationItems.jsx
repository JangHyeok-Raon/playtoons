import React from "react";
import { useSelector } from "react-redux";
import CurationItem from "./CurationItem";

const CurationItems = () => {
  const contents = useSelector(({ store }) => store.contents);
  return (
    <>
      {contents?.map((item, index) => (
        <CurationItem key={`curation_${index}`} item={item} />
      ))}
    </>
  );
};

export default CurationItems;
