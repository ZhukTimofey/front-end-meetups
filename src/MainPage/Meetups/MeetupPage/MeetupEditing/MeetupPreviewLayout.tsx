import React, { useContext } from "react";
import MeetupContent from "../component/MeetupContent";
import { FormattedMessage } from "react-intl";
import { MeetupCreationContext } from "../../MeetupCreationContext";
import "../style.scss";
import { useNavigate, useParams } from "react-router-dom";

const MeetupPreviewLayout = () => {
  const params = useParams();
  const navigate = useNavigate();
  const meetupCreationStore = useContext(MeetupCreationContext);
  const edit = () => {
    meetupCreationStore.editMeetup();
    navigate(`/meetups/meetup/${params.id}`);
  };
  return (
    <div className="meetup-page-wrapper">
      <div className="meetup-page-header">
        <h2>
          <FormattedMessage id={"meetup-editing-preview-header"} />
        </h2>
      </div>
      <MeetupContent meetup={meetupCreationStore} />
      <div className="meetup-page-buttons">
        <button
          onClick={() => navigate(`/meetups/meetup/${params.id}/edit`)}
          className="meetup-page-back"
        >
          <FormattedMessage id={"meetup-page-back"} />
        </button>
        <button onClick={edit} className="meetup-page-publish">
          <FormattedMessage id={"meetup-editing-preview-button"} />
        </button>
      </div>
    </div>
  );
};

export default MeetupPreviewLayout;
