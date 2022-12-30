import { getErrorMessageFromResultCode } from "@/common/common";
import * as api from '@API/dashboardService';
import { exceptionHandler } from "@REDUX/saga/createRequestSaga";
import { call, put, takeLatest } from "redux-saga/effects";
import { EDIT_DASHBOARD_PLAN, EDIT_DASHBOARD_PROFILE, EDIT_DASHBOARD_SERIES, GET_DASHBOARD_PLAN, GET_DASHBOARD_TYPE, SET_DASHBOARD_PLAN, SET_DASHBOARD_SERIES } from "../ducks/dashboard";
import { finishLoading, startLoading } from "../ducks/loading";

//==============================================================================
// get plan list
//==============================================================================
function createPostDetailRequestSaga(type) {
  return function* (action) {
    try {
      yield put(startLoading(type));

      const params = {
        authorId: action.payload.authorId,
      };
      const response = yield call(api.getSubscribeTierAuthorIdFromServer, params);
      if (response?.status === 200) {
        yield put({
          type: `${type}_SUCCESS`,
          payload: response.data,
        });
      }

      yield put(finishLoading(type));
    } catch (e) {
      yield call(exceptionHandler, { e: e, redirectError: true });

      yield put({
        type: `${type}_FAILURE`,
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

//==============================================================================
// get post type
//==============================================================================
function createTypeRequestSaga(type) {
  return function* (action) {
    try {
      yield put(startLoading(type));

      const response = yield call(api.getPostTypeListFromServer);
      if (response?.status === 200) {
        yield put({
          type: `${type}_SUCCESS`,
          payload: response.data,
        });
      }
      else{
        yield put({
          type: `${type}_FAILURE`,
          payload: getErrorMessageFromResultCode(response.data),
        });
      }

      yield put(finishLoading(type));
    } catch (e) {
      yield call(exceptionHandler, { e: e, redirectError: true });

      yield put({
        type: `${type}_FAILURE`,
        payload: e,
      });
    } finally {
      yield put(finishLoading(type));
    }
  };
}
//==============================================================================
// edit profile
//==============================================================================
function createEditProfileRequestSaga(type) {
  return function* (action) {
    try {
      yield put(startLoading(type));

      let params = {
        ...action.payload
      };
      // profile upload
      if( action.payload.fileInfoProfile !== undefined ){
        const formData = new FormData();
        formData.append("authorId", action.payload.authorId);
        formData.append("subscribeTierId", "");
        formData.append("productId", "");
        formData.append("type", "image"); //image, video, binary
        formData.append("usage", "profile"); //profile, background, cover, logo, post, product, thumbnail, attachment
        formData.append("loginRequired", false); //언제 체크해서 보내는건지?
        formData.append("licenseRequired", false); //product 에 관련된 항목 추후 확인 필요
        formData.append("rating", action.payload.rating); //G, PG-13, R-15, R-17, R-18, R-18G
        formData.append("file", action.payload.fileInfoProfile);
        const reponse = yield call(api.setFileToServer, formData);
        if (reponse?.status === 201) {
          params.profileImage = reponse?.data?.hash;
        }
        else{
          yield put(finishLoading(type));
          yield put({
            type: `${type}_FAILURE`,
            payload: {
              ...reponse,
              type: 'profile'
            }
          });
          return;
        }
      }

      // background upload
      if( action.payload.fileInfoBackground !== undefined ){
        const formData = new FormData();
        formData.append("authorId", action.payload.authorId);
        formData.append("subscribeTierId", "");
        formData.append("productId", "");
        formData.append("type", "image"); //image, video, binary
        formData.append("usage", "background"); //profile, background, cover, logo, post, product, thumbnail, attachment
        formData.append("loginRequired", false); //언제 체크해서 보내는건지?
        formData.append("licenseRequired", false); //product 에 관련된 항목 추후 확인 필요
        formData.append("rating", action.payload.rating); //G, PG-13, R-15, R-17, R-18, R-18G
        formData.append("file", action.payload.fileInfoBackground);
        const response = yield call(api.setFileToServer, formData);
        if (response?.status === 201) {
          params.backgroundImage = response?.data?.hash;
        }
        else{
          yield put(finishLoading(type));
          yield put({
            type: `${type}_FAILURE`,
            payload: {
              ...response,
              type: 'background'
            }
          });
          return;
        }
      }

      // edit profile
      delete params["authorId"];
      delete params["fileInfoProfile"];
      delete params["fileInfoBackground"];
      delete params["rating"]; //TODO rating 있어야 하는 건가? 넣으면 에러 
      
      const response = yield call(api.editAuthorIdToServer, action.payload.authorId, params);
      if (response?.status === 200) {
        yield put({
          type: `${type}_SUCCESS`,
          payload: response,
        });
      }
      else{
        yield put({
          type: `${type}_FAILURE`,
          payload: {
            ...response,
            type: 'edit'
          }
        });
      }

      yield put(finishLoading(type));
    } catch (e) {
      yield call(exceptionHandler, { e: e, redirectError: true });

      yield put({
        type: `${type}_FAILURE`,
        payload: {
          ...e,
          type: 'edit'
        }
      });
    } finally {
      yield put(finishLoading(type));
    }
  };
}
//==============================================================================
// set series
//==============================================================================
function createSetSeriesRequestSaga(type) {
  return function* (action) {
    try {
      yield put(startLoading(type));

      let params = {
        ...action.payload
      };
      // cover upload
      if( action.payload.fileInfoCoverImage !== undefined ){
        const formData = new FormData();
        formData.append("authorId", action.payload.authorId);
        formData.append("subscribeTierId", "");
        formData.append("productId", "");
        formData.append("type", "image"); //image, video, binary
        formData.append("usage", "cover"); //profile, background, cover, logo, post, product, thumbnail, attachment
        formData.append("loginRequired", false); //언제 체크해서 보내는건지?
        formData.append("licenseRequired", false); //product 에 관련된 항목 추후 확인 필요
        formData.append("rating", action.payload.rating); //G, PG-13, R-15, R-17, R-18, R-18G
        formData.append("file", action.payload.fileInfoCoverImage);
        const reponse = yield call(api.setFileToServer, formData);
        if (reponse?.status === 201) {
          params.coverImage = reponse?.data?.hash;
        }
        else{
          yield put(finishLoading(type));
          yield put({
            type: `${type}_FAILURE`,
            payload: {
              ...reponse,
              type: 'cover'
            }
          });
          return;
        }
      }

      // thumbnail upload
      if( action.payload.fileInfoThumbnailImage !== undefined ){
        const formData = new FormData();
        formData.append("authorId", action.payload.authorId);
        formData.append("subscribeTierId", "");
        formData.append("productId", "");
        formData.append("type", "image"); //image, video, binary
        formData.append("usage", "thumbnail"); //profile, background, cover, logo, post, product, thumbnail, attachment
        formData.append("loginRequired", false); //언제 체크해서 보내는건지?
        formData.append("licenseRequired", false); //product 에 관련된 항목 추후 확인 필요
        formData.append("rating", action.payload.rating); //G, PG-13, R-15, R-17, R-18, R-18G
        formData.append("file", action.payload.fileInfoThumbnailImage);
        const response = yield call(api.setFileToServer, formData);
        if (response?.status === 201) {
          params.thumbnailImage = response?.data?.hash;
        }
        else{
          yield put(finishLoading(type));
          yield put({
            type: `${type}_FAILURE`,
            payload: {
              ...response,
              type: 'thumbnail'
            }
          });
          return;
        }
      }

      // set series
      delete params["fileInfoCoverImage"];
      delete params["fileInfoThumbnailImage"];
      
      const response = yield call(api.setSeriesToServer, params);
      if (response?.status === 201) {
        yield put({
          type: `${type}_SUCCESS`,
          payload: response,
        });
      }
      else{
        yield put({
          type: `${type}_FAILURE`,
          payload: {
            ...response,
            type: 'set'
          }
        });
      }

      yield put(finishLoading(type));
    } catch (e) {
      yield call(exceptionHandler, { e: e, redirectError: true });

      yield put({
        type: `${type}_FAILURE`,
        payload: {
          ...e,
          type: 'set'
        }
      });
    } finally {
      yield put(finishLoading(type));
    }
  };
}
//==============================================================================
// edit series
//==============================================================================
function createEditSeriesRequestSaga(type) {
  return function* (action) {
    try {
      yield put(startLoading(type));
      
      let params = {
        ...action.payload
      };
      // cover upload
      if( action.payload.fileInfoCoverImage !== undefined ){
        const formData = new FormData();
        formData.append("authorId", action.payload.authorId);
        formData.append("subscribeTierId", "");
        formData.append("productId", "");
        formData.append("type", "image"); //image, video, binary
        formData.append("usage", "cover"); //profile, background, cover, logo, post, product, thumbnail, attachment
        formData.append("loginRequired", false); //언제 체크해서 보내는건지?
        formData.append("licenseRequired", false); //product 에 관련된 항목 추후 확인 필요
        formData.append("rating", action.payload.rating); //G, PG-13, R-15, R-17, R-18, R-18G
        formData.append("file", action.payload.fileInfoCoverImage);
        const reponse = yield call(api.setFileToServer, formData);
        if (reponse?.status === 201) {
          params.coverImage = reponse?.data?.hash;
        }
        else{
          yield put(finishLoading(type));
          yield put({
            type: `${type}_FAILURE`,
            payload: {
              ...reponse,
              type: 'cover'
            }
          });
          return;
        }
      }

      // thumbnail upload
      if( action.payload.fileInfoThumbnailImage !== undefined ){
        const formData = new FormData();
        formData.append("authorId", action.payload.authorId);
        formData.append("subscribeTierId", "");
        formData.append("productId", "");
        formData.append("type", "image"); //image, video, binary
        formData.append("usage", "thumbnail"); //profile, background, cover, logo, post, product, thumbnail, attachment
        formData.append("loginRequired", false); //언제 체크해서 보내는건지?
        formData.append("licenseRequired", false); //product 에 관련된 항목 추후 확인 필요
        formData.append("rating", action.payload.rating); //G, PG-13, R-15, R-17, R-18, R-18G
        formData.append("file", action.payload.fileInfoThumbnailImage);
        const response = yield call(api.setFileToServer, formData);
        if (response?.status === 201) {
          params.thumbnailImage = response?.data?.hash;
        }
        else{
          yield put(finishLoading(type));
          yield put({
            type: `${type}_FAILURE`,
            payload: {
              ...response,
              type: 'thumbnail'
            }
          });
          return;
        }
      }

      // edit series
      delete params["fileInfoCoverImage"];
      delete params["fileInfoThumbnailImage"];
      
      const response = yield call(api.editPostSeriesToServer, params);
      if (response?.status === 200) {
        yield put({
          type: `${type}_SUCCESS`,
          payload: response,
        });
      }
      else{
        yield put({
          type: `${type}_FAILURE`,
          payload: {
            ...response,
            type: 'set'
          }
        });
      }

      yield put(finishLoading(type));
    } catch (e) {
      yield call(exceptionHandler, { e: e, redirectError: true });

      yield put({
        type: `${type}_FAILURE`,
        payload: {
          ...e,
          type: 'set'
        }
      });
    } finally {
      yield put(finishLoading(type));
    }
  };
}
//==============================================================================
// set plan
//==============================================================================
function createSetPlanRequestSaga(type) {
  return function* (action) {
    try {
      yield put(startLoading(type));
      
      let params = {
        ...action.payload
      };
      // image upload
      if( action.payload.fileInfoThumbnailImage !== undefined ){
        const formData = new FormData();
        formData.append("authorId", action.payload.authorId);
        formData.append("subscribeTierId", "");
        formData.append("productId", "");
        formData.append("type", "image"); //image, video, binary
        formData.append("usage", "thumbnail"); //profile, background, cover, logo, post, product, thumbnail, attachment
        formData.append("loginRequired", false); //언제 체크해서 보내는건지?
        formData.append("licenseRequired", false); //product 에 관련된 항목 추후 확인 필요
        formData.append("rating", "G"); //G, PG-13, R-15, R-17, R-18, R-18G
        formData.append("file", action.payload.fileInfoThumbnailImage);
        const reponse = yield call(api.setFileToServer, formData);
        if (reponse?.status === 201) {
          params.thumbnailImage = reponse?.data?.hash;
        }
        else{
          yield put(finishLoading(type));
          yield put({
            type: `${type}_FAILURE`,
            payload: {
              ...reponse,
              type: 'image'
            }
          });
          return;
        }
      }

      // set plan
      delete params["fileInfoThumbnailImage"];
      
      const response = yield call(api.setSubscribeTierToServer, params);
      if (response?.status === 201) {
        yield put({
          type: `${type}_SUCCESS`,
          payload: response,
        });
      }
      else{
        yield put({
          type: `${type}_FAILURE`,
          payload: {
            ...response,
            type: 'set'
          }
        });
      }

      yield put(finishLoading(type));
    } catch (e) {
      yield call(exceptionHandler, { e: e, redirectError: true });

      yield put({
        type: `${type}_FAILURE`,
        payload: {
          ...e,
          type: 'set'
        }
      });
    } finally {
      yield put(finishLoading(type));
    }
  };
}
//==============================================================================
// edit plan
//==============================================================================
function createEditPlanRequestSaga(type) {
  return function* (action) {
    try {
      yield put(startLoading(type));
      
      let params = {
        ...action.payload
      };
      // image upload
      if( action.payload.fileInfoThumbnailImage !== undefined ){
        const formData = new FormData();
        formData.append("authorId", action.payload.authorId);
        formData.append("subscribeTierId", "");
        formData.append("productId", "");
        formData.append("type", "image"); //image, video, binary
        formData.append("usage", "thumbnail"); //profile, background, cover, logo, post, product, thumbnail, attachment
        formData.append("loginRequired", false); //언제 체크해서 보내는건지?
        formData.append("licenseRequired", false); //product 에 관련된 항목 추후 확인 필요
        formData.append("rating", "G"); //G, PG-13, R-15, R-17, R-18, R-18G
        formData.append("file", action.payload.fileInfoThumbnailImage);
        const reponse = yield call(api.setFileToServer, formData);
        if (reponse?.status === 201) {
          params.thumbnailImage = reponse?.data?.hash;
        }
        else{
          yield put(finishLoading(type));
          yield put({
            type: `${type}_FAILURE`,
            payload: {
              ...reponse,
              type: 'image'
            }
          });
          return;
        }
      }

      // edit plan
      delete params["authorId"];
      delete params["fileInfoThumbnailImage"];
      
      const response = yield call(api.editSubscribeTierToServer, params);
      if (response?.status === 200) {
        yield put({
          type: `${type}_SUCCESS`,
          payload: response,
        });
      }
      else{
        yield put({
          type: `${type}_FAILURE`,
          payload: {
            ...response,
            type: 'set'
          }
        });
      }

      yield put(finishLoading(type));
    } catch (e) {
      yield call(exceptionHandler, { e: e, redirectError: true });

      yield put({
        type: `${type}_FAILURE`,
        payload: {
          ...e,
          type: 'set'
        }
      });
    } finally {
      yield put(finishLoading(type));
    }
  };
}


export default function* dashboardSaga() {
  yield takeLatest(GET_DASHBOARD_PLAN, createPostDetailRequestSaga(GET_DASHBOARD_PLAN));
  yield takeLatest(GET_DASHBOARD_TYPE, createTypeRequestSaga(GET_DASHBOARD_TYPE));
  yield takeLatest(EDIT_DASHBOARD_PROFILE, createEditProfileRequestSaga(EDIT_DASHBOARD_PROFILE));
  yield takeLatest(SET_DASHBOARD_SERIES, createSetSeriesRequestSaga(SET_DASHBOARD_SERIES));
  yield takeLatest(EDIT_DASHBOARD_SERIES, createEditSeriesRequestSaga(EDIT_DASHBOARD_SERIES));
  yield takeLatest(SET_DASHBOARD_PLAN, createSetPlanRequestSaga(SET_DASHBOARD_PLAN));
  yield takeLatest(EDIT_DASHBOARD_PLAN, createEditPlanRequestSaga(EDIT_DASHBOARD_PLAN));
}
