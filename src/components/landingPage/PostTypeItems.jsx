import React from "react";
import PostType from "./PostType";
import { useSelector } from "react-redux";
const PostTypeItems = () => {
  const postTypeColor = [
    "#2F83FF",
    "#FFA82F",
    "#9058FD",
    "#FFBE28",
    "#FFDC2F",
    "#FFA82F",
  ];

  const items = useSelector(({ landing }) => landing.types);

  return (
    <>
      {items &&
        items.map((item, index) => (
          <PostType
            key={`postType_${index}`}
            item={item}
            bgColor={postTypeColor[index]}
          />
        ))}
    </>
  );
};

export default PostTypeItems;
