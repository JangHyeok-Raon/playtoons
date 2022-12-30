import { createAction, handleActions } from "redux-actions";
import produce from "immer";

import {
  faHouseChimneyWindow as faHouseChimneyWindowOFF,
  faInfinity as faInfinityOFF,
  faStars as faStarsOFF,
  faCartShopping as faCartShoppingOFF,
  faTableColumns as faTableColumnsOFF,
  faDiamond as faDiamondOFF,
  faUser as faUserOFF,
  faObjectUnion as faObjectUnionOFF,
  faSquarePen as faSquarePenOFF,
  faSeal as faSealOFF,
  faChartLine as faChartLineOFF,
} from "@fortawesome/pro-light-svg-icons";
import {
  faHouseChimneyWindow as faHouseChimneyWindowON,
  faInfinity as faInfinityON,
  faStars as faStarsON,
  faCartShopping as faCartShoppingON,
  faDiamond as faDiamondON,
  faUser as faUserON,
  faObjectUnion as faObjectUnionON,
  faSquarePen as faSquarePenON,
  faSeal as faSealON,
  faChartLine as faChartLineONN,
} from "@fortawesome/pro-solid-svg-icons";
import { faTableColumns as faTableColumnsON } from "@fortawesome/pro-regular-svg-icons";

/* --- Action Types --- */
const SET_CONTAINER = "container/SET_CONTAINER";
const SET_HEADER_SHOW = "container/SET_HEADER_SHOW";
const SET_HEADER_TYPE = "container/SET_HEADER_TYPE";
const SET_HEADER_CLASS = "container/SET_HEADER_CLASS";
const SET_CONTAINER_CLASS = "container/SET_CONTAINER_CLASS";
const SET_DETAIL_VIEW = "container/SET_DETAIL_VIEW";
const SET_MENU_SHOW = "container/SET_MENU_SHOW";
const SET_MENUS = "container/SET_MENUS";
const SET_ACTIVE_MENU = "container/SET_ACTIVE_MENU";
const SET_BACK_TITLE = "container/SET_BACK_TITLE";
const SET_FOOTER_SHOW = "container/SET_FOOTER_SHOW";
/* -------------------- */

/* ------ Actions ----- */
export const setContainer = createAction(SET_CONTAINER);
export const setHeaderShow = createAction(SET_HEADER_SHOW);
export const setHeaderType = createAction(SET_HEADER_TYPE);
export const setHeaderClass = createAction(SET_HEADER_CLASS);
export const setContainerClass = createAction(SET_CONTAINER_CLASS);
export const setDetailView = createAction(SET_DETAIL_VIEW);
export const setMenuShow = createAction(SET_MENU_SHOW);
export const setMenus = createAction(SET_MENUS);
export const setActiveMenu = createAction(SET_ACTIVE_MENU);
export const setBackTitle = createAction(SET_BACK_TITLE);
export const setFooterShow = createAction(SET_FOOTER_SHOW);
/* -------------------- */

/* ------ Menus ------- */
const dashMainMenu = {
  ダッシュボード: [
    {
      code: "dashboard",
      name: "ダッシュボード",
      icon: {
        on: faTableColumnsON,
        off: faTableColumnsOFF,
      },
      link: "/dashboard/main",
    },
    {
      code: "product",
      name: "商品",
      icon: {
        on: faDiamondON,
        off: faDiamondOFF,
      },
      link: "/dashboard/product",
    },
    {
      code: "profile",
      name: "プロフィル管理",
      icon: {
        on: faUserON,
        off: faUserOFF,
      },
      link: "/dashboard/profile/upload",
    },
    {
      code: "series",
      name: "シリーズ管理",
      icon: {
        on: faObjectUnionON,
        off: faObjectUnionOFF,
      },
      link: "/dashboard/series",
    },
    {
      code: "post",
      name: "投稿管理",
      icon: {
        on: faSquarePenON,
        off: faSquarePenOFF,
      },
      link: "/dashboard/post",
    },
    {
      code: "plan",
      name: "支援管理",
      icon: {
        on: faSealON,
        off: faSealOFF,
      },
      link: "/dashboard/plan",
    },
    /*
    {
      code: 'analysis',
      name: '分析',
      icon: {
        on: faChartLineON,
        off: faChartLineOFF,
      },
      link: '/dashboard/analysis'
    },
    */
  ],
};

