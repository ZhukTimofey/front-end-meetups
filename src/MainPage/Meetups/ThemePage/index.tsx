import React, { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { observer, useLocalObservable } from "mobx-react-lite";
import { FormattedMessage } from "react-intl";
import "./style.scss";
import { MeetupStore } from "../MeetupPage/MeetupStore";
import { NotificationContext } from "../../Notifications/NotificationContext";
import { UserContext } from "../../ModalLogin/UserContext";
import ParticipantsList from "../components/Participants";

type Props = {};

const ThemePage: React.FC<Props> = observer(() => {
  const params = useParams();
  const navigate = useNavigate();
  const notificationStore = useContext(NotificationContext);
  const userStore = useContext(UserContext);

  const toPreviousPage = () => {
    navigate(-1);
  };
  const publishMeetup = () => {
    meetupStore.publishMeetup();
    navigate("/");
  };
  const meetupStore = useLocalObservable(
    () => new MeetupStore(notificationStore)
  );
  useEffect(() => {
    params.id && meetupStore.init(params.id);
  }, []);
  return meetupStore.isLoading ? (
    <div></div>
  ) : (
    <div className="theme-wrapper">
      <div className="theme-head">
        <FormattedMessage id="theme-page-header" />
      </div>
      <label>
        <FormattedMessage id="required-page-req-name" />
      </label>
      <div className="theme-subject">{`${meetupStore.meetup.subject}`}</div>
      <label>
        <FormattedMessage id="theme-page-author" />
      </label>
      <div className="theme-author">
        <div className="theme-author-avatar">
          <div className="theme-author-avatar-text">
            {`${meetupStore.meetup.author.name[0].toUpperCase()}${meetupStore.meetup.author.surname[0].toUpperCase()}`}
          </div>
        </div>

        {`${meetupStore.meetup.author.name} ${meetupStore.meetup.author.surname}`}
      </div>
      <label>
        <FormattedMessage id="meetup-page-description" />
      </label>
      <div className="theme-description">{`${meetupStore.meetup.excerpt}`}</div>

      {meetupStore.isMeetupHaveParticipants && (
        <div>
          <label>
            <FormattedMessage id="theme-participants" />
          </label>
          <ParticipantsList participants={meetupStore.participants} />
        </div>
      )}
      <div className="theme-button-section">
        <button onClick={toPreviousPage} className="back-button">
          <FormattedMessage id="meetup-page-back" />
        </button>
        <div>
          {userStore.userInfo.id === meetupStore.meetup.author.id && (
            <button onClick={publishMeetup} className="publish-theme">
              <FormattedMessage id="theme-page-publish-button" />
            </button>
          )}
          <button
            onClick={() => meetupStore.voteForTheme(userStore.userInfo)}
            className="feedback-button"
          >
            {meetupStore.isAproved(userStore.userInfo) ? (
              <FormattedMessage id="theme-page-approved-button" />
            ) : (
              <FormattedMessage id="theme-page-approve-button" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
});

export default ThemePage;
