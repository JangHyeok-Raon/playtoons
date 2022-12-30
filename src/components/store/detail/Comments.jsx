import React from "react";
import ReplyItems from "./ReplyItems";
import InquiryItems from "./InquiryItems";

const Comments = () => {
  return (
    <div className="wrap_comment">
      <ReplyItems />
      <InquiryItems />
    </div>
  );
};

export default Comments;
