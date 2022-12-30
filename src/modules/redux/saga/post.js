import { call, put, takeLatest } from "redux-saga/effects";
import { exceptionHandler } from "@REDUX/saga/createRequestSaga";
import * as postApi from "@API/postService";
import * as reactionApi from "@API/reactionService";
import {
  AUTHOR_MINE,
  EDIT_POST,
  POST_DETAIL,
  GET_CURRENT_POST,
  GET_POST_REACTION,
  UPLOAD_POST,
} from "../ducks/post";
import { finishLoading, startLoading } from "../ducks/loading";
import { setFileMultiToServer, setFileToServer } from "@/services/dashboardService";
import { getFileDataUrlList } from "@/common/common";

//==============================================================================
// set post
//==============================================================================
function createSetPostRequestSaga(type) {
  return function* (action) {
    try {
      yield put(startLoading(type));
      
      let params = {
        ...action.payload
      };
      // content upload
      if( action.payload.fileInfoContent !== undefined ){
        console.log('fileInfo', action.payload.fileInfoContent );
        
        const formData = new FormData();
        formData.append("authorId", action.payload.authorId);
        formData.append("subscribeTierId", "");
        formData.append("productId", "");
        formData.append("type", "image"); //image, video, binary
        formData.append("usage", "post"); //profile, background, cover, logo, post, product, thumbnail, attachment
        formData.append("loginRequired", false); //언제 체크해서 보내는건지?
        formData.append("licenseRequired", false); //product 에 관련된 항목 추후 확인 필요
        formData.append("rating", action.payload.rating); //G, PG-13, R-15, R-17, R-18, R-18G

        Object.values(action.payload.fileInfoContent).forEach((file) => formData.append("files[]", file));
        const reponse = yield call(setFileMultiToServer, formData);
        if (reponse?.status === 201) {
          params.content = reponse?.data?.hashses.toString(); // 구분자 ','
        }
        else{
          yield put(finishLoading(type));
          yield put({
            type: `${type}_FAILURE`,
            payload: {
              ...reponse,
              type: 'content'
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
        const response = yield call(setFileToServer, formData);
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
      delete params["fileInfoContent"];
      delete params["fileInfoThumbnailImage"];
      
      const response = yield call(postApi.setPostToServer, params);
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
// edit post
//==============================================================================
function createEditPostRequestSaga(type) {
  return function* (action) {
    try {
      yield put(startLoading(type));
      
      let params = {
        ...action.payload
      };
      // content upload
      if( action.payload.fileInfoContent !== undefined ){
        console.log('fileInfo',  action.payload.fileInfoContent);
        const formData = new FormData();
        formData.append("authorId", action.payload.authorId);
        formData.append("subscribeTierId", "");
        formData.append("productId", "");
        formData.append("type", "image"); //image, video, binary
        formData.append("usage", "post"); //profile, background, cover, logo, post, product, thumbnail, attachment
        formData.append("loginRequired", false); //언제 체크해서 보내는건지?
        formData.append("licenseRequired", false); //product 에 관련된 항목 추후 확인 필요
        formData.append("rating", action.payload.rating); //G, PG-13, R-15, R-17, R-18, R-18G
        formData.append("file", action.payload.fileInfoContent);
        const reponse = yield call(setFileToServer, formData);
        if (reponse?.status === 201) {
          params.content = reponse?.data?.hash;
        }
        else{
          yield put(finishLoading(type));
          yield put({
            type: `${type}_FAILURE`,
            payload: {
              ...reponse,
              type: 'content'
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
        const response = yield call(setFileToServer, formData);
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
      delete params["fileInfoContent"];
      delete params["fileInfoThumbnailImage"];
      
      const response = yield call(postApi.editPostToServer, params);
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
// get post detail
//==============================================================================
function createPostDetailRequestSaga(type) {
  return function* (action) {
    try {
      yield put(startLoading(type));

      const response = yield call(
        postApi.getPostIdMineFromServer,
        action.payload
      );
      if (response?.status === 200) {
        yield put({
          type: `${type}_SUCCESS`,
          payload: response.data,
        });
      } else {
        yield put({
          type: `${type}_FAILURE`,
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
// get author mine
//==============================================================================
function createAuthorMineRequestSaga(type) {
  return function* (action) {
    try {
      yield put(startLoading(type));
      const response = yield call(postApi.getAuthorMineFromServer);
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
// get current post
//==============================================================================
function createCurrentPostRequestSaga(type) {
  return function* (action) {
    try {
      yield put(startLoading(type));
      /** 게시글 상세 조회 */
      const response = yield call(
        postApi.getPostDetailFromServer,
        action.payload
      );

      if (response?.status === 200) {
        const currentPost = response.data;
        const subscribeTierResponse = yield call(
          postApi.getSubscribeTierCheck,
          currentPost?.post?.authorId
        );

        let payload;
        if (
          subscribeTierResponse.data?.subscriptionStatus === "NOT_SUBSCRIBED" 
            // || action.payload.authorId !== currentPost?.post?.authorId
        ) {
          // 해당 작가를 구독중이지 않음
          payload.isLock = true;
        } else {
          /** 게시글 조회 수 증가 */
          payload = currentPost?.post;
          yield call(postApi.setPostView, payload.id);

          /** 게시글의 content 조회 */
          const contentResponse = yield call(
            postApi.getPostContent,
            payload.id
          );

          if (contentResponse?.status === 200) {
            payload.content = contentResponse.data?.content;
            payload.isLock = false;
          } else {
            payload.content = null;
            payload.isLock = true;
          }

          const myAuthorsResp = yield call(postApi.getAuthorMineFromServer);
          if (myAuthorsResp?.status === 200) {
            if (myAuthorsResp.data?.authors?.length) {
              const authors = myAuthorsResp.data?.authors;
              const myAuthor = authors.find(
                (author) => author.id === currentPost?.post?.authorId
              );
              payload.myAuthor = myAuthor;
            }
          }
        }
        /** 게시글의 댓글 목록 조회 (최초 3개만) */
        const reactionResponse = yield call(reactionApi.getReaction, {
          postId: action.payload.id,
          limit: 3,
        });

        if (reactionResponse?.status === 200) {
          payload.reactions = reactionResponse.data;
        } 
        // else {
        //   payload.reactions = [];
        // }
        yield put({
          type: `${type}_SUCCESS`,
          payload: payload,
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

/** 게시글의 댓글 더 보기 누를 경우 실행 */
//==============================================================================
// get current post reactions
//==============================================================================
function createPostReactionRequestSaga(type) {
  return function* (action) {
    try {
      yield put(startLoading(type));

      /** 게시글의 댓글 목록 */
      const response = yield call(reactionApi.getReaction, action.payload);
      if (response?.status === 200) {
        yield put({
          type: `${type}_SUCCESS`,
          payload: response?.data,
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

export default function* postSaga() {
  yield takeLatest(EDIT_POST, createEditPostRequestSaga(EDIT_POST));
  yield takeLatest(UPLOAD_POST, createSetPostRequestSaga(UPLOAD_POST));
  yield takeLatest(POST_DETAIL, createPostDetailRequestSaga(POST_DETAIL));
  yield takeLatest(AUTHOR_MINE, createAuthorMineRequestSaga(AUTHOR_MINE));
  yield takeLatest(
    GET_CURRENT_POST,
    createCurrentPostRequestSaga(GET_CURRENT_POST)
  );
  yield takeLatest(
    GET_POST_REACTION,
    createPostReactionRequestSaga(GET_POST_REACTION)
  );
}
