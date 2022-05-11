import { action, observable, makeObservable, computed } from "mobx";
import axios from "axios";
import { NotificationStore } from "../Notifications/NotificationStore";

export class NewsCreationStore {
  @observable id: string = "";
  @observable title: string = "";
  @observable text: string = "";
  @observable image?: string = undefined;
  @observable imageFile?: Blob;
  private notificationsStore;

  @action setImage = (img: Blob) => {
    this.imageFile = img;
    const reader = new FileReader();
    reader.readAsDataURL(this.imageFile);
    reader.onload = () => {
      if (typeof reader.result === "string") {
        this.image = reader.result;
      }
    };
  };
  @action resetImage = () => {
    this.imageFile = undefined;
    this.image = undefined;
  };
  @action createNews = async (title: string, text: string) => {
    this.title = title;
    this.text = text;
    try {
      const resp = await axios.post("/news", {
        title: this.title,
        text: this.text,
        image: this.image,
      });
      this.id = resp.data.id;
      this.notificationsStore.success("notification-news-creation");
      return resp.data.id;
    } catch ({ message: errorMessage }) {
      this.notificationsStore.error(errorMessage as string);
    }
  };
  @action initEditingStore = async (id: string) => {
    try {
      const resp = await axios.get(`/news/${id}`);
      this.title = resp.data.title;
      this.text = resp.data.text;
      this.image = resp.data.image;
      this.id = resp.data.id;
    } catch ({ message: errorMessage }) {
      this.notificationsStore.error(errorMessage as string);
    }
  };
  @action editNews = async (title: string, text: string, id: string) => {
    this.title = title;
    this.text = text;
    try {
      await axios.put(`/news/${id}`, {
        title: this.title,
        text: this.text,
        image: this.image,
      });
      this.notificationsStore.success("notification-news-editing");
    } catch ({ message: errorMessage }) {
      this.notificationsStore.error("errorMessage");
    }
  };

  @computed get isInit() {
    return !!this.title && !!this.text;
  }
  constructor(notifications: NotificationStore) {
    makeObservable(this);
    this.notificationsStore = notifications;
  }
}
