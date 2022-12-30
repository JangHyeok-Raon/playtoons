import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPostTypes as getPostTypesAPI } from "@API/postService";
import { getCategorys as getCategorysAPI } from "@API/postService";

import CurationItems from "@COMPONENTS/novel/CurationItems";
import Items from "@COMPONENTS/novel/Items";
import { setContainer } from "@/modules/redux/ducks/container";
import { setReduxOfNovel } from "@/common/common";

const Novel = () => {
  const dispatch = useDispatch();
  
  const [selectTab, setSelectTab] = useState("EVERY");
  const reduxNovel = useSelector( ({post}) => post.novel );

  /** ===== Post type API Start ===== */
  const [postType, setPostType] = useState([]);
  const [typeId, setTypeId] = useState();
  const getPostTypes = async () => {
    const response = await getPostTypesAPI();
    if (response.status === 200) {
      setPostType(response.data.types);
    }
  };
  useEffect(() => {
    if (!postType?.length) {
      getPostTypes();
    }
  }, [postType]);
  /** ===== Post type API End ===== */

  /** ===== Post type id <=> category API Start ===== */
  const [categorys, setCategorys] = useState([]);
  const getCategorys = async (id) => {
    const response = await getCategorysAPI(id);
    if (response.status === 200) {
      setCategorys(response.data.categories);
    }
  };
  useEffect(() => {
    if (postType?.length && !categorys?.length) {
      const novel = postType.find((post) => post.code === "novel");
      setTypeId(novel.id);
      getCategorys(novel.id);
    }
  }, [categorys, postType]);
  /** ===== Post type id <=> category API End ===== */

  /**
   * EVERY - 모두
   * COMPLETED - 완결
   * SERIES - 연재
   * SHORT - 단편
   */

  const handleSelectTab = (tab) => {
    setSelectTab(tab);
    setReduxOfNovel(
      dispatch, 
      {
        type: tab, 
        page: 1, 
        orderKey: {code: 'recent'}, 
        tags: [], 
        keyword: ''
      }
    );
  };

  const handleContainer = useCallback(() => {
    const container = {
      isHeaderShow: true,
      isMenuShow: true,
      containerClass: "container dashboard webtoon",
      headerClass: "header",
      headerType: null,
      menuType: "MAIN",
      activeMenu: null,
      isDetailView: false,
      isFooterShow: false,
    };
    dispatch(setContainer(container));
  }, [dispatch]);

  useEffect(() => {
    handleContainer();

    if( reduxNovel?.type ){
      setSelectTab(reduxNovel?.type);
    }
  }, []);

  return (
    <>
      <div className="contents novel">
        <div className="inr-c">
          <CurationItems curationNum={5} />

          <div className="tabs ty1">
            <ul>
              <li
                className={selectTab === "EVERY" ? "on" : ""}
                onClick={() => handleSelectTab("EVERY")}
              >
                <Link to="">
                  <span>すべて</span>
                </Link>
              </li>
              <li
                className={selectTab === "SERIES" ? "on" : ""}
                onClick={() => handleSelectTab("SERIES")}
                >
                <Link to="">
                  <span>連載</span>
                </Link>
              </li>
              <li
                className={selectTab === "COMPLETED" ? "on" : ""}
                onClick={() => handleSelectTab("COMPLETED")}
              >
                <Link to="">
                  <span>完結</span>
                </Link>
              </li>
              <li
                className={selectTab === "SHORT" ? "on" : ""}
                onClick={() => handleSelectTab("SHORT")}
              >
                <Link to="">
                  <span>短編</span>
                </Link>
              </li>
            </ul>
          </div>

          <Items tab={selectTab} typeId={typeId} />
        </div>
      </div>
    </>
  );
};

export default Novel;
