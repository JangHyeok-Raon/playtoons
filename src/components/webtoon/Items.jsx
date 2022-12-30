import {
  faMagnifyingGlass
} from "@fortawesome/pro-light-svg-icons";
import { faCircleXmark } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { setReduxOfWebtoon } from "@/common/common";
import { getPostList as getPostListAPI } from "@API/postService";
import { getTags as getTagsAPI } from "@API/webtoonService";
import SearchPopup from "@COMPONENTS/SearchPopup";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "../dashboard/Dropdown";
import MyPagination from "../dashboard/MyPagination";
import Item from "./Item";
import EmptyDiv from "../dashboard/EmptyDiv";

const orderByMenus = [
  {
    // 신작순
    code: "recent",
    name: "新着順",
  },
  {
    // 추천순
    code: "recommend",
    name: "おすすめ順",
  },
  {
    // 평가순
    code: "rank",
    name: "評価順",
  },
];

const Items = ({ tab, typeId }) => {
  const reduxWebtoon = useSelector( ({post}) => post.webtoon );
  const [isSearchPopupShow, setIsSearchPopupShow] = useState(false);
  const [renderItems, setRenderItems] = useState([]);
  const [tags, setTags] = useState([]);
  const [meta, setMeta] = useState(null);
  const dispatch = useDispatch();

  const setOrderBy = (item) => {
    setReduxOfWebtoon(dispatch, tab, 1, item, reduxWebtoon?.tags, reduxWebtoon?.keyword);
  };

  const getPostList = async (params, tags) => {
    delete params["completed"];
    delete params["series"];
    delete params["short"];

    params.typeId = typeId;
    params.orderKey = reduxWebtoon?.orderKey.code || 'recent';
    params.order = "DESC";
    params.limit = 16;

    if (tab === "COMPLETED") {
      params.completed = true;
    } else if (tab === "SERIES") {
      params.series = true;
    } else if (tab === "SHORT") {
      params.short = true;
    }

    if (!params?.page) {
      params["page"] = 1;
    }

    const response = await getPostListAPI(params, tags);
    if (response.status === 200) {
      setRenderItems(response.data.posts);
      setMeta(response.data.meta);
    }
  };

  useEffect(() => {
    async function getTags() {
      const response = await getTagsAPI();
      if (response?.status === 200) {
        setTags(response.data?.tags);
      }
    }
    if (!tags?.length) {
      getTags();
    }
  }, [tags]);


  useEffect(() => {
    if( typeId && reduxWebtoon ){
      getPostList({keyword: reduxWebtoon?.keyword || '', page: reduxWebtoon?.page}, reduxWebtoon?.tags);
    }
  }, [typeId, reduxWebtoon]);

  const handleSelectTagChange = useCallback((item) => {
      // 검색으로 변경
      let list = Array.from(reduxWebtoon?.tags || []);
      const selected = list?.findIndex((tag) => tag.id === item.id) > -1;
      let newTags = undefined;
      if (selected) {
        newTags = list?.filter((tag) => tag.id !== item.id);
      } else {
        newTags = [...list, item];
      }

      setReduxOfWebtoon(dispatch, tab, 1, reduxWebtoon?.orderKey, newTags, reduxWebtoon?.keyword);
    }, [reduxWebtoon?.tags]);

  const handleSearch = (searchText) => {
    setReduxOfWebtoon(dispatch, tab, 1, reduxWebtoon?.orderKey, reduxWebtoon?.tags, searchText || '');
  };


  return (
    <>
      <div className="main_sch">
        <div className="lft">
          <Link
            to="#"
            className={`btn-pk n bdrs ${!reduxWebtoon?.tags?.length ? "blue" : "blue2"}`}
            onClick={() => {
              setReduxOfWebtoon(dispatch, tab, 1, reduxWebtoon?.orderKey, [], reduxWebtoon?.keyword);
            }}
          >
            すべて
          </Link>
          <button
            type="button"
            className="btn_sch_input"
            onClick={() => setIsSearchPopupShow(!isSearchPopupShow)}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />{" "}
            {reduxWebtoon?.keyword || "ハッシュタグ検索"}
          </button>
          {tags &&
            tags.map((tag, index) => {
              const selected =
                reduxWebtoon?.tags?.findIndex((sTag) => sTag.id === tag.id) > -1;
              return (
                <Link
                  key={`tag_${index}`}
                  to="#"
                  className={`btn-pk n bdrs blue2 ${selected ? "on" : ""}`}
                  onClick={() => {
                    handleSelectTagChange(tag);
                  }}
                >
                  #{tag.name}
                  {selected && (
                    <button
                      type="button"
                      className="btn_sch_del"
                      onClick={() => handleSelectTagChange(tag)}
                    >
                      <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                  )}
                </Link>
              );
            })}
        </div>
        <div className="rgh">
          <Dropdown
            className={'wt'}
            dataList={orderByMenus} 
            selected={reduxWebtoon?.orderKey?.code}
            handleItemClick={setOrderBy}/>
        </div>
      </div>
      <div className="lst_main_comic">
        <ul>
          {renderItems && renderItems?.length > 0 ? (
              renderItems.map((item, index) => (
                <Item key={`item_${index}`} item={item} />
              ))
            ) : (
              <EmptyDiv
                className={"relative empty"}
                text={'ウェブトゥーンがいません。'}
                />
            )
          }
        </ul>
      </div>

      <MyPagination
          className={""}
          meta={meta}
          callback={(page) => {
            setReduxOfWebtoon(dispatch, tab, page, reduxWebtoon?.orderKey, reduxWebtoon?.tags, reduxWebtoon?.keyword);
          }}
        />

      {isSearchPopupShow && (
        <SearchPopup
          handleClose={() => setIsSearchPopupShow(!isSearchPopupShow)}
          onSearch={handleSearch}
        />
      )}
    </>
  );
};

export default Items;
