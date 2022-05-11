import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NewsList from "./NewsList";
import CreationPage from "./CreationPage";
import NewsPage from "./NewsPage";
import EditingNews from "./NewsPage/EditingNews";
import PrivateOutlet from "components/PrivateRoute";
import { UserContext } from "../ModalLogin/UserContext";
import { observer } from "mobx-react-lite";

type Props = {};

const News: React.FC<Props> = observer(() => {
  const userStore = useContext(UserContext);
  return (
    <div>
      <Routes>
        <Route path="/" element={<NewsList />} />
        <Route path="/:id" element={<NewsPage />} />
        <Route
          path="/creation"
          element={
            <PrivateOutlet isValid={userStore.isUserChief} path={"/forbidden"}>
              <CreationPage />
            </PrivateOutlet>
          }
        />
        <Route
          path="/:id/edit"
          element={
            <PrivateOutlet isValid={userStore.isUserChief} path={"/forbidden"}>
              <EditingNews />
            </PrivateOutlet>
          }
        />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </div>
  );
});

export default News;
