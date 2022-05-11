import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faClock,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { DateTime } from "luxon";
import "../style.scss";
import { Meetup as MeetupType } from "../../MeetupsStore";
import { MeetupCreationStore } from "../../MeetupCreationStore";
import { FormattedDate, FormattedMessage } from "react-intl";
import { MeetupCreationContext } from "../../MeetupCreationContext";

type Props = {
  meetup: MeetupType | MeetupCreationStore;
};

const MeetupContent: React.FC<Props> = ({ meetup }) => {
  const meetupCreationStore = useContext(MeetupCreationContext);
  return (
    <>
      <div className="meetup-page-subject">
        {meetup.image && (
          <div className="meetup-image-wrapper">
            <img className="meetup-image" src={meetup.image} alt="" />
          </div>
        )}
        <h3 data-cy="meetup-subject">{meetup.subject}</h3>
      </div>
      <label>
        <FormattedMessage id="meetup-page-date-time" />
      </label>
      <div className="meetup-page-holding">
        <div data-cy="meetup-time">
          <FontAwesomeIcon icon={faCalendar} />
          <FormattedDate
            value={meetup.start}
            year="numeric"
            month="long"
            day="numeric"
            weekday="long"
          />
        </div>
        <div>
          <FontAwesomeIcon icon={faClock} />
          <span data-cy="meetup-time-start">{`${DateTime.fromISO(
            meetup.start
          ).toFormat("HH:mm")}`}</span>{" "}
          -
          <span data-cy="meetup-time-finish">{`${DateTime.fromISO(
            meetup.finish
          ).toFormat("HH:mm")}`}</span>
        </div>
        {meetup.place && (
          <div data-cy="meetup-place">
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            {`${meetup.place}`}
          </div>
        )}
      </div>
      <label>
        <FormattedMessage id="meetup-page-speakers" />
      </label>

      <div data-cy="meetup-speakers" className="meetup-page-speakers-wrapper">
        {meetup.speakers.map((value) =>
          typeof value === "string" ? (
            <div>
              <div className="meetup-page-speaker">
                <div className="speaker-avatar">
                  <div className="speaker-avatar-text">{`${meetupCreationStore
                    .getUser(value)
                    ?.name[0].toUpperCase()}${meetupCreationStore
                    .getUser(value)
                    ?.surname[0].toUpperCase()}`}</div>
                </div>
                {`${meetupCreationStore.getUser(value)?.name} ${
                  meetupCreationStore.getUser(value)?.surname
                }`}
              </div>
            </div>
          ) : (
            <div key={value.id} className="meetup-page-speaker">
              <div className="speaker-avatar">
                <div className="speaker-avatar-text">{`${value.name[0].toUpperCase()}${value.surname[0].toUpperCase()}`}</div>
              </div>
              {`${value.name} ${value.surname}`}
            </div>
          )
        )}
      </div>
      <label>
        <FormattedMessage id="meetup-page-description" />
      </label>
      <div
        data-cy="meetup-excerpt"
        className="meetup-page-excerpt"
      >{`${meetup.excerpt}`}</div>
    </>
  );
};

export default MeetupContent;
