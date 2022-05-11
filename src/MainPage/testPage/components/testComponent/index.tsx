import React from "react";
import "./style.scss";
import { DateTime } from "luxon";
import { useNavigate } from "react-router-dom";
import { TestDeleteStore, URL } from "types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

type Props = {
  title: string;
  text: string;
  data: string;
  id: string;
  deleteStore: TestDeleteStore;
};

const NewsTestComponent = ({ title, text, data, id, deleteStore }: Props) => {
  const navigate = useNavigate();
  return (
    <div
      className="news-test-wrapper"
      onClick={() => {
        navigate(`/test${URL.news}/${id}`);
      }}
    >
      <h4 className={"news-test-header"}>{title}</h4>
      <div className={"news-test-text"}>{text}</div>
      <div className={"news-test-icons"}>
        <h4>{DateTime.fromISO(data).toFormat("dd.MM.yyyy")}</h4>
        <div>
          <FontAwesomeIcon icon={faPenToSquare} />
          <FontAwesomeIcon
            onClick={(e) => {
              e.stopPropagation();
              deleteStore.openModal(id);
            }}
            icon={faTrashCan}
          />
        </div>
      </div>
    </div>
  );
};

export default NewsTestComponent;
