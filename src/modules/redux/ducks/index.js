import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import login from "./login";
import loading from "./loading";
import author from "./author";
import post from "./post";
import store from "./store";
import home from "./home";
import landing from "./landing";
import alertModal from "./modal";
import dashboard from "./dashboard";
import dim from "./dim";
import container from "./container";
import product from "./product";

const persistConfig = {
  key: "root",
  storage,
};

const appReducer = combineReducers({
  login,
  loading,
  alertModal,
  author,
  post,
  store,
  home,
  landing,
  dashboard,
  dim,
  container,
  product,
});

const rootReducer = (state, action) => {
  if (action.type === "login/LOGOUT") {
    // Clear User Data
    state = undefined;
  }
  return appReducer(state, action);
};

export default persistReducer(persistConfig, rootReducer);
