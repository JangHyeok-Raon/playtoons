import { createAction, handleActions } from "redux-actions";
import { createRequestActionTypes } from "@REDUX/saga/createRequestSaga";
import produce from "immer";

/* --- Action Types --- */
export const [SET_LANDING, SET_LANDING_SUCCESS, SET_LANDING_FAILURE] =
  createRequestActionTypes("landing/SET_LANDING");

/* --- Actions --- */
export const setLanding = createAction(SET_LANDING);

/**
 * login reducer 초기값
 */
const initialState = {
  notice: [],
  curations: [],
  types: [],
};

const landing = handleActions(
  {
    [SET_LANDING_SUCCESS]: (state, action) => {
      return produce(state, (draft) => {
        /** SUCCESS 처리 */
        draft.notice = action.payload.notice;
        draft.curations = action.payload.curations;
        draft.types = action.payload.types;
      });
    },
  },
  initialState
);

export default landing;
