import { takeLatest, call, put } from "redux-saga/effects";
import {
  GET_AUTHOR_LIST,
  SET_AUTHOR,
  SET_CURRENT_AUTHOR,
} from "@REDUX/ducks/author";
import { startLoading, finishLoading } from "@REDUX/ducks/loading";
import { exceptionHandler } from "@REDUX/saga/createRequestSaga";
import * as authorApi from "@API/authorService";
import * as postApi from "@API/postService";
import { setFileToServer } from "@/services/dashboardService";

function createGetAuthorListRequestSaga(type) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return function* (action) {
    try {
      yield put(startLoading(type));
      // 작가 리스트
      const authors = yield call(authorApi.getCurationList);
      if (authors?.status === 200) {
        const payload = {
          authorsMeta: authors?.data?.meta,
          authors: authors?.data?.authors,
        };
        const recents = yield call(authorApi.getAuthorRecent);

        if (recents?.status === 200) {
          payload.recents = recents?.data?.authors;
          payload.recentsMeta = recents?.data?.meta;
        }

        yield put({
          type: SUCCESS,
          payload: payload,
        });
      }

      yield put(finishLoading(type));
    } catch (e) {
      yield call(exceptionHandler, { e: e, redirectError: true });

      yield put({
        type: FAILURE,
        payload: action.payload,
        error: true,
        errStatus: e.response.status,
        errMessage: e.response.data.message,
      });
    } finally {
      yield put(finishLoading(type));
    }
  };
}
const getAuthorListSaga = createGetAuthorListRequestSaga(GET_AUTHOR_LIST);

function createSetCurrentAuthorRequestSaga(type) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return function* (action) {
    if (action.payload) {
      try {
        yield call(authorApi.setViewAuthor, action.payload);
        const response = yield call(authorApi.getAuthor, action.payload);

        if (response.status === 200) {
          const payload = response?.data?.author;
          /** 해당 작가의 게시물 목록 */
          const postResponse = yield call(postApi.getPosts, {
            authorId: payload?.id || action.payload,
          });

          if (postResponse?.status === 200) {
            payload.posts = postResponse?.data?.posts || [];
          } else {
            payload.posts = [];
          }

          /** 해당 작가의 시리즈 목록 */
          const seriesResponse = yield call(postApi.getPostSeries, {
            authorId: payload?.id || action.payload,
          });
          if (seriesResponse?.status === 200) {
            payload.series = seriesResponse?.data?.series || [];
          } else {
            payload.series = [];
          }

          /** 해당 작가의 구독 플랜 목록 */
          const planResponse = yield call(authorApi.getAuthorPlans, {
            authorId: payload?.id || action.payload,
          });
          if (planResponse?.status === 200) {
            payload.subscribeTiers = planResponse?.data?.subscribeTiers || [];
          } else {
            payload.subscribeTiers = [];
          }

          /** 해당 작가의 스토어 목록 */
          const storeResponse = yield call(
            authorApi.getProduct,
            payload?.id || action.payload
          );
          if (storeResponse?.status === 200) {
            payload.products = storeResponse?.data?.products || [];
          } else {
            payload.products = [];
          }

          yield put({
            type: SUCCESS,
            payload: payload,
          });
        }
      } catch (e) {
        console.dir(e);
        yield call(exceptionHandler, { e: e, redirectError: false });

        yield put({
          type: FAILURE,
          payload: action.payload,
          error: true,
        });
      }
    } else {
      yield put({
        type: SUCCESS,
        payload: action.payload,
      });
    }
  };
}
const setCurrentAuthorSaga =
  createSetCurrentAuthorRequestSaga(SET_CURRENT_AUTHOR);

function createSetAuthorRequestSaga(type) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return function* (action) {
    try {
      yield put(startLoading(type));

      let params = {
        ...action.payload,
      };
      // profile upload
      if (action.payload.fileInfoProfile !== undefined) {
        const formData = new FormData();
        formData.append("type", "image"); //image, video, binary
        formData.append("usage", "profile"); //profile, background, cover, logo, post, product, thumbnail, attachment
        formData.append("loginRequired", false); //언제 체크해서 보내는건지?
        formData.append("licenseRequired", false); //product 에 관련된 항목 추후 확인 필요
        formData.append("rating", "G"); //G, PG-13, R-15, R-17, R-18, R-18G
        formData.append("file", action.payload.fileInfoProfile);
        const reponse = yield call(setFileToServer, formData);
        if (reponse?.status === 201) {
          params.profileImage = reponse?.data?.hash;
        } else {
          yield put(finishLoading(type));
          yield put({
            type: FAILURE,
            payload: {
              ...reponse,
              type: "profile",
            },
          });
          return;
        }
      }

      // background cover upload
      if (action.payload.fileInfoBackground !== undefined) {
        const formData = new FormData();
        formData.append("type", "image"); //image, video, binary
        formData.append("usage", "background"); //profile, background, cover, logo, post, product, thumbnail, attachment
        formData.append("loginRequired", false); //언제 체크해서 보내는건지?
        formData.append("licenseRequired", false); //product 에 관련된 항목 추후 확인 필요
        formData.append("rating", "G"); //G, PG-13, R-15, R-17, R-18, R-18G
        formData.append("file", action.payload.fileInfoBackground);
        const response = yield call(setFileToServer, formData);
        if (response?.status === 201) {
          params.backgroundImage = response?.data?.hash;
        } else {
          yield put(finishLoading(type));
          yield put({
            type: FAILURE,
            payload: {
              ...response,
              type: "background",
            },
          });
          return;
        }
      }

      // set author
      delete params["rating"];
      delete params["fileInfoProfile"];
      delete params["fileInfoBackground"];

      const response = yield call(authorApi.setAuthorToServer, params);
      if (response?.status === 201) {
        yield put({
          type: SUCCESS,
          payload: response,
        });
      } else {
        yield put({
          type: FAILURE,
          payload: {
            ...response,
            type: "set",
          },
        });
      }

      yield put(finishLoading(type));
    } catch (e) {
      yield call(exceptionHandler, { e: e, redirectError: true });

      yield put({
        type: FAILURE,
        payload: {
          ...e,
          type: "set",
        },
      });
    } finally {
      yield put(finishLoading(type));
    }
  };
}

export default function* authorSaga() {
  yield takeLatest(GET_AUTHOR_LIST, getAuthorListSaga);
  yield takeLatest(SET_CURRENT_AUTHOR, setCurrentAuthorSaga);
  yield takeLatest(SET_AUTHOR, createSetAuthorRequestSaga(SET_AUTHOR));
}
