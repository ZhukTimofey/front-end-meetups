import { action, observable, makeObservable } from "mobx";
import axios from "axios";
import { NotificationStore } from "../../Notifications/NotificationStore";

export class News {
  @observable id: string = "";
  @observable title: string = "";
  @observable text: string = "";
  @observable image: string = "";
  @observable isNewsDeleted = false;
  private notificationsStore: NotificationStore;

  @action initStore = async (id: string) => {
    try {
      const resp = await axios.get(`/news/${id}`);
      this.id = resp.data.id;
      this.title = resp.data.title;
      this.text = resp.data.text;
      this.image = resp.data.image;
    } catch ({ message: errorMessage }) {
      this.notificationsStore.error(errorMessage as string);
    }
  };
  @action deleteNews = async (id: string) => {
    try {
      await axios.delete(`${id}`);
      this.isNewsDeleted = true;
      this.notificationsStore.success("notification-news-deleting");
    } catch ({ message: errorMessage }) {
      this.notificationsStore.error(errorMessage as string);
    }
  };
  constructor(notifications: NotificationStore) {
    makeObservable(this);
    this.notificationsStore = notifications;
  }
}
