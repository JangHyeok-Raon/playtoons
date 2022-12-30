import { createAction, handleActions } from "redux-actions";
import { createRequestActionTypes } from "@REDUX/saga/createRequestSaga";
import produce from "immer";
import { LOGOUT_REQUEST_SUCCESS } from "./login";

/* --- Action Types --- */
export const [
  GET_DASHBOARD_PLAN,
  GET_DASHBOARD_PLAN_SUCCESS,
  GET_DASHBOARD_PLAN_FAILURE,
] = createRequestActionTypes("dashboard/plan/GET");
export const [INIT_GET_DASHBOARD_PLAN] = createRequestActionTypes(
  "INIT_GET_dashboardPlan"
);
export const [
  SET_DASHBOARD_PLAN,
  SET_DASHBOARD_PLAN_SUCCESS,
  SET_DASHBOARD_PLAN_FAILURE,
] = createRequestActionTypes("POST_subscribeTier");
export const [
  EDIT_DASHBOARD_PLAN,
  EDIT_DASHBOARD_PLAN_SUCCESS,
  EDIT_DASHBOARD_PLAN_FAILURE,
] = createRequestActionTypes("PATCH_subscribeTier");
export const [INIT_SET_DASHBOARD_PLAN] = createRequestActionTypes(
  "INIT_POST_subscribeTier"
);
export const [
  GET_DASHBOARD_TYPE,
  GET_DASHBOARD_TYPE_SUCCESS,
  GET_DASHBOARD_TYPE_FAILURE,
] = createRequestActionTypes("GET_dashboardType");
export const [SET_DASHBOARD_SALES, INIT_DASHBOARD_SALES] =
  createRequestActionTypes("SET/dashboard/sales");
export const [
  SET_DASHBOARD_SERIES,
  SET_DASHBOARD_SERIES_SUCCESS,
  SET_DASHBOARD_SERIES_FAILURE,
] = createRequestActionTypes("POST_postSeries");
export const [INIT_SET_DASHBOARD_SERIES] = createRequestActionTypes(
  "INIT_POST_postSeries"
);
export const [
  EDIT_DASHBOARD_SERIES,
  EDIT_DASHBOARD_SERIES_SUCCESS,
  EDIT_DASHBOARD_SERIES_FAILURE,
] = createRequestActionTypes("PATCH_postSeries");
export const [
  EDIT_DASHBOARD_PROFILE,
  EDIT_DASHBOARD_PROFILE_SUCCESS,
  EDIT_DASHBOARD_PROFILE_FAILURE,
] = createRequestActionTypes("PATCH_author");
export const [INIT_EDIT_DASHBOARD_PROFILE] =
  createRequestActionTypes("INIT_PATCH_author");

/* --- Actions --- */
export const getSubscribeTierAction = createAction(GET_DASHBOARD_PLAN);
export const initSubscribeTierAction = createAction(INIT_GET_DASHBOARD_PLAN);
export const setSubscribeTierAction = createAction(SET_DASHBOARD_PLAN);
export const editSubscribeTierAction = createAction(EDIT_DASHBOARD_PLAN);
export const initSubscribeTierUploadAction = createAction(
  INIT_SET_DASHBOARD_PLAN
);
export const setSalesIdAction = createAction(SET_DASHBOARD_SALES);
export const initSalesIdAction = createAction(INIT_DASHBOARD_SALES);
export const getTypeAction = createAction(GET_DASHBOARD_TYPE);
export const setSeriesAction = createAction(SET_DASHBOARD_SERIES);
export const initSeriesAction = createAction(INIT_SET_DASHBOARD_SERIES);
export const editSeriesAction = createAction(EDIT_DASHBOARD_SERIES);
export const editProfileAction = createAction(EDIT_DASHBOARD_PROFILE);
export const initProfileAction = createAction(INIT_EDIT_DASHBOARD_PROFILE);

const initialState = {
  subscribeTiers: null,
  subscribeTiersMeta: null,
  subscribeTiersUpload: null,
  series: null,
  author: null,
  reaction: null,
  salesId: null,
  types: null,
  profile: null,
  seriesUpload: null,
};

const post = handleActions(
  {
    [EDIT_DASHBOARD_PROFILE_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        draft.profile = action.payload;
      });
    },
    [EDIT_DASHBOARD_PROFILE_FAILURE]: (state, action) => {
      return produce(state, (draft) => {
        draft.profile = action.payload;
      });
    },
    [INIT_EDIT_DASHBOARD_PROFILE]: (state, action) => {
      return produce(state, (_) => {
        return {
          ...state,
          profile: null,
        };
      });
    },
    [EDIT_DASHBOARD_SERIES_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        draft.seriesUpload = action.payload;
      });
    },
    [EDIT_DASHBOARD_SERIES_FAILURE]: (state, action) => {
      return produce(state, (draft) => {
        draft.seriesUpload = action.payload;
      });
    },
    [SET_DASHBOARD_SERIES_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        draft.seriesUpload = action.payload;
      });
    },
    [SET_DASHBOARD_SERIES_FAILURE]: (state, action) => {
      return produce(state, (draft) => {
        draft.seriesUpload = action.payload;
      });
    },
    [INIT_SET_DASHBOARD_SERIES]: (state, action) => {
      return produce(state, (_) => {
        return {
          ...state,
          seriesUpload: null,
        };
      });
    },
    [GET_DASHBOARD_PLAN_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        draft.subscribeTiers = action.payload.subscribeTiers;
        draft.subscribeTiersMeta = action.payload.meta;
      });
    },
    [INIT_GET_DASHBOARD_PLAN]: (state, _) => {
      return produce(state, (_) => {
        return {
          ...state,
          subscribeTiers: null,
          subscribeTiersMeta: null,
        };
      });
    },
    [SET_DASHBOARD_PLAN_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        draft.subscribeTiersUpload = action.payload;
      });
    },
    [SET_DASHBOARD_PLAN_FAILURE]: (state, action) => {
      return produce(state, (draft) => {
        draft.subscribeTiersUpload = action.payload;
      });
    },
    [EDIT_DASHBOARD_PLAN_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        draft.subscribeTiersUpload = action.payload;
      });
    },
    [EDIT_DASHBOARD_PLAN_FAILURE]: (state, action) => {
      return produce(state, (draft) => {
        draft.subscribeTiersUpload = action.payload;
      });
    },
    [INIT_SET_DASHBOARD_PLAN]: (state, _) => {
      return produce(state, (_) => {
        return {
          ...state,
          subscribeTiersUpload: null,
        };
      });
    },
    [GET_DASHBOARD_TYPE_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        draft.types = action.payload;
      });
    },
    [SET_DASHBOARD_SALES]: (state, action) => {
      return produce(state, (draft) => {
        draft.salesId = action.payload.salesId;
      });
    },
    [INIT_DASHBOARD_SALES]: (state, _) => {
      return produce(state, (_) => {
        return {
          ...state,
          salesId: null,
        };
      });
    },
    [LOGOUT_REQUEST_SUCCESS]: (state, _) => {
      //2022.11.01 lhk- logout 시 author 정보도 초기화
      return produce(state, (_) => {
        return {
          ...initialState,
        };
      });
    },
  },
  initialState
);

export default post;
