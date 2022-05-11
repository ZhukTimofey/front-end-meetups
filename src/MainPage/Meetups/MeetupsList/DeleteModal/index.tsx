import React, { useContext } from "react";
import ReactDom from "react-dom";
import "./style.scss";
import { FormattedMessage } from "react-intl";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { MeetupContext } from "../../MeetupPage/MeetupContext";
import { DeletingContext } from "../DeletingContext";

const DeletingModal = () => {
  const meetupStore = useContext(MeetupContext);
  const deletingStore = useContext(DeletingContext);
  const navigate = useNavigate();
  const deleteMeetup = () => {
    meetupStore.deleteMeetup(deletingStore.id);
    deletingStore.closeModal();
    navigate("/");
  };
  return ReactDom.createPortal(
    <>
      <div onClick={deletingStore.closeModal} className="delete-modal-shadow" />
      <div className="delete-modal-wrapper">
        <div className="delete-modal-text">
          <div className="delete-modal-header">
            <h2>
              <FormattedMessage id="deleting-modal-header" />
            </h2>
            <FontAwesomeIcon
              onClick={deletingStore.closeModal}
              className="close-delete-modal"
              icon={faTimes}
            />
          </div>
          <p className="delete-modal-info">
            <FormattedMessage id="deleting-modal-text" />
          </p>
          <p className="delete-modal-cancel">
            <FormattedMessage id="deleting-modal-warning" />
          </p>
        </div>
        <div className="delete-modal-buttons">
          <button
            onClick={deletingStore.closeModal}
            className="delete-modal-no-button"
          >
            <FormattedMessage id="deleting-modal-no-button" />
          </button>
          <button
            data-cy={"delete-meetup"}
            onClick={deleteMeetup}
            className="delete-modal-yes-button"
          >
            <FormattedMessage id="deleting-modal-yes-button" />
          </button>
        </div>
      </div>
    </>,
    document.getElementById("modal") as HTMLElement
  );
};

export default DeletingModal;
