import React, { useEffect, useState, useCallback } from "react";
import { getPostTypes as getPostTypesAPI } from "@API/postService";

import TypeItem from "./TypeItem";

const TypeItems = () => {
  const [items, setItems] = useState([]);

  const getPostTypes = useCallback(async () => {
    const response = await getPostTypesAPI("home");
    if (response?.status === 200) {
      setItems(response.data?.types);
    }
  }, []);

  useEffect(() => {
    getPostTypes();
  }, []);

  return (
    <div className="main_area">
      <div className="inr-c">
        <div className="lst_card2">
          {items?.map((item, index) => (
            <TypeItem key={`type_${index}`} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TypeItems;
