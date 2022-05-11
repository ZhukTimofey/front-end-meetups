import React, { useContext, useEffect } from "react";
import { Routes, Route, useParams, Navigate } from "react-router-dom";
import MeetupEditingLayout from "./MeetupEditingLayout";
import { MeetupCreationStore } from "../../MeetupCreationStore";
import { MeetupCreationContext } from "../../MeetupCreationContext";
import { observer, useLocalObservable } from "mobx-react-lite";
import MeetupPreviewLayout from "./MeetupPreviewLayout";
import { NotificationContext } from "../../../Notifications/NotificationContext";

type Props = {};

const MeetupEditing: React.FC<Props> = observer(() => {
  const params = useParams();
  const notificationStore = useContext(NotificationContext);
  const meetupCreationStore = useLocalObservable(
    () => new MeetupCreationStore(notificationStore)
  );
  useEffect(() => {
    meetupCreationStore.initEditingStore(params.id as string);
  }, []);
  return (
    <MeetupCreationContext.Provider value={meetupCreationStore}>
      {meetupCreationStore.isInit && (
        <Routes>
          <Route path="/" element={<MeetupEditingLayout />} />
          <Route path="/preview" element={<MeetupPreviewLayout />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      )}
    </MeetupCreationContext.Provider>
  );
});

export default MeetupEditing;
