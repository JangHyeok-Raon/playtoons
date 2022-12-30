import { takeLatest, call, put } from "redux-saga/effects";
import { SET_LANDING } from "@REDUX/ducks/landing";
import { getCurationList } from "@API/curationService";
import { getEmergencyNotice } from "@API/noticeService";
import { getPostTypes } from "@API/postService";
import { exceptionHandler } from "@REDUX/saga/createRequestSaga";

function createSetLandingRequestSaga(type) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return function* (action) {
    try {
      const payload = {};

      // notice
      const noticeResp = yield call(getEmergencyNotice);
      if (noticeResp?.status === 200) {
        payload.notice = noticeResp.data?.notice;
      }

      // curations
      const curations = {};
      const curation1Resp = yield call(getCurationList, 1);
      if (curation1Resp?.status === 200) {
        curations[1] = curation1Resp.data?.posts;
      }
      const curation2Resp = yield call(getCurationList, 2);
      if (curation2Resp?.status === 200) {
        curations[2] = curation2Resp.data?.posts;
      }
      const curation3Resp = yield call(getCurationList, 3);
      if (curation3Resp?.status === 200) {
        curations[3] = curation3Resp.data?.authors;
      }
      const curation4Resp = yield call(getCurationList, 4);
      if (curation4Resp?.status === 200) {
        curations[4] = curation4Resp.data?.posts;
      }
      const curation5Resp = yield call(getCurationList, 5);
      if (curation5Resp?.status === 200) {
        curations[5] = curation5Resp.data?.posts;
      }
      payload.curations = curations;

      const postTypeResp = yield call(getPostTypes);
      if (postTypeResp?.status === 200) {
        payload.types = postTypeResp.data?.types;
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

const setLangingSaga = createSetLandingRequestSaga(SET_LANDING);

export default function* landingSaga() {
  yield takeLatest(SET_LANDING, setLangingSaga);
}
