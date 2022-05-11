import React, { useContext, useState, useRef } from "react";
import "./style.scss";
import logo from "assets/images/Logo_SaM.png";
import { FormattedMessage } from "react-intl";
import { languages } from "../../types";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { LanguageContext } from "../LanguageContext";
import { observer } from "mobx-react-lite";
import { UserContext } from "../ModalLogin/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faChartBar,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useClickAway } from "react-use";

type Props = {};

const Header: React.FC<Props> = observer(() => {
  const [profileIsOpen, setProfileIsOpen] = useState<boolean>(false);
  const languageStore = useContext(LanguageContext);
  const userStore = useContext(UserContext);
  const refDropDown = useRef(null);
  const logout = () => {
    setProfileIsOpen(false);
    userStore.logout();
  };
  useClickAway(refDropDown, () => {
    setProfileIsOpen(false);
  });
  return (
    <header className="header">
      <div className="wrapper">
        <img src={logo} alt="" />
        <div className="links">
          <NavLink
            data-cy="header-meetup"
            to="/meetups"
            className={(navData) =>
              navData.isActive ? "header-nav-active" : ""
            }
          >
            <FormattedMessage id="meetups" defaultMessage="Митапы" />
          </NavLink>
          <NavLink
            data-cy="header-news"
            className={(navData) =>
              navData.isActive ? "header-nav-active" : ""
            }
            to="/news"
          >
            <FormattedMessage id="news" defaultMessage="Новости" />
          </NavLink>
          <NavLink
            className={(navData) =>
              navData.isActive ? "header-nav-active" : ""
            }
            to="/test"
          >
            <FormattedMessage id="test" />
          </NavLink>
        </div>
        <div>
          {userStore.isAuth ? (
            <div className="profile" ref={refDropDown}>
              {
                <button
                  data-cy="user-name"
                  className="profile-user"
                  onClick={() => setProfileIsOpen(true)}
                >
                  {userStore.userInfo.name && (
                    <>
                      <span>
                        {`${userStore.userInfo.name} ${userStore.userInfo.surname}`}
                      </span>
                      <div className="profile-user-avatar">
                        <div className="profile-user-avatar-text">
                          {`${userStore.userInfo.name[0].toUpperCase()}${userStore.userInfo.surname[0].toUpperCase()}`}
                        </div>
                      </div>
                    </>
                  )}
                </button>
              }
              {profileIsOpen && (
                <div className="profile-dropdown">
                  <button disabled className="button-settings">
                    <FontAwesomeIcon className="dropdown-icons" icon={faCog} />
                    <FormattedMessage
                      id="Settings"
                      defaultMessage="Настройки"
                    />
                  </button>
                  <button disabled className="button-stats">
                    <FontAwesomeIcon
                      className="dropdown-icons"
                      icon={faChartBar}
                    />
                    <FormattedMessage id="Stats" defaultMessage="Статистика" />
                  </button>

                  <div className="languages-buttons">
                    <button
                      data-cy="button-ru"
                      className="language-button button-ru "
                      onClick={() => languageStore.setLang(languages.ru)}
                      disabled={languageStore.lang === languages.ru}
                    >
                      <FormattedMessage id="buttonRu" defaultMessage="RU" />
                    </button>
                    <button
                      data-cy="button-en"
                      className="language-button button-en"
                      onClick={() => languageStore.setLang(languages.en)}
                      disabled={languageStore.lang === languages.en}
                    >
                      <FormattedMessage id="buttonEng" defaultMessage="EN" />
                    </button>
                  </div>
                  <button className="button-quit" onClick={logout}>
                    <FontAwesomeIcon
                      className="dropdown-icons"
                      icon={faTimesCircle}
                    />
                    <FormattedMessage id="Quit" defaultMessage="Выйти" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="header-login">
              <Link to="/login">
                <FormattedMessage id="Login" defaultMessage="Войти" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
});

export default Header;
