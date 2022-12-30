import React from "react";
import SeriesItem from "./SeriesItem";
import { useSelector } from "react-redux";

const SerieItems = () => {
  const currentAuthor = useSelector(({ author }) => author.currentAuthor);

  return (
    <div className="lst_series">
      <ul>
        {currentAuthor?.series &&
          currentAuthor?.series?.map((item, index) => (
            <SeriesItem key={`item_${index}`} item={item} />
          ))}
      </ul>
    </div>
  );
};

export default SerieItems;
