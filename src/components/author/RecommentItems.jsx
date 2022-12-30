import React from "react";
import { useSelector } from "react-redux";
import RecommentItem from "./RecommentItem";

const RecommentItems = () => {
  const authors = useSelector(({ author }) => author.authors);

  return (
    <div className="lst_author_profile">
      {authors &&
        authors.map((item, index) => {
          return <RecommentItem key={`recomment_${index}`} item={item} index={index} />;
        })}
    </div>
  );
};

export default RecommentItems;
