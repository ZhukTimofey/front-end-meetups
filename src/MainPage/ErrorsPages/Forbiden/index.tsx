import React from "react";
import { useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import "./style.scss";

const Forbidden = () => {
  const navigate = useNavigate();
  return (
    <div className="forbidden-wrapper">
      <h1 className="forbidden-header">
        <FormattedMessage id="error-page-forbidden-header" />
      </h1>
      <h2 className="forbidden-header-message">
        <FormattedMessage id="error-page-forbidden-text" />
      </h2>
      <p className="forbidden-text">
        <FormattedMessage id="error-page-forbidden" />
      </p>
      <button
        onClick={() => navigate("/meetups/themes")}
        className="forbidden-button"
      >
        <FormattedMessage id="error-page-forbidden-button" />
      </button>
    </div>
  );
};

export default Forbidden;
