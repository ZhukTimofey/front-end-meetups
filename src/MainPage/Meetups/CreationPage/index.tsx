import React, { useContext } from "react";
import { MeetupCreationContext } from "../MeetupCreationContext";
import MeetupCreationLayout from "./MeetupCreationLayout";
import { observer, useLocalObservable } from "mobx-react-lite";
import { MeetupCreationStore } from "../MeetupCreationStore";
import { NotificationContext } from "../../Notifications/NotificationContext";

type Props = {};

const CreationPage: React.FC<Props> = observer(() => {
  const notificationStore = useContext(NotificationContext);
  const meetupCreationStore = useLocalObservable(
    () => new MeetupCreationStore(notificationStore)
  );

  return (
    <MeetupCreationContext.Provider value={meetupCreationStore}>
      <MeetupCreationLayout />
    </MeetupCreationContext.Provider>
  );
});

export default CreationPage;
