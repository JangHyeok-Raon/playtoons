import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Reply from "./Reply";

const ReplyItems = ({isAdd}) => {
  const [stateIsAdd, setStateIsAdd] = useState(false);
  const [reactions, setReactions] = useState({meta: undefined, reactions: []});
  const currentPost = useSelector(({ post }) => post.currentPost);

  useEffect(() => {
    if (currentPost?.reactions) {
      setReactions(currentPost?.reactions);
    } else {
      setReactions([]);
    }

    if (stateIsAdd) {
      setStateIsAdd(false);
      let list = JSON.parse(JSON.stringify(reactions.reactions));
      list.push.apply(list, currentPost?.reactions.reactions);
      setReactions({
        meta: currentPost?.reactions.meta,
        reactions: list
      });
    }
  }, [currentPost]);

  useEffect(() => {
    setStateIsAdd(isAdd);
  }, [isAdd]);

  return (
    <>
      {reactions?.reactions?.map((item, index) => {
        return <Reply key={`reply_${index}`} item={item} />;
      })}
    </>
  );
};

export default ReplyItems;
