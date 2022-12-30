import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import RecentItems from "@COMPONENTS/author/RecentItems";
import RecommentItems from "@COMPONENTS/author/RecommentItems";
import { getAuthorList } from "@/modules/redux/ducks/author";

const List = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAuthorList());
  }, [dispatch]);

  return (
    <div className="contents mauthor">
      <div className="inr-c">
        <div className="hd_titbox">
          <h2 className="h_tit0">最近確認したクリエイター</h2>
        </div>
        <RecentItems />
        <div className="hd_titbox">
          <h2 className="h_tit0">おすすめクリエイター</h2>
        </div>
        <RecommentItems />
      </div>
    </div>
  );
};

export default List;
