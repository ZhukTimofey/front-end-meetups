import React, { useContext, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import { NewsContext } from "../NewsContext";
import { UserContext } from "../../ModalLogin/UserContext";
import News from "./News";
import "./style.scss";
import { observer } from "mobx-react-lite";

type Props = {};

const NewsList: React.FC<Props> = observer(() => {
  const navigate = useNavigate();
  const newsStore = useContext(NewsContext);
  const userStore = useContext(UserContext);

  useEffect(() => {
    if (userStore.isAuth) {
      newsStore.getNews();
    }
  }, [userStore.isAuth]);
  return (
    <div className="news-list-wrapper">
      <div className="news-list-header">
        <h2>
          <FormattedMessage id="news-list-header" />
        </h2>
        {userStore.isUserChief && (
          <button
            data-cy="news-creation-button"
            onClick={() => navigate("creation")}
            className="news-list-header-button"
          >
            <FormattedMessage id="news-list-header-button" />
          </button>
        )}
      </div>
      {newsStore.news.map((news) => (
        <News key={news.id} news={news} />
      ))}
    </div>
  );
});

export default NewsList;
