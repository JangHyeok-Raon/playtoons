import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import All from "@COMPONENTS/store/All";
import AssetSchool from "@COMPONENTS/store/AssetSchool";
import API from "@COMPONENTS/store/API";
import SearchPopup from "@COMPONENTS/SearchPopup";
import { setStore } from "@/modules/redux/ducks/store";
import TypeItems from "@COMPONENTS/store/TypeItems";

const Store = () => {
  const dispatch = useDispatch();
  const [selectTab, setSelectTab] = useState(null);
  const [searchText, setSearchText] = useState(null);
  const [isSearchPopupShow, setIsSearchPopupShow] = useState(false);
  const productTypes = useSelector(({ store }) => store.productTypes);

  const handleSearch = (searchText) => {
    setSearchText(searchText);
  };

  useEffect(() => {
    dispatch(setStore());
  }, [dispatch]);

  useEffect(() => {
    if (selectTab === null && productTypes?.length) {
      setSelectTab(productTypes[0].code);
    }
  }, [productTypes, selectTab]);

  return (
    <div className="contents">
      <div className="tab_imgs">
        <TypeItems selectTab={selectTab} setSelectTab={setSelectTab} />
      </div>
      {isSearchPopupShow && (
        <SearchPopup
          handleClose={() => setIsSearchPopupShow(!isSearchPopupShow)}
          onSearch={handleSearch}
        />
      )}
      {selectTab === "download" && (
        <All openSearch={() => setIsSearchPopupShow(true)} />
      )}
      {selectTab === "license" && (
        <AssetSchool openSearch={() => setIsSearchPopupShow(true)} />
      )}

      {selectTab === "api" && <API />}
    </div>
  );
};
export default Store;
