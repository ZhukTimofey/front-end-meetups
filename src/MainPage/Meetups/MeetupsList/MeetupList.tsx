import React, { useContext } from "react";
import Meetup from "../Meetup";
import { Meetup as MeetupType } from "../MeetupsStore";
import { useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import "./style.scss";
import DeletingModal from "./DeleteModal";
import { observer } from "mobx-react-lite";
import { DeletingContext } from "./DeletingContext";
import NumberOfMeetups from "../components/NumberOfMeetups";
import { DateTime } from "luxon";

type Props = {
  meetups: MeetupType[];
};

const MeetupList: React.FC<Props> = observer(({ meetups }) => {
  const navigate = useNavigate();
  const deletingStore = useContext(DeletingContext);

  return meetups[0] && meetups[0].status ? (
    <>
      <div className="meetups-list-header">
        <NumberOfMeetups
          length={meetups.length}
          status={meetups[0].status}
          past={DateTime.now() > DateTime.fromISO(meetups[0].start)}
        />
        <button
          data-cy={"to-create-page"}
          onClick={() => navigate("/meetups/creation/required")}
        >
          <FormattedMessage
            id="meetup-creation-button"
            defaultMessage="Митапы"
          />
        </button>
      </div>
      <div className={"meetups-list-body"}>
        {meetups.map((meetup) => (
          <Meetup key={meetup.id} meetup={meetup} />
        ))}
        {deletingStore.isOpen && <DeletingModal />}
      </div>
    </>
  ) : (
    <div></div>
  );
});

export default MeetupList;
