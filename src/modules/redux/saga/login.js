import { takeLatest, call, put } from "redux-saga/effects";
import {
  LOGIN_REQUEST,
  GET_TEMP_TOKEN,
  LOGOUT_REQUEST,
  SYNC,
} from "@REDUX/ducks/login";
import { AUTHOR_MINE } from "../ducks/post";
import { startLoading, finishLoading } from "@REDUX/ducks/loading";
import { exceptionHandler } from "@REDUX/saga/createRequestSaga";
import * as loginApi from "@API/loginService";

function createLoginRequestSaga(loginType, syncType) {
  const SUCCESS = `${loginType}_SUCCESS`;
  const FAILURE = `${loginType}_FAILURE`;

  return function* (action) {
    if (action.payload) {
      try {
        yield put(startLoading(loginType));

        const response = yield call(loginApi.loginRequest, action.payload);
        // 로그인 성공 시 로컬스토리지에 token 값 저장
        if (response?.status === 200) {
          const { accessToken } = response.data;

          // 로그인 한 사용자의 작가 정보 불러오기
          yield put({
            type: AUTHOR_MINE,
          });
          yield put({
            type: SUCCESS,
            payload: { ...action.payload, accessToken: accessToken },
          });
        } else {
          yield put({
            type: FAILURE,
            payload: action.payload,
            error: true,
          });
        }
        yield put(finishLoading(loginType));
      } catch (e) {
        console.dir(e.response?.status);
        yield call(exceptionHandler, { e: e, redirectError: true });

        yield put({
          type: FAILURE,
          payload: {
            error: true,
            errStatus: e.response.status,
            errMessage: e.response.data.message,
          },
        });
      } finally {
        // loading state가 해제되지 않는 현상 수정
        yield put(finishLoading(loginType));
        yield put(finishLoading(syncType));
      }
    }
  };
}

const loginRequestSaga = createLoginRequestSaga(LOGIN_REQUEST, SYNC);

function createGetTempTokenRequestSaga(loginType) {
  const SUCCESS = `${loginType}_SUCCESS`;
  const FAILURE = `${loginType}_FAILURE`;

  return function* (action) {
    if (action.payload) {
      try {
        yield put(startLoading(loginType));

        const response = yield call(
          loginApi.getTempTokenRequest,
          action.payload
        ); // code , snstype
        // 로그인 성공 시 로컬스토리지에 token 값 저장
        if (response?.status === 200) {
          const { accessToken } = response.data;
          yield put({
            type: SUCCESS,
            payload: { ...action.payload, accessToken: accessToken },
          });
        } else {
          yield put({
            type: FAILURE,
            payload: action.payload,
            error: true,
          });
        }
        yield put(finishLoading(loginType));
      } catch (e) {
        console.dir(e.response?.status);
        yield call(exceptionHandler, { e: e, redirectError: true });

        yield put({
          type: FAILURE,
          payload: action.payload,
          error: true,
          errStatus: e.response.status,
          errMessage: e.response.data.message,
        });
      } finally {
        // loading state가 해제되지 않는 현상 수정
        yield put(finishLoading(loginType));
      }
    }
  };
}

const getTempTokenRequestSaga = createGetTempTokenRequestSaga(GET_TEMP_TOKEN);

function createLogoutRequestSaga(type) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return function* (action) {
    try {
      yield put({
        type: SUCCESS,
      });
    } catch (e) {
      console.dir(e);
      yield call(exceptionHandler, { e: e, redirectError: false });

      yield put({
        type: FAILURE,
        payload: action.payload,
        error: true,
      });
    }
  };
}

const logoutRequestSaga = createLogoutRequestSaga(LOGOUT_REQUEST);

export default function* loginSaga() {
  yield takeLatest(LOGIN_REQUEST, loginRequestSaga);
  yield takeLatest(GET_TEMP_TOKEN, getTempTokenRequestSaga);
  yield takeLatest(LOGOUT_REQUEST, logoutRequestSaga);
}
