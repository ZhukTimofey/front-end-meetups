import React, { useContext } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import PrivateOutlet from "../../components/PrivateRoute";
import { UserContext } from "../ModalLogin/UserContext";
import { TestStore } from "./TestStore";
import TestList from "./testList";
import "./style.scss";
import TestNewsPage from "./TestNewsPage";
import { NewsPageStore } from "./TestNewsPage/Store";
import TestNewsCreation from "./TestNewsCreationPage";

const Test = () => {
  const userStore = useContext(UserContext);

  return (
    <div className={"test-wrapper"}>
      <div className={"test-navigation"}>
        <NavLink
          className={({ isActive }) =>
            isActive ? "test-navigation-active" : ""
          }
          to="news"
        >
          TestNews
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "test-navigation-active" : ""
          }
          to="meetups"
        >
          TestMeetups
        </NavLink>
      </div>
      <Routes>
        <Route
          path="/news"
          element={
            <PrivateOutlet isValid={userStore.isAuth} path={"/unauthorized"}>
              <TestList store={TestStore()} />
            </PrivateOutlet>
          }
        />
        <Route
          path="/news/:id"
          element={
            <PrivateOutlet isValid={userStore.isAuth} path={"/unauthorized"}>
              <TestNewsPage store={NewsPageStore()} />
            </PrivateOutlet>
          }
        />
        <Route
          path={"/news/creation"}
          element={
            <PrivateOutlet isValid={userStore.isAuth} path={"/unauthorized"}>
              <TestNewsCreation />
            </PrivateOutlet>
          }
        />
      </Routes>
    </div>
  );
};

export default Test;
