import React, { useContext, useEffect } from "react";
import ReactDom from "react-dom";
import "./style.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoginInfo } from "types/index";
import logo from "../../assets/images/Logo_SaM.png";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FormattedMessage, useIntl } from "react-intl";
import { UserContext } from "./UserContext";
import { observer } from "mobx-react-lite";

type Props = {};

const LoginModal: React.FC<Props> = observer(() => {
  const intl = useIntl();
  const navigate = useNavigate();
  const userStore = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInfo>();
  const onSubmit: SubmitHandler<LoginInfo> = (data: LoginInfo) =>
    userStore.login(data);
  useEffect(() => {
    userStore.isRespUnauthorized = false;
  }, []);
  return ReactDom.createPortal(
    <div>
      <div className="modal-shadow" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="modal-wrapper">
          <div className="modal-header">
            <img className="logo-modal" src={logo} alt="" />
            <FontAwesomeIcon
              onClick={() => navigate("/unauthorized")}
              className="close-modal"
              icon={faTimes}
            />
          </div>

          <label className="labels ">
            <FormattedMessage id="Username" defaultMessage="Логин" />
          </label>
          <input
            data-cy="login"
            className={classNames("inputs", { inputError: errors.username })}
            {...register("username", {
              required: {
                value: true,
                message: intl.formatMessage({ id: "login-error-is-required" }),
              },
              minLength: {
                value: 3,
                message: intl.formatMessage({ id: "login-error-is-short" }),
              },
            })}
          />

          <span
            className={classNames(
              "errors",
              { hidden: !errors.username },
              "errors-modal"
            )}
          >
            <FontAwesomeIcon
              className="dropdown-icons"
              icon={faExclamationTriangle}
            />
            <p className={"errors-text"}>{errors?.username?.message}</p>
          </span>

          <label className="labels">
            <FormattedMessage id="Password" defaultMessage="Пароль" />
          </label>
          <input
            data-cy="password"
            type="password"
            className={classNames("inputs", { inputError: errors.username })}
            {...register("password", {
              minLength: {
                value: 6,
                message: intl.formatMessage({
                  id: "password-error-is-required",
                }),
              },
              required: {
                value: true,
                message: intl.formatMessage({
                  id: "password-error-is-required",
                }),
              },
            })}
          />
          <span
            className={classNames(
              "errors",
              { hidden: !errors.password },
              "errors-modal"
            )}
          >
            <FontAwesomeIcon
              className="dropdown-icons"
              icon={faExclamationTriangle}
            />

            <p className={"errors-text"}>{errors?.password?.message}</p>
          </span>

          <button
            data-cy="login-submit"
            className="buttons"
            onClick={handleSubmit(onSubmit)}
          >
            <FormattedMessage id="Login" defaultMessage="Login" />
          </button>
          <span
            className={classNames(
              "errors",
              {
                hidden: !userStore.isRespUnauthorized,
              },
              "errors-modal"
            )}
          >
            <FontAwesomeIcon
              className="dropdown-icons"
              icon={faExclamationTriangle}
            />

            <p className={"errors-text"}>
              <FormattedMessage id="modal-unauthorized" />
            </p>
          </span>
          <div className="modal-footer">
            <div>
              <FormattedMessage
                id="Forgot-password"
                defaultMessage="Забыли пароль"
              />
            </div>
            <div>
              <FormattedMessage id="Registration" defaultMessage="Войти" />
            </div>
          </div>
        </div>
      </form>
    </div>,
    document.getElementById("modal") as HTMLElement
  );
});

export default LoginModal;
