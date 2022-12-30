import { createRequestActionTypes } from "@REDUX/saga/createRequestSaga";
import { createAction, handleActions } from "redux-actions";

import produce from "immer";
import moment from "moment";

/* --- Action Types --- */
export const [LOGIN_REQUEST, LOGIN_REQUEST_SUCCESS, LOGIN_REQUEST_FAILURE] =
  createRequestActionTypes("login/REQUEST");

export const [GET_TEMP_TOKEN, GET_TEMP_TOKEN_SUCCESS, GET_TEMP_TOKEN_FAILURE] =
  createRequestActionTypes("login/GET_TEMP_TOKEN");

export const SYNC = "login/SYNC";

export const [LOGOUT_REQUEST, LOGOUT_REQUEST_SUCCESS, LOGOUT_REQUEST_FAILURE] =
  createRequestActionTypes("login/LOGOUT_REQUEST");

export const SET_USER_INFO = "login/GET_USER_INFO";

/* --- Actions --- */
export const loginRequest = createAction(LOGIN_REQUEST);
export const getTempTokenRequest = createAction(GET_TEMP_TOKEN);
export const logoutRequest = createAction(LOGOUT_REQUEST);
export const setUserInfo = createAction(SET_USER_INFO);

/**
 * login reducer 초기값
 */
const initialState = {
  email: "",
  accessToken: null,
  authFail: false,
  errMessage: null,
  errStatus: null,
  isLogined: false,
  isSns: false,
  snsType: null,
  isSNSLogin: false,
  userInfo: null,
  loginSuccessTime: null,
};

const login = handleActions(
  {
    [LOGIN_REQUEST_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        /** SUCCESS 처리 */
        draft.email = action.payload.email || "";
        draft.accessToken = action.payload.accessToken;
        draft.authFail = false;
        draft.errMessage = null;
        draft.errStatus = null;
        draft.isLogined = true;
        draft.loginSuccessTime = moment(); //1일 지나면 login token expired 되므로 확인을 위해서 저장
      });
    },
    [LOGIN_REQUEST_FAILURE]: (state, action) => {
      return produce(state, (draft) => {
        console.log("LOGIN_REQUEST_FAILURE : ", action.payload);
        /** FAILURE 처리 */
        draft.authFail = true;
        draft.accessToken = initialState.accessToken;
        draft.errStatus = action.payload.errStatus;
        draft.errMessage = action.payload.errMessage;
      });
    },
    [GET_TEMP_TOKEN_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        /** SUCCESS 처리 */
        draft.email = action.payload.email || "";
        draft.accessToken = action.payload.accessToken;
        draft.authFail = false;
        draft.errMessage = null;
        draft.errStatus = null;
        draft.isLogined = true;
        draft.isSns = "google"; // sns type
        draft.isSNSLogin = true;
      });
    },
    [LOGOUT_REQUEST_SUCCESS]: (state, _) => {
      return produce(state, (_) => {
        return {
          ...initialState,
        };
      });
    },
    [SET_USER_INFO]: (state, action) => {
      return produce(state, (draft) => {
        draft.userInfo = action.payload.account;
      });
    },
  },
  initialState
);

export default login;
