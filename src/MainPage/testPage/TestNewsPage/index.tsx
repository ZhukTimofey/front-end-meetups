import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { TestOneNewsStore } from "../../../types";
import "./style.scss";

export type Props = {
  store: TestOneNewsStore;
};

const TestNewsPage = observer(({ store }: Props) => {
  const params = useParams();
  console.log("resp", store);
  useEffect(() => {
    if (typeof params.id === "string") {
      store.getNews(params.id);
    }
  }, []);
  return (
    <div className={"test-one-news-wrapper"}>
      <img src={store.image} alt="" />
      <div>{store.title}</div>
      <div>{store.text}</div>
    </div>
  );
});

export default TestNewsPage;
