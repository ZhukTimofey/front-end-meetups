import React from "react";
import ReactDOM from "react-dom";
import { MainPageContainer } from "./MainPage";
import { LanguageContext } from "./MainPage/LanguageContext";
import { LanguageStore } from "./MainPage/LanguageStore";
import customHistory from "./historyObject";
import CustomRouter from "./CustomRouter";
import { axiosMiddleware } from "./axiosMiddleware";
import "main.scss";

const languageStore = new LanguageStore();

axiosMiddleware();
ReactDOM.render(
  <React.StrictMode>
    <CustomRouter history={customHistory}>
      <LanguageContext.Provider value={languageStore}>
        <MainPageContainer />
      </LanguageContext.Provider>
    </CustomRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
