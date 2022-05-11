import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { observer, useLocalObservable } from "mobx-react-lite";
import { News } from "./Store";
import { FormattedMessage } from "react-intl";
import "./style.scss";
import { UserContext } from "../../ModalLogin/UserContext";
import { NotificationContext } from "../../Notifications/NotificationContext";

const NewsPage = observer(() => {
  const params = useParams();
  const navigate = useNavigate();
  const userStore = useContext(UserContext);
  const notificationStore = useContext(NotificationContext);
  const newsStore = useLocalObservable(() => new News(notificationStore));
  const deleteMeetup = () => {
    newsStore.deleteNews(params.id as string);
  };
  useEffect(() => {
    if (params.id) newsStore.initStore(params.id);
  }, [params.id]);
  useEffect(() => {
    if (newsStore.isNewsDeleted) {
      navigate("/news");
    }
  }, [newsStore.isNewsDeleted]);
  return (
    <div className="news-page-wrapper">
      <h1 className="news-page-header">
        <FormattedMessage id="news-page-header" />
      </h1>
      <div className="news-page-img-wrapper">
        <img className="news-page-img" src={newsStore.image} alt="" />
      </div>
      <div className="news-page-content">
        <h2>{`${newsStore.title}`}</h2>
        <p>{`${newsStore.text}`}</p>
      </div>
      <div className="news-page-buttons">
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="news-page-button-back"
        >
          <FormattedMessage id="required-page-req-back" />
        </button>
        {userStore.isUserChief && (
          <div className={"news-page-chiefs-buttons"}>
            <button
              data-cy="news-delete-button"
              onClick={deleteMeetup}
              className="news-page-button-delete"
            >
              <FormattedMessage id={"theme-page-delete-button"} />
            </button>
            <button
              data-cy="news-edit-button"
              onClick={() => navigate(`/news/${params.id}/edit`)}
              className="news-page-button-edit"
            >
              <FormattedMessage id="meetup-editing-preview-button" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
});

export default NewsPage;
