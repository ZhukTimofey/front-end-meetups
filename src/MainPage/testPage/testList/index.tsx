import React, { useEffect } from "react";
import { TestStore } from "types";
import { observer, useLocalObservable } from "mobx-react-lite";
import NewsTestComponent from "../components/testComponent";
import TestDeleteModal from "../components/DeleteModal";
import { TestDeleteStore } from "../../Meetups/MeetupsList/DeleteModal/DeleteStore";
import { useNavigate } from "react-router-dom";

type Props = { store: TestStore };
const TestList = observer(({ store }: Props) => {
  const deleteStore = useLocalObservable(() => TestDeleteStore());
  const navigate = useNavigate();

  useEffect(() => {
    store.getNews();
  }, []);
  return (
    <div>
      <button onClick={() => navigate("creation")}>Создать новость</button>
      {store.testNews.map(({ text, title, publicationDate, id }) => (
        <NewsTestComponent
          key={id}
          text={text}
          title={title}
          data={publicationDate}
          id={id}
          deleteStore={deleteStore}
        />
      ))}
      {deleteStore.isOpen && (
        <TestDeleteModal deleteNews={() => deleteStore.deleteNews()} />
      )}
    </div>
  );
});

export default TestList;
