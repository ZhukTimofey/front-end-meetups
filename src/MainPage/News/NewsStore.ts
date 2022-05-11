import { action, observable, makeObservable } from "mobx";
import axios from "axios";
import { NotificationStore } from "../Notifications/NotificationStore";

export type News = {
  id: string;
  publicationDate: string;
  title: string;
  text: string;
  image?: string;
};

export class NewsStore {
  @observable news: News[] = [];
  private notifications: NotificationStore;

  @action getNews = async () => {
    try {
      const resp = await axios.get("/news");
      this.news = resp.data;
    } catch ({ message: errorMessage }) {
      this.notifications.error(errorMessage as string);
    }
  };

  constructor(notifications: NotificationStore) {
    makeObservable(this);
    this.notifications = notifications;
  }
}
