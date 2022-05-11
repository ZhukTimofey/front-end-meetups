import React, { useContext } from "react";
import { MeetupCreationContext } from "./MeetupCreationContext";
import { observer } from "mobx-react-lite";
import { Navigate, Route, Routes } from "react-router-dom";
import MeetupsListContainer from "./MeetupsList";
import { MeetupCreationStore } from "./MeetupCreationStore";
import ThemePage from "./ThemePage";
import MeetupPage from "./MeetupPage";
import "./style.scss";
import { NotificationContext } from "../Notifications/NotificationContext";
import CreationPage from "./CreationPage";

type Props = {};

const Meetups: React.FC<Props> = observer(() => {
  const notificationStore = useContext(NotificationContext);
  const meetupCreationStore = new MeetupCreationStore(notificationStore);
  return (
    <MeetupCreationContext.Provider value={meetupCreationStore}>
      <Routes>
        <Route path="/*" element={<MeetupsListContainer />} />
        <Route path="/creation/*" element={<CreationPage />} />
        <Route path="/theme/:id" element={<ThemePage />} />
        <Route path="/meetup/:id/*" element={<MeetupPage />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </MeetupCreationContext.Provider>
  );
});

export default Meetups;
