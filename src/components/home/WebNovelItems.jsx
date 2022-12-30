import React, { useState, useEffect } from "react";
import { getCurationList as getCurationListAPI } from "@/services/curationService";
import WebNovelItem from "./WebNovelItem";

const WebNovelItems = ({ curationNum }) => {
  const [items, setItems] = useState([]);

  const getCurationList = async (curationNum) => {
    const response = await getCurationListAPI(curationNum);
    if (response.status === 200) {
      setItems(response.data.posts);
    }
  };

  useEffect(() => {
    if (!items?.length) {
      getCurationList(curationNum);
    }
  }, [items, curationNum]);
  return (
    <div className="lst_novel1">
      {items?.map((item, index) => (
        <WebNovelItem key={`web_novel_${index}`} item={item} />
      ))}
    </div>
  );
};

export default WebNovelItems;