const mainMenus = {
  探索: [
    {
      code: "search",
      name: "探索",
      icon: {
        on: faHouseChimneyWindowON,
        off: faHouseChimneyWindowOFF,
      },
      link: "/home",
    },
    {
      code: "timeline",
      name: "タイムライン",
      icon: {
        on: faInfinityON,
        off: faInfinityOFF,
      },
      link: "/timeline",
    },
  ],
  創作: [
    {
      code: "creatorList",
      name: "クリエイターリスト",
      icon: {
        on: faStarsON,
        off: faStarsOFF,
      },
      link: "/author/list",
    },
    {
      code: "maquettePlace",
      name: "マケットプレイス",
      icon: {
        on: faCartShoppingON,
        off: faCartShoppingOFF,
      },
      link: "/store",
    },
  ],
};
/* -------------------- */

/**
 * login reducer 초기값
 */
const initialState = {
  isHeaderShow: true,
  headerType: null,
  headerClass: "header",
  containerClass: "container",
  isDetailView: false,
  isMenuShow: true, // 헤더 햄버거 메뉴 버튼 여부
  menus: null,
  backTitle: null,
  activeMenu: null, // Active menu code
  isFooterShow: true,
};

const container = handleActions(
  {
    [SET_CONTAINER]: (state, action) => {
      return produce(state, (draft) => {
        draft.isHeaderShow = action.payload.isHeaderShow;
        draft.isMenuShow = action.payload.isMenuShow;
        draft.headerClass = action.payload.headerClass;
        draft.containerClass = action.payload.containerClass;
        draft.isDetailView = action.payload.isDetailView;
        draft.headerType = action.payload.headerType;
        draft.backTitle = action.payload.backTitle;
        draft.activeMenu = action.payload.activeMenu;
        draft.isFooterShow = action.payload.isFooterShow;
        if (action.payload.menuType === "DASHBOARD") {
          draft.menus = dashMainMenu;
        } else if( action.payload.menuType === null ) {
          draft.menus = null;
        } else {
          draft.menus = mainMenus;
        }
      });
    },
    [SET_HEADER_SHOW]: (state, action) => {
      return produce(state, (draft) => {
        draft.isHeaderShow = action.payload;
      });
    },
    [SET_HEADER_TYPE]: (state, action) => {
      return produce(state, (draft) => {
        draft.headerType = action.payload;
      });
    },
    [SET_HEADER_CLASS]: (state, action) => {
      return produce(state, (draft) => {
        draft.headerClass = action.payload;
      });
    },
    [SET_CONTAINER_CLASS]: (state, action) => {
      return produce(state, (draft) => {
        draft.containerClass = action.payload;
      });
    },
    [SET_DETAIL_VIEW]: (state, action) => {
      return produce(state, (draft) => {
        draft.isDetailView = action.payload;
      });
    },
    [SET_MENU_SHOW]: (state, action) => {
      return produce(state, (draft) => {
        draft.isMenuShow = action.payload;
      });
    },
    [SET_MENUS]: (state, action) => {
      return produce(state, (draft) => {
        if (action.payload.type === "DASHBOARD") {
          draft.menus = dashMainMenu;
        } else if( action.payload.menuType === null ) {
          draft.menus = null;
        } else {
          draft.menus = mainMenus;
        }
      });
    },
    [SET_ACTIVE_MENU]: (state, action) => {
      return produce(state, (draft) => {
        draft.activeMenu = action.payload;
      });
    },
    [SET_BACK_TITLE]: (state, action) => {
      return produce(state, (draft) => {
        draft.backTitle = action.payload;
      });
    },
    [SET_FOOTER_SHOW]: (state, action) => {
      return produce(state, (draft) => {
        draft.isFooterShow = action.payload;
      });
    },
  },
  initialState
);

export default container;
