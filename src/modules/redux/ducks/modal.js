import { createAction, handleActions } from "redux-actions";
import { createRequestActionTypes } from "@REDUX/saga/createRequestSaga";
import produce from "immer";

/* --- Action Types --- */
export const [POPUP, POPUP_SHOW, POPUP_HIDE] = createRequestActionTypes("popup");

/* --- Actions --- */
export const showModal = createAction(POPUP_SHOW);
export const hideModal = createAction(POPUP_HIDE);


/**
 * login reducer 초기값
 */
 const initialState = {
  show : false,
  title: null,
  contents : <></>,
  callback : null,
}

const popup = handleActions(
  {
    [POPUP_SHOW]: (state, action) => {
      return produce(state, (draft) => {
        draft.show = true;
        draft.title = action.payload.title;
        draft.contents = action.payload.contents;
        draft.callback = action.payload.callback;
      });
    },
    [POPUP_HIDE]: (state, action) => {
      state.callback?.();
      return initialState;
    },
  },
  initialState
);

export default popup;

