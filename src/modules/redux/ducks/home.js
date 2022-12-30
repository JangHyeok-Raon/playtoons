import { createAction, handleActions } from "redux-actions";
import { createRequestActionTypes } from "@REDUX/saga/createRequestSaga";
import produce from "immer";

/* --- Action Types --- */
export const [SET_HOME, SET_HOME_SUCCESS, SET_HOME_FAILURE] =
  createRequestActionTypes("home/SET_HOME");

/* --- Actions --- */
export const setHome = createAction(SET_HOME);

/**
 * login reducer 초기값
 */
const initialState = {
  banners: [],
  contents: [],
};

const home = handleActions(
  {
    [SET_HOME_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        /** SUCCESS 처리 */
        draft.banners = action.payload.banners;
        draft.contents = action.payload.contents;
      });
    },
  },
  initialState
);

export default home;
