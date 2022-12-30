import { createAction, handleActions } from "redux-actions";
import { createRequestActionTypes } from "@REDUX/saga/createRequestSaga";
import produce from "immer";

/* --- Action Types --- */
export const [SET_PRODUCT, SET_PRODUCT_SUCCESS, SET_PRODUCT_FAILURE] =
  createRequestActionTypes("product/SET_PRODUCT");
export const [
  SET_PRODUCT_TYPES,
  SET_PRODUCT_TYPES_SUCCESS,
  SET_PRODUCT_TYPES_FAILURE,
] = createRequestActionTypes("product/SET_PRODUCT_TYPES");
export const [
  SET_PRODUCT_CATEGORIES,
  SET_PRODUCT_CATEGORIES_SUCCESS,
  SET_PRODUCT_CATEGORIES_FAILURE,
] = createRequestActionTypes("product/SET_PRODUCT_CATEGORIES");

/* --- Actions --- */
export const setProduct = createAction(SET_PRODUCT);

/**
 * login reducer 초기값
 */
const initialState = {
  productTypes: [],
  productCategories: [],
  currentProduct: null,
};

const product = handleActions(
  {
    [SET_PRODUCT_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        /** SUCCESS 처리 */
        draft.currentProduct = action.payload;
      });
    },
    [SET_PRODUCT_TYPES_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        /** SUCCESS 처리 */
        draft.productTypes = action.payload;
      });
    },
    [SET_PRODUCT_CATEGORIES_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        /** SUCCESS 처리 */
        draft.productCategories = action.payload;
      });
    },
  },
  initialState
);

export default product;
