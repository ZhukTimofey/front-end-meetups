import React from "react";
import { Person } from "types";
import "./style.scss";
import classNames from "classnames";

type Props = {
  participants: Person[];
};

const ParticipantsList: React.FC<Props> = ({ participants }) => {
  return (
    <div className="theme-participants-wrapper">
      <div className="theme-participants">
        {participants.map((participant, index) => (
          <div key={index} className="theme-participant-avatar">
            <div className="theme-participant-avatar-text">{`${participant.name[0].toUpperCase()}${participant.surname[0].toUpperCase()}`}</div>
          </div>
        ))}
      </div>
      <div
        className={classNames("theme-participant-amount-wrapper", {
          hidden: !(participants.length > 9),
        })}
      >
        <div className="theme-participant-amount">
          +{participants.length - 9}
        </div>
      </div>
    </div>
  );
};

export default ParticipantsList;
