import React from "react";
import styled from "styled-components";
import useFilePath from "@/hook/useFilePath";

const TypeItem = ({ item, selectTab, setSelectTab }) => {
  const { filePath, loading } = useFilePath(item?.iconImage);

  return (
    <li
      className={selectTab === item.code ? "on" : ""}
      onClick={() => setSelectTab(item.code)}
    >
      {!loading && (
        <ImgA href="#" bgImg={filePath}>
          <span>{item?.name}</span>
        </ImgA>
      )}
    </li>
  );
};

const ImgA = styled.a`
  background-image: url(${(props) => props.bgImg});
`;
export default TypeItem;
