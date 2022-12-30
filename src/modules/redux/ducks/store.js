import { createAction, handleActions } from "redux-actions";
import { createRequestActionTypes } from "@REDUX/saga/createRequestSaga";
import produce from "immer";

/* --- Action Types --- */
export const [SET_STORE, SET_STORE_SUCCESS, SET_STORE_FAILURE] =
  createRequestActionTypes("store/SET_STORE");

/* --- Actions --- */
export const setStore = createAction(SET_STORE);

/**
 * login reducer 초기값
 */
const initialState = {
  productTypes: [],
  banners: [],
  contents: [],
};

const store = handleActions(
  {
    [SET_STORE_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        /** SUCCESS 처리 */
        draft.productTypes = action.payload?.productTypes;
        draft.banners = action.payload?.banners;
        draft.contents = action.payload?.contents;
      });
    },
  },
  initialState
);

export default store;
