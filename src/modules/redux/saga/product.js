import { takeLatest, call, put, all } from "redux-saga/effects";
import {
  SET_PRODUCT,
  SET_PRODUCT_TYPES,
  SET_PRODUCT_CATEGORIES,
} from "@REDUX/ducks/product";
import { exceptionHandler } from "@REDUX/saga/createRequestSaga";
import * as storeApi from "@API/storeService";

function createSetProductRequestSaga(type) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return function* (action) {
    try {
      yield put({
        type: SET_PRODUCT_TYPES,
      });
      // productTypes
      const response = yield call(
        storeApi.getProductDetailMine,
        action.payload
      );
      if (response?.status === 200) {
        const product = response.data?.product;
        yield put({
          type: SET_PRODUCT_CATEGORIES,
          payload: product?.type?.id,
        });

        yield put({
          type: SUCCESS,
          payload: product,
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
  };
}

const setProductSaga = createSetProductRequestSaga(SET_PRODUCT);

// Product Types
function createSetProductCategoriesRequestSaga(type) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return function* (action) {
    try {
      const response = yield call(storeApi.getProductCategory, action.payload);
      if (response?.status === 200) {
        yield put({
          type: SUCCESS,
          payload: response.data?.productCategories,
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
  };
}

const setProductCategoriesSaga = createSetProductCategoriesRequestSaga(
  SET_PRODUCT_CATEGORIES
);

export default function* productSaga() {
  yield takeLatest(SET_PRODUCT, setProductSaga);
  yield takeLatest(SET_PRODUCT_CATEGORIES, setProductCategoriesSaga);
}
