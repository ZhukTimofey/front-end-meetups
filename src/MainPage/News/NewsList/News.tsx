import React from "react";
import { News as NewsType } from "../NewsStore";
import { DateTime } from "luxon";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
type Props = {
  news: NewsType;
};

const News: React.FC<Props> = ({ news }) => {
  const navigate = useNavigate();
  return (
    <div
      data-cy="news-component"
      onClick={() => navigate(`/news/${news.id}`)}
      className="news-list-bg"
    >
      {news.image && (
        <div>
          <img src={news.image} alt="" />
        </div>
      )}
      <div className={classNames({ "news-content": !news.image })}>
        <div className="news-time">
          {DateTime.fromISO(news.publicationDate).toFormat("dd.MM.yyyy")}
        </div>
        <h2 className="news-header">{news.title}</h2>
        <div className="news-text">{news.text}</div>
      </div>
    </div>
  );
};

export default News;
