import { Meetup } from "../MeetupsStore";
import axios from "axios";
import { makeObservable, observable, action, computed } from "mobx";
import { NotificationStore } from "../../Notifications/NotificationStore";
import { Person, User } from "types";

export class MeetupStore {
  @observable meetup = {} as Meetup;
  @observable isLoading = true;
  @observable participants: Person[] = [];
  private notificationsStore: NotificationStore;

  @action deleteMeetup = (id: string) => {
    try {
      axios.delete(`/meetups/${id}`);
      this.notificationsStore.success("notification-deleting");
    } catch ({ message: errorMessage }) {
      this.notificationsStore.error(errorMessage as string);
    }
  };

  @action init = async (id: string) => {
    try {
      const resp = await Promise.all([
        axios.get(`/meetups/${id}`),
        axios.get(`/meetups/${id}/participants`),
      ]).then((values) => values);
      this.meetup = resp[0].data;
      this.participants = resp[1].data;
    } catch ({ message: errorMessage }) {
      this.notificationsStore.error(errorMessage as string);
    } finally {
      this.isLoading = false;
    }
  };
  @computed get isModeratedMeetup() {
    return this.meetup.status === "REQUEST";
  }

  @action createTheme = async () => {
    try {
      const data = {
        ...this.meetup,
        status: "DRAFT",
      };
      await axios.put(`/meetups`, data);
      this.notificationsStore.success("notification-theme");
    } catch ({ message: errorMessage }) {
      this.notificationsStore.error(errorMessage as string);
    }
  };

  @action publishMeetup = async () => {
    try {
      const data = {
        ...this.meetup,
        status: "CONFIRMED",
      };
      await axios.put(`/meetups`, data);
      this.notificationsStore.success("notification-publishing");
    } catch ({ message: errorMessage }) {
      this.notificationsStore.error(errorMessage as string);
    }
  };
  @action isAproved = (user: Person) => {
    return this.participants.find((participant) => participant.id === user.id);
  };

  @action voteForTheme = async (user: User) => {
    if (this.participants.find((participant) => participant.id === user.id)) {
      try {
        await axios.delete(`/meetups/${this.meetup.id}/participants`);
        await this.updateParticipants();
        const data = {
          ...this.meetup,
          goCount: this.participants.length,
        };
        await axios.put(`/meetups`, data);
      } catch ({ message: errorMessage }) {
        this.notificationsStore.error(errorMessage as string);
      }
    } else {
      try {
        await axios.post(`/meetups/${this.meetup.id}/participants`, user.id);
        await this.updateParticipants();
        const data = {
          ...this.meetup,
          goCount: this.participants.length,
        };
        await axios.put(`/meetups`, data);
      } catch ({ message: errorMessage }) {
        this.notificationsStore.error(errorMessage as string);
      }
    }
  };
  @action updateParticipants = async () => {
    try {
      const participants = await axios.get(
        `/meetups/${this.meetup.id}/participants`
      );
      this.participants = participants.data;
    } catch ({ message: errorMessage }) {
      this.notificationsStore.error(errorMessage as string);
    }
  };
  @computed get isMeetupHaveParticipants() {
    return this.participants.length > 0;
  }
  constructor(notificationStore: NotificationStore) {
    makeObservable(this);
    this.notificationsStore = notificationStore;
  }
}
