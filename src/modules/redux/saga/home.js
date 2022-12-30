import { takeLatest, call, put } from "redux-saga/effects";
import { SET_HOME } from "@REDUX/ducks/home";
import { exceptionHandler } from "@REDUX/saga/createRequestSaga";
import { getHome, getHomeTop } from "@API/homeService";

function createSetHomeRequestSaga(type) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return function* (action) {
    try {
      const payload = {};

      // banner
      const bannerResp = yield call(getHomeTop, "home");
      if (bannerResp?.status === 200) {
        payload.banners = bannerResp.data?.contents;
      }

      // contents
      const contentsResp = yield call(getHome, "home");
      if (contentsResp?.status === 200) {
        payload.contents = contentsResp.data?.contents;
      }

      yield put({
        type: SUCCESS,
        payload: payload,
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

const setHomeSaga = createSetHomeRequestSaga(SET_HOME);

export default function* homeSaga() {
  yield takeLatest(SET_HOME, setHomeSaga);
}
