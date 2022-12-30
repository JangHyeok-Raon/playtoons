import { createAction, handleActions } from "redux-actions";
import produce from "immer";

/* --- Action Types --- */
const SET_DIM = "dim/SET_DIM";

/* --- Actions --- */
export const setDim = createAction(SET_DIM);

/**
 * login reducer 초기값
 */
const initialState = {
  dimType: null,
  isShow: false,
};

const dim = handleActions(
  {
    [SET_DIM]: (state, action) => {
      return produce(state, (draft) => {
        draft.dimType = action.payload.dimType;
        draft.isShow = action.payload.isShow;
      });
    },
  },
  initialState
);

export default dim;
