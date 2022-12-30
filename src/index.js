import ReactDOM from "react-dom/client";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./css/swiper.min.css";
import "./css/font.css";
import "./css/default.css";
import "./css/common.css";
import "./css/mobile.css";
import "./css/custom.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import configureStore, { sagaMiddleware } from "@REDUX/store";
import rootSaga from "@REDUX/saga";
import "@/config/lang/i18n";

export const store = configureStore();
sagaMiddleware.run(rootSaga);

//for mobile css 
document.documentElement.style.setProperty('--vh', `${window.innerHeight*0.01}px`);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>

  <Provider store={store}>
    <PersistGate persistor={store.persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
