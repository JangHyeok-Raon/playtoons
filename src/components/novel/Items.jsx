import {
  faMagnifyingGlass
} from "@fortawesome/pro-light-svg-icons";
import { faCircleXmark } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { setReduxOfNovel } from "@/common/common";
import { getPostList as getPostListAPI } from "@API/postService";
import { getTags as getTagsAPI } from "@API/webtoonService";
import SearchPopup from "@COMPONENTS/SearchPopup";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "../dashboard/Dropdown";
import EmptyDiv from "../dashboard/EmptyDiv";
import MyPagination from "../dashboard/MyPagination";
import Item from "./Item";

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
  const [isSearchPopupShow, setIsSearchPopupShow] = useState(false);
  const [renderItems, setRenderItems] = useState([]);
  const [tags, setTags] = useState([]);
  const [meta, setMeta] = useState(null);
  const reduxNovel = useSelector( ({post}) => post.novel );
  const dispatch = useDispatch();

  const setOrderBy = (menu) => {
    setReduxOfNovel( dispatch, {...reduxNovel, orderKey: menu} );
  };

  const getPostList = async () => {
    let params = {
      keyword: reduxNovel?.keyword || '', 
      page: reduxNovel?.page || 1,
      orderKey: reduxNovel?.orderKey?.code || 'recent',
      typeId: typeId,
      order: "DESC",
      limit: 16,
    };

    if (tab === "COMPLETED") {
      params.completed = true;
    } else if (tab === "SERIES") {
      params.series = true;
    } else if (tab === "SHORT") {
      params.short = true;
    }

    const response = await getPostListAPI(params, reduxNovel?.tags);
    if (response.status === 200) {
      setRenderItems(response.data.posts);
      setMeta(response.data.meta);
    }
  };

  useEffect(() => {
    if ( typeId  && reduxNovel ) {
      getPostList();
    }
  }, [typeId, reduxNovel]);


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

  const handleSelectTagChange = useCallback((item) => {
      // 검색으로 변경]
      let newTags = undefined;
      let list = Array.from(reduxNovel?.tags);
      const selected = list.findIndex((tag) => tag.id === item.id) > -1;
      if (selected) {
        newTags = list.filter((tag) => tag.id !== item.id);
      } else {
        newTags = [...list, item];
      }

      setReduxOfNovel( dispatch, {...reduxNovel, tags: newTags} );
  },[reduxNovel?.tags]);

  const handleSearch = (searchText) => {
    setReduxOfNovel( dispatch, {...reduxNovel, keyword: searchText} );
  };


  return (
    <>
      <div className="main_sch">
        <div className="lft">
          <Link
            to="#"
            className={`btn-pk n bdrs ${!reduxNovel?.tags?.length ? "blue" : "blue2"}`}
            onClick={() => {
              setReduxOfNovel( dispatch, {...reduxNovel, tags: []} );
            }}
          >
            すべて
          </Link>
          <button
            type="button"
            className="btn_sch_input"
            onClick={() => setIsSearchPopupShow(!isSearchPopupShow)}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            {` ${reduxNovel?.keyword || "ハッシュタグ検索"}`}
          </button>
          {tags &&
            tags.map((tag, index) => {
              const selected =
                reduxNovel?.tags.findIndex((sTag) => sTag.id === tag.id) > -1;
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
              selected={reduxNovel?.orderKey?.code}
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
                text={'ウェブ小説がいません。'}
                />
            )
          }
        </ul>
      </div>

      <MyPagination
        className={""}
        meta={meta}
        callback={(page) => {
          setReduxOfNovel( dispatch, {...reduxNovel, page: page} );
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
