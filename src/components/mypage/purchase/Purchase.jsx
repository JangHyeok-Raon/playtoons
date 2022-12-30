import React from "react";

const Purchase = () => {
  return (
    <tr>
      <td className="hide-m">1</td>
      <td className="td_imgs2">
        <div className="cx_thumb">
          <span>
            <img src={require("@IMAGES/tmp_comic1.jpg")} alt="사진" />
          </span>
        </div>
      </td>
      <td className="td_subject">大学のリンゴ一個の重さで10メートルの素材</td>
      <td className="td_number3">1200000CP</td>
      <td className="td_txt1">
        <span className="view-m">販売開始日：</span>2022/06/01
      </td>
      <td className="td_btns2 et_botm1">
        <div className="d-ib">
          <a href="#" className="btn-pk s blue2">
            <span>レビュー</span>
          </a>
          <a href="#" className="btn-pk s blue">
            <span>お問合せ</span>
          </a>
        </div>
      </td>
    </tr>
  );
};

export default Purchase;
