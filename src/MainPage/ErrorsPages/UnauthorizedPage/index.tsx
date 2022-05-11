import React from "react";
import { FormattedMessage } from "react-intl";
import "./style.scss";
import { useNavigate } from "react-router-dom";

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="unauthorized-wrapper">
      <h1 className="unauthorized-header">
        <FormattedMessage id="error-page-unauthorized" />
      </h1>
      <p className="unauthorized">
        <FormattedMessage id="error-page-unauthorized-header" />
      </p>
      <button
        data-cy="unauthorized-login"
        onClick={() => navigate("/login")}
        className="unauthorized-button"
      >
        <FormattedMessage id="error-page-sign-in" />
      </button>
    </div>
  );
};

export default UnauthorizedPage;
