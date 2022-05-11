import React, { useEffect, useContext } from "react";
import { Routes, Route, NavLink, Navigate } from "react-router-dom";
import RequiredStep from "./Required";
import AdditionalStep from "./Additional";
import { FormattedMessage } from "react-intl";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { observer } from "mobx-react-lite";
import { UserContext } from "../../ModalLogin/UserContext";
import { MeetupCreationContext } from "../MeetupCreationContext";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.scss";

type Props = {};

const MeetupCreationLayout: React.FC<Props> = observer(() => {
  const meetupCreationStore = useContext(MeetupCreationContext);
  const userStore = useContext(UserContext);
  useEffect(() => {
    meetupCreationStore.getUsers();
    meetupCreationStore.initAuthor(userStore.userInfo);
  }, []);

  return (
    <div className="creation-page-wrapper">
      <div className="creation-page-navigation">
        <NavLink
          to="/meetups/creation/required"
          className={(navData) =>
            navData.isActive
              ? "creation-page-active"
              : "required-header-not-active"
          }
        >
          {meetupCreationStore.isReqValuesValid ? (
            <span className="required-header-filled">
              <FontAwesomeIcon icon={faCheck} />
            </span>
          ) : (
            <span className="required-header-default">1</span>
          )}
          <FormattedMessage id="creation-page-nav-req" />
        </NavLink>

        <NavLink
          onClick={(event) => {
            if (!meetupCreationStore.isReqValuesValid) {
              event.preventDefault();
            }
          }}
          to="/meetups/creation/additional"
          className={(navData) =>
            classNames(
              { "creation-page-active": navData.isActive },
              {
                "additional-header-filled":
                  meetupCreationStore.isReqValuesValid && !navData.isActive,
              },
              {
                "creation-page-disabled pointer-disabled":
                  !navData.isActive && !meetupCreationStore.isReqValuesValid,
              }
            )
          }
        >
          <span className="required-header-default">2</span>
          <FormattedMessage id="creation-page-nav-additional" />
        </NavLink>
      </div>
      <div className="creation-page-header">
        <h2>
          <FormattedMessage id="creation-page-header-head" />
        </h2>
        <p>
          <FormattedMessage id="creation-page-header-body" />
        </p>
      </div>
      <Routes>
        <Route path="/required" element={<RequiredStep />} />
        <Route path="/additional" element={<AdditionalStep />} />
        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>
    </div>
  );
});

export default MeetupCreationLayout;
