import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import MeetupContent from "./component/MeetupContent";
import { observer, useLocalObservable } from "mobx-react-lite";
import { MeetupStore } from "./MeetupStore";
import { NotificationContext } from "../../Notifications/NotificationContext";
import ParticipantsList from "../components/Participants";
import { UserContext } from "../../ModalLogin/UserContext";

type Props = {};

const MeetupLayout: React.FC<Props> = observer(() => {
  const navigate = useNavigate();
  const params = useParams();
  const notificationStore = useContext(NotificationContext);
  const userStore = useContext(UserContext);
  const meetupStore = useLocalObservable(
    () => new MeetupStore(notificationStore)
  );
  useEffect(() => {
    if (params.id) {
      meetupStore.init(params.id);
    }
  }, []);
  return meetupStore.isLoading ? (
    <div></div>
  ) : (
    <div className="meetup-page-wrapper">
      <div className="meetup-page-header">
        <h2>
          <FormattedMessage id="view-of-the-meetup-header" />
        </h2>
      </div>
      <MeetupContent meetup={meetupStore.meetup} />
      {meetupStore.isMeetupHaveParticipants && (
        <div>
          <label>
            <FormattedMessage id="theme-participants" />
          </label>
          <ParticipantsList participants={meetupStore.participants} />
        </div>
      )}
      <div className="meetup-page-buttons">
        <button onClick={() => navigate(-1)} className="meetup-page-back">
          <FormattedMessage id="meetup-page-back" />
        </button>
        <button
          onClick={() => meetupStore.voteForTheme(userStore.userInfo)}
          className="feedback-button"
        >
          {meetupStore.isAproved(userStore.userInfo) ? (
            <FormattedMessage id="meetup-page-signed-up-button" />
          ) : (
            <FormattedMessage id="meetup-page-sign-up-button" />
          )}
        </button>
        {meetupStore.isModeratedMeetup && userStore.isUserChief && (
          <button
            onClick={() => {
              meetupStore.createTheme();
              navigate("/");
            }}
            className="meetup-page-publish"
          >
            <FormattedMessage id="meetup-page-publish" />
          </button>
        )}
      </div>
    </div>
  );
});

export default MeetupLayout;
