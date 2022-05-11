import React from "react";
import ReactDom from "react-dom";
import { useNavigate } from "react-router-dom";

import "./style.scss";

type Props = {
  deleteNews: () => void;
};

const TestDeleteModal = ({ deleteNews }: Props) => {
  const navigate = useNavigate();
  return ReactDom.createPortal(
    <>
      <div className={"test-delete-modal-bg"} />
      <div className={"test-delete-modal-wrapper"}>
        <div>Вы точно хотите удалить?</div>
        <div>
          <button
            onClick={() => {
              navigate("/test");
              deleteNews();
            }}
          >
            Да
          </button>
          <button>Нет</button>
        </div>
      </div>
    </>,
    document.getElementById("modal") as HTMLElement
  );
};

export default TestDeleteModal;
