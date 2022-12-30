import { all } from "redux-saga/effects";
import loginSaga from "./login";
import authorSaga from "./author";
import postSaga from "./post";
import storeSaga from "./store";
import homeSaga from "./home";
import landingSaga from "./landing";
import dashboardSaga from "./dashboard";
import productSaga from "./product";

function* rootSaga() {
  // all 함수는 여러 사가를 합쳐 주는 역할을 함.
  yield all([
    loginSaga(),
    authorSaga(),
    postSaga(),
    storeSaga(),
    homeSaga(),
    landingSaga(),
    dashboardSaga(),
    productSaga(),
  ]);
}
export default rootSaga;
