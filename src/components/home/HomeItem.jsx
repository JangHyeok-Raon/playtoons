import React from "react";
import Cover from "./Cover";
import Character from "./Character";
import NovelPreview from "./NovelPreview";
import Register from "./Register";

const HomeItem = ({ item }) => {
  return (
    <>
      {item?.displayType === "cover" && <Cover curation={item.curation} />}
      {item?.displayType === "character" && (
        <Character curation={item.curation} />
      )}
      {item?.displayType === "novel_preview" && (
        <NovelPreview curation={item.curation} />
      )}
      {item?.campaignName === "register" && <Register />}
    </>
  );
};

export default HomeItem;
