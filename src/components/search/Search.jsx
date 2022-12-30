import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import All from "./All";
import Series from "./Series";
import Hashtag from "./Hashtag";
import Author from "./Author";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/pro-light-svg-icons";
import { faCircleXmark, faXmarkLarge } from "@fortawesome/pro-solid-svg-icons";

const Search = () => {
  const orderTypes = [
    {
      code: "RECOMMEND",
      name: "おすすめ順",
    },
    {
      code: "LATEST",
      name: "最新順",
    },
  ];
  const [selectTab, setSelectTab] = useState("ALL");
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [selectOrder, setSelectOrder] = useState(orderTypes[0]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOrderChange = useCallback((item) => {
    setSelectOrder(item);
    setIsOrderOpen(false);
  }, []);

  return (
    <>
      <div className="top_search inr-c">
        <h2 className="m_tit1">
          <span className="c-blue">“エヴァンゲリオン”</span>の検索結果 4112件
        </h2>
        <div className="in ty1">
          <div className="lft">
            <div className="tabs ty2">
              <ul>
                <li
                  className={selectTab === "ALL" ? "on" : ""}
                  onClick={() => setSelectTab("ALL")}
                >
                  <Link to="">すべて</Link>
                </li>
                <li
                  className={selectTab === "SERIES" ? "on" : ""}
                  onClick={() => setSelectTab("SERIES")}
                >
                  <Link to="">シリーズ</Link>
                </li>
                <li
                  className={selectTab === "HASHTAG" ? "on" : ""}
                  onClick={() => setSelectTab("HASHTAG")}
                >
                  <Link to="">ハッシュタグ</Link>
                </li>
                <li
                  className={selectTab === "AUTHOR" ? "on" : ""}
                  onClick={() => setSelectTab("AUTHOR")}
                >
                  <Link to="">クリエイター</Link>
                </li>
              </ul>
            </div>
          </div>
          {selectTab === "HASHTAG" && (
            <div className="main_sch">
              <Link to="" className="btn-pk n blue bdrs">
                すべて
              </Link>
              <button
                type="button"
                className="btn_sch_input"
                onClick={() => setIsPopupOpen(true)}
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} /> ハッシュタグ検索
              </button>

              <Link to="" className="btn-pk n blue2 bdrs">
                異世界
                <button type="button" className="btn_sch_del">
                  <FontAwesomeIcon icon={faCircleXmark} />
                </button>
              </Link>
              <Link to="" className="btn-pk n blue2 bdrs">
                SF
                <button type="button" className="btn_sch_del">
                  <FontAwesomeIcon icon={faCircleXmark} />
                </button>
              </Link>
              <Link to="" className="btn-pk n blue2 bdrs">
                恋愛
                <button type="button" className="btn_sch_del">
                  <FontAwesomeIcon icon={faCircleXmark} />
                </button>
              </Link>
              <Link to="" className="btn-pk n blue2 bdrs">
                アクション
                <button type="button" className="btn_sch_del">
                  <FontAwesomeIcon icon={faCircleXmark} />
                </button>
              </Link>
              <Link to="" className="btn-pk n blue2 bdrs">
                日常
                <button type="button" className="btn_sch_del">
                  <FontAwesomeIcon icon={faCircleXmark} />
                </button>
              </Link>
              <Link to="" className="btn-pk n blue2 bdrs">
                その他
                <button type="button" className="btn_sch_del">
                  <FontAwesomeIcon icon={faCircleXmark} />
                </button>
              </Link>
              <Link to="" className="btn-pk n blue2 bdrs">
                日常
                <button type="button" className="btn_sch_del">
                  <FontAwesomeIcon icon={faCircleXmark} />
                </button>
              </Link>
              <Link to="" className="btn-pk n blue2 bdrs">
                その他
                <button type="button" className="btn_sch_del">
                  <FontAwesomeIcon icon={faCircleXmark} />
                </button>
              </Link>
            </div>
          )}
          {isPopupOpen && (
            <div className="popup_dim">
              <div id="popSearch" className="layerPopup pop_search">
                <div className="popup">
                  <div className="pop_head">
                    <h2 className="title">ハッシュタグ検索</h2>
                    <button type="button" className="btn_pop_close b-close">
                      <FontAwesomeIcon icon={faXmarkLarge} />
                      close
                    </button>
                  </div>
                  <div className="pop_cont">
                    <input
                      type="text"
                      className="inp_txt w100p"
                      placeholder="ハッシュタグ名"
                    />
                  </div>
                  <div className="pop_botm">
                    <button
                      type="button"
                      className="btn-pk blue2"
                      onClick={() => setIsPopupOpen(false)}
                    >
                      キャンセル
                    </button>
                    <button type="button" className="btn-pk blue">
                      検索
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="rgh">
            <div className="btn_select1">
              <button
                type="button"
                className="select_tit"
                onClick={() => setIsOrderOpen(!isOrderOpen)}
              >
                {selectOrder.name}
              </button>
              {isOrderOpen && (
                <div className="select_list">
                  <ul>
                    {orderTypes.map((item, index) => (
                      <li
                        key={`orderType_${index}`}
                        onClick={() => handleOrderChange(item)}
                      >
                        <Link to="">{item.name}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {selectTab === "ALL" && <All orderType={selectOrder} />}
      {selectTab === "SERIES" && <Series orderType={selectOrder} />}
      {selectTab === "HASHTAG" && <Hashtag orderType={selectOrder} />}
      {selectTab === "AUTHOR" && <Author orderType={selectOrder} />}
    </>
  );
};

export default Search;
