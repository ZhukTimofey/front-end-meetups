import React, { useContext, useEffect } from "react";
import { MeetupsContext } from "../MeetupsContext";
import { FormattedMessage } from "react-intl";
import { Routes, Route, NavLink, Outlet, Navigate } from "react-router-dom";
import { NotificationContext } from "../../Notifications/NotificationContext";
import { DeletingContext } from "./DeletingContext";
import { DeletingStore } from "./DeletingStore";
import { MeetupStore } from "../MeetupPage/MeetupStore";
import { MeetupContext } from "../MeetupPage/MeetupContext";
import MeetupsList from "./MeetupList";
import { UserContext } from "../../ModalLogin/UserContext";
import { observer } from "mobx-react-lite";

type Props = {};
const MeetupsListContainer: React.FC<Props> = observer(() => {
  const notificationStore = useContext(NotificationContext);
  const deletingStore = new DeletingStore(notificationStore);
  const meetupStore = new MeetupStore(notificationStore);
  const userStore = useContext(UserContext);
  const meetupsStore = useContext(MeetupsContext);

  useEffect(() => {
    if (userStore.isAuth) {
      meetupsStore.sendGetRequest();
    }
  }, []);
  return (
    <>
      <DeletingContext.Provider value={deletingStore}>
        <MeetupContext.Provider value={meetupStore}>
          <div className="wrapper-meetups">
            <h1 data-cy={"meetups-list-header"}>
              <FormattedMessage id="meetups-header" defaultMessage="Митапы" />
            </h1>
            <div className="navigation">
              <NavLink
                data-cy={"to-themes"}
                className={(navData) =>
                  navData.isActive ? "meetups-list-active" : ""
                }
                to="themes"
              >
                <FormattedMessage id="meetups-nav-themes" />
              </NavLink>
              <NavLink
                data-cy={"to-moderated-meetups"}
                className={(navData) =>
                  navData.isActive ? "meetups-list-active" : ""
                }
                to="moderation"
              >
                <FormattedMessage
                  id="meetups-nav-moderation"
                  defaultMessage="Митапы"
                />
              </NavLink>
              <NavLink
                data-cy={"to-futures-meetups"}
                className={(navData) =>
                  navData.isActive ? "meetups-list-active" : ""
                }
                to="futures"
              >
                <FormattedMessage
                  id="meetups-nav-futures"
                  defaultMessage="Митапы"
                />
              </NavLink>
              <NavLink
                data-cy={"to-past-meetups"}
                className={(navData) =>
                  navData.isActive ? "meetups-list-active" : ""
                }
                to="past"
              >
                <FormattedMessage
                  id="meetups-nav-past"
                  defaultMessage="Митапы"
                />
              </NavLink>
            </div>

            <Outlet />
            <Routes>
              <Route path="" element={<Navigate replace to="themes" />} />
              <Route
                path="themes"
                element={
                  <MeetupsList meetups={meetupsStore.getMeetupsThemes} />
                }
              />

              <Route
                path="moderation"
                element={
                  <MeetupsList meetups={meetupsStore.getMeetupsModerated} />
                }
              />
              <Route
                path="futures"
                element={
                  <MeetupsList meetups={meetupsStore.getMeetupsFutures} />
                }
              />
              <Route
                path="past"
                element={<MeetupsList meetups={meetupsStore.getMeetupsPast} />}
              />
              <Route path="*" element={<Navigate to="/404" />} />
            </Routes>
          </div>
        </MeetupContext.Provider>
      </DeletingContext.Provider>
    </>
  );
});

export default MeetupsListContainer;
