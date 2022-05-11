import {
  makeObservable,
  observable,
  action,
  computed,
  runInAction,
} from "mobx";
import { LoginInfo } from "../../types/";
import axios from "axios";
import { NotificationStore } from "../Notifications/NotificationStore";

export interface User {
  id: string;
  name: string;
  password: string;
  post: string;
  roles: string;
  surname: string;
}
const URL = {
  meetups: process.env.REACT_APP_MEETUPS as string,
  login: process.env.REACT_APP_LOGIN as string,
  logout: process.env.REACT_APP_LOGOUT as string,
};
export class UserStore {
  @observable userInfo: User = {} as User;
  @observable isAuth = true;
  @observable isRespUnauthorized = false;
  private notificationsStore;

  @action login = async (userData: LoginInfo) => {
    try {
      const response = await axios.post(URL.login, userData);
      runInAction(() => {
        this.userInfo = response.data.user;
        this.isAuth = true;
        this.isRespUnauthorized = false;
      });
    } catch ({ message: errorMessage }) {
      this.isAuth = false;
      this.isRespUnauthorized = true;
      this.notificationsStore.error(errorMessage as string);
    }
  };
  @action logout = async () => {
    try {
      await axios.get(URL.logout);
      this.userInfo = {} as User;
      this.isAuth = false;
    } catch ({ message: errorMessage }) {
      this.notificationsStore.error(errorMessage as string);
    }
  };
  @action setInfoOfLoggedUser = async () => {
    try {
      const response = await axios.get(URL.login);
      runInAction(() => {
        this.userInfo = response.data.user;
      });
    } catch ({ message: errorMessage }) {
      this.isAuth = false;
      this.notificationsStore.error(errorMessage as string);
    }
  };
  @computed get isUserChief() {
    return this.userInfo.roles === "CHIEF";
  }
  @action init = () => {
    this.setInfoOfLoggedUser();
  };
  constructor(notificationsStore: NotificationStore) {
    this.notificationsStore = notificationsStore;
    makeObservable(this);
  }
}
