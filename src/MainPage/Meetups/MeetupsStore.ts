import {
  action,
  observable,
  makeObservable,
  computed,
  runInAction,
} from "mobx";
import axios from "axios";
import { Person } from "types";
import { DateTime } from "luxon";
import { NotificationStore } from "../Notifications/NotificationStore";
import { URL } from "types";

export type Meetup = {
  author: Person;
  excerpt: string;
  finish: string;
  goCount: number;
  id: string;
  isOver: boolean;
  modified: string;
  place: string;
  speakers: Person[];
  start: string;
  status: string;
  subject: string;
  image?: string;
};

export class MeetupsStore {
  @observable meetups: Meetup[] = [];
  @observable isLoading = false;
  private notificationsStore: NotificationStore;

  @action sendGetRequest = async () => {
    try {
      this.isLoading = true;
      const resp = await axios.get(URL.meetups);
      runInAction(() => {
        this.meetups = resp.data;
      });
    } catch ({ message: errorMessage }) {
      this.notificationsStore.error(errorMessage as string);
    } finally {
      this.isLoading = false;
    }
  };
  @computed get getMeetupsThemes() {
    return this.meetups.filter((meetup) => meetup.status === "DRAFT");
  }
  @computed get getMeetupsFutures() {
    return this.meetups.filter(
      (meetup) =>
        meetup.status === "CONFIRMED" &&
        DateTime.now() < DateTime.fromISO(meetup.start)
    );
  }
  @computed get getMeetupsPast() {
    return this.meetups.filter(
      (meetup) =>
        meetup.status === "CONFIRMED" &&
        DateTime.now() > DateTime.fromISO(meetup.start)
    );
  }
  @computed get getMeetupsModerated() {
    return this.meetups.filter((meetup) => meetup.status === "REQUEST");
  }
  constructor(notificationStore: NotificationStore) {
    makeObservable(this);
    this.notificationsStore = notificationStore;
  }
}
