import React from "react";
import { useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import "./style.scss";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="not-found-wrapper">
      <h1 className="not-found-header">
        <FormattedMessage id="error-page-not-found-header" />
      </h1>
      <h2 className="not-found-header-message">
        <FormattedMessage id="error-page-not-found-text" />
      </h2>
      <p className="not-found-text">
        <FormattedMessage id="error-page-not-found" />
      </p>
      <button
        onClick={() => navigate("/meetups/themes")}
        className="not-found-button"
      >
        <FormattedMessage id="error-page-not-found-button" />
      </button>
    </div>
  );
};

export default NotFoundPage;
