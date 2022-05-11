import React, { useContext } from "react";
import "./style.scss";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import User from "../components/user";
import delimiter from "assets/images/delimiter.png";
import { Meetup as MeetupType } from "../MeetupsStore";
import { FormattedDate } from "react-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faEdit,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { observer } from "mobx-react-lite";
import { DeletingContext } from "../MeetupsList/DeletingContext";
import { FormattedMessage } from "react-intl";

type Props = {
  meetup: MeetupType;
};

const Meetup: React.FC<Props> = observer(({ meetup }) => {
  const navigate = useNavigate();
  const deletingStore = useContext(DeletingContext);
  const getDetails = () => {
    if (meetup.status === "DRAFT") {
      navigate(`/meetups/theme/${meetup.id}`);
    } else {
      navigate(`/meetups/meetup/${meetup.id}`);
    }
  };
  return (
    <>
      <div
        data-cy="meetup-component"
        className="meetups-background"
        onClick={getDetails}
      >
        <div
          className={classNames(
            { meetupsAuthor: meetup.status === "DRAFT" },
            { meetupsPlace: meetup.status !== "DRAFT" }
          )}
        >
          {meetup.status === "DRAFT" ? (
            <User name={meetup.author.name} surname={meetup.author.surname} />
          ) : null}
          {meetup.status !== "DRAFT" ? (
            <div className="location-time">
              <FormattedDate
                value={meetup.start}
                year="numeric"
                month="long"
                day="numeric"
                weekday="long"
              />
              <img src={delimiter} alt="" />
              <span>{meetup.place}</span>
            </div>
          ) : null}

          <div>
            <FontAwesomeIcon
              data-cy="meetup-delete"
              onClick={(event) => {
                event.stopPropagation();
                deletingStore.setId(meetup.id);
                deletingStore.isOpen = true;
              }}
              icon={faTrashAlt}
            />
            {meetup.status === "REQUEST" && (
              <FontAwesomeIcon
                data-cy="meetup-edit"
                icon={faEdit}
                onClick={(event) => {
                  event.stopPropagation();
                  navigate(`/meetups/meetup/${meetup.id}/edit`);
                }}
                className="meetup-icon-edit"
              />
            )}
          </div>
        </div>
        <h2 data-cy="meetup-component-subject">{meetup.subject}</h2>
        <p className={"meetup-component-text"}>{meetup.excerpt}</p>
        {meetup.status === "DRAFT" ? (
          <div className="feedback">
            <FontAwesomeIcon icon={faUser} />
            <p className="feedback-number">{`${meetup.goCount}`}</p>
            <FormattedMessage id={"meetup-support"} />
          </div>
        ) : null}
        {meetup.status !== "DRAFT" ? (
          <User name={meetup.author.name} surname={meetup.author.surname} />
        ) : null}
      </div>
    </>
  );
});

export default Meetup;
