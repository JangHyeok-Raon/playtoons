import React from "react";
import Reply from "./Reply";

const ReplyItems = () => {
  const tempItems = [
    {
      profileImage: require("@IMAGES/img_profile.png"),
      title: "魔法のピピみ",
      starCount: 4,
      date: "2022.06.01",
      likeCount: 1234,
      content: `ラフ公開や制作工程の紹介、他にも何かやれそうな事があったら公開できればと思います。
            ご支援いただいた分は作業環境・技術向上に使わせていただきます。
            よろしくお願いいたします。`,
    },
    {
      profileImage: require("@IMAGES/img_profile.png"),
      title: "魔法のピピみ",
      starCount: 1,
      date: "2022.05.29",
      likeCount: 1099,
      content: `ラフ公開や制作工程の紹介、他にも何かやれそうな事があったら公開できればと思います。
            ご支援いただいた分は作業環境・技術向上に使わせていただきます。
            よろしくお願いいたします。`,
    },
  ];
  return (
    <>
      <div className="hd_titbox">
        <h2 className="h_tit1">
          レビュー <span className="num ml30">142件</span>
        </h2>
      </div>
      <div className="lst_comm2">
        {tempItems.map((item, index) => (
          <Reply key={`reply_${index}`} item={item} />
        ))}

        <div className="botm">
          <a href="#">レビューをもっと見る</a>
        </div>
      </div>
    </>
  );
};
export default ReplyItems;
