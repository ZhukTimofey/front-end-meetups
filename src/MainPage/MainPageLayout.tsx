import React, { useContext, useEffect } from "react";
import Header from "./Header";
import News from "./News";
import { Navigate, Route, Routes } from "react-router-dom";
import Meetups from "./Meetups";
import { UserContext } from "./ModalLogin/UserContext";
import { MeetupsContext } from "./Meetups/MeetupsContext";
import { MeetupsStore } from "./Meetups/MeetupsStore";
import UnauthorizedPage from "./ErrorsPages/UnauthorizedPage";
import NotFoundPage from "./ErrorsPages/NotFoundPage";
import { NotificationContext } from "./Notifications/NotificationContext";
import { useIntl } from "react-intl";
import { UserStore } from "./ModalLogin/UserStore";
import { observer, useLocalObservable } from "mobx-react-lite";
import { NewsContext } from "./News/NewsContext";
import { NewsStore } from "./News/NewsStore";
import "./style.scss";
import ModalLogin from "./ModalLogin";
import PrivateOutlet from "../components/PrivateRoute";
import Forbidden from "./ErrorsPages/Forbiden";

type Props = {};
const MainPageLayout: React.FC<Props> = observer(() => {
  const intl = useIntl();
  const notificationStore = useContext(NotificationContext);
  notificationStore.initMessages(intl);
  const userStore = useLocalObservable(() => new UserStore(notificationStore));
  const meetupsStore = useLocalObservable(
    () => new MeetupsStore(notificationStore)
  );
  const newsStore = useLocalObservable(() => new NewsStore(notificationStore));

  useEffect(() => {
    userStore.init();
  }, []);
  return (
    <MeetupsContext.Provider value={meetupsStore}>
      <UserContext.Provider value={userStore}>
        <NewsContext.Provider value={newsStore}>
          <div className="main-wrapper">
            <Header />
            <Routes>
              <Route
                path="/"
                element={<Navigate replace to="/meetups/themes" />}
              />
              {userStore.isAuth ? (
                <Route path="/login" element={<Navigate replace to="/" />} />
              ) : (
                <Route path="/login" element={<ModalLogin />} />
              )}
              <Route
                path="/meetups/*"
                element={
                  <PrivateOutlet
                    isValid={userStore.isAuth}
                    path={"/unauthorized"}
                  >
                    <Meetups />
                  </PrivateOutlet>
                }
              />

              <Route
                path="/news/*"
                element={
                  <PrivateOutlet
                    isValid={userStore.isAuth}
                    path={"/unauthorized"}
                  >
                    <News />
                  </PrivateOutlet>
                }
              />
              <Route path="/unauthorized" element={<UnauthorizedPage />} />
              <Route path="/404" element={<NotFoundPage />} />
              <Route path="/forbidden" element={<Forbidden />} />
              <Route path="*" element={<Navigate to="/404" />} />
            </Routes>
          </div>
        </NewsContext.Provider>
      </UserContext.Provider>
    </MeetupsContext.Provider>
  );
});

export default MainPageLayout;
