import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/pro-solid-svg-icons";
import { useWindowSize } from "@/hook/useWindowSize";

const SideBar = ({ handleChange }) => {
  const menus = useSelector(({ container }) => container.menus);
  const activeMenu = useSelector(({ container }) => container.activeMenu);
  const windowsSize = useWindowSize();
  const isLogined = useSelector(({ login }) => login.isLogined);
  const homeURL = isLogined ? "/home" : "/";
  return (
    <aside className="sidebar">
      <div className="top view-m">
        <button
          type="button"
          className="btn_gnb"
          title="메뉴"
          onClick={() => handleChange()}
        >
          <span>
            <FontAwesomeIcon icon={faBars} />
          </span>
        </button>
        <h1 className="logo">
          <Link to={homeURL}>
            <span className="ico_logo">PlayToons</span>
          </Link>
        </h1>
      </div>
      {menus &&
        Object.entries(menus).map(([key, value], index) => {
          return (
            <div key={key}>
              <h2 className={`tit ${index > 0 ? "bdt" : ""}`}>{key}</h2>
              <nav className="menu">
                <ul>
                  {value.map((item) => {
                    return (
                      <li
                        className={`s1 ${activeMenu === item.code ? "on" : ""}`}
                        key={item.code}
                      >
                        <Link
                          to={`${item.link}`}
                          onClick={() => {
                            if (!item?.link) {
                              alert(`${item?.link} 링크 준비중입니다.`);
                            } else {
                              if (windowsSize.width < 961) {
                                handleChange();
                              }
                            }
                          }}
                        >
                          <span className="ico">
                            {(activeMenu === item.code && (
                              <FontAwesomeIcon icon={item.icon.on} />
                            )) || <FontAwesomeIcon icon={item.icon.off} />}
                          </span>
                          <span>{item.name}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          );
        })}
    </aside>
  );
};

export default SideBar;
