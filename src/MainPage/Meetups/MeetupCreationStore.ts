import { action, observable, makeObservable, computed } from "mobx";
import { User, Author, Person } from "types";
import { DateTime } from "luxon";
import { AdditionalValues } from "./CreationPage/Additional";
import { Meetup } from "./MeetupsStore";
import axios from "axios";
import { NotificationStore } from "../Notifications/NotificationStore";

export class MeetupCreationStore {
  @observable id = "";
  @observable modified = "";
  @observable start = "";
  @observable finish = "";
  @observable author: Author = {} as Author;
  @observable speakers: string[] = [];
  @observable subject = "";
  @observable excerpt = "";
  @observable place?: string;
  @observable imageFile?: Blob;
  @observable image?: string;
  @observable users: User[] = [];
  @observable isCreated = false;
  @observable status = "";
  private notificationsStore: NotificationStore;

  @action requiredFields = (value: {
    subject: string;
    speakers: { value: string; label: string }[];
    excerpt: string;
  }) => {
    this.subject = value.subject;
    this.excerpt = value.excerpt;
    this.speakers = value.speakers.map((speaker) => speaker.value);
  };

  @action initAuthor = (author: Author) => {
    this.author = author;
  };

  @action getUsers = async () => {
    const resp = await axios.get("/users");
    this.users = resp.data;
  };
  @action getUser = (value: string) => {
    return this.users.find((user) => {
      return user.id === value;
    });
  };
  @computed get usersOption() {
    return this.users.map((user) => {
      return {
        label: user.name + " " + user.surname,
        value: user.id,
      };
    });
  }

  @computed get selectedUsersOption() {
    const selectedUsers = this.users.filter((user) =>
      this.speakers.find((speaker) => {
        return speaker === user.id;
      })
    );
    return selectedUsers.map((user) => {
      return {
        label: user.name + " " + user.surname,
        value: user.id,
      };
    });
  }

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
  @action setStartDate = (value: string) => {
    this.start = value;
  };
  @action setFinishDate = (value: string) => {
    this.finish = value;
  };

  @action setSubject = (value: string) => {
    this.subject = value;
  };
  @action setSpeakers = (value: { value: string; label: string }[]) => {
    this.speakers = value.map((speaker) => speaker.value);
  };
  @action setExcerpt = (value: string) => {
    this.excerpt = value;
  };
  @action resetImage = () => {
    this.imageFile = undefined;
    this.image = "";
  };
  @action setAdditionalValues = async (value: AdditionalValues) => {
    this.start = DateTime.fromJSDate(value.start).toISO();
    this.finish = DateTime.fromJSDate(value.finish).toISO();
    this.place = value.place;
    this.id = await this.createMeetup();
    if (this.id) {
      this.isCreated = true;
    }
  };

  @action createMeetup = async () => {
    const meetupData = {
      modified: DateTime.now().toISO(),
      start: this.start,
      finish: this.finish,
      author: this.author,
      speakers: this.speakers.map((speaker) =>
        this.users.find((user) => user.id === speaker)
      ),
      subject: this.subject,
      excerpt: this.excerpt,
      place: this.place,
      image: this.image,
    };
    try {
      const resp = await axios.post("/meetups", meetupData);
      this.notificationsStore.success("notification-creation");
      return resp.data.id;
    } catch ({ message: errorMessage }) {
      this.notificationsStore.error(errorMessage as string);
    }
  };
  @action initEditingStore = async (id: string) => {
    try {
      const meetup = await axios.get(`/meetups/${id}`);
      this.setDefaultValues(meetup.data);
      this.getUsers();
    } catch ({ message: errorMessage }) {
      this.notificationsStore.error(errorMessage as string);
    }
  };
  @action setDefaultValues = (meetup: Meetup) => {
    this.author = meetup.author;
    this.status = meetup.status;
    this.id = meetup.id;
    this.start = meetup.start;
    this.finish = meetup.finish;
    this.subject = meetup.subject;
    this.excerpt = meetup.excerpt;
    this.speakers = meetup.speakers.map((speaker: Person) => speaker.id);
    this.place = meetup.place || undefined;
    this.image = meetup.image || undefined;
  };
  @action setForm = (
    subject: string,
    excerpt: string,
    speakers: { label: string; value: string }[],
    place?: string
  ) => {
    this.subject = subject;
    this.excerpt = excerpt;
    this.speakers = speakers.map((speaker) => speaker.value);
    this.place = place;
  };
  @action editMeetup = async () => {
    const meetupData = {
      id: this.id,
      modified: DateTime.now().toISO(),
      start: this.start,
      finish: this.finish,
      author: this.author,
      speakers: this.speakers.map((speaker) =>
        this.users.find((user) => user.id === speaker)
      ),
      subject: this.subject,
      excerpt: this.excerpt,
      place: this.place,
      image: this.image,
    };
    try {
      await axios.put("/meetups", meetupData);
      this.notificationsStore.success("notification-editing");
    } catch ({ message: errorMessage }) {
      this.notificationsStore.error(errorMessage as string);
    }
  };
  @computed get isReqValuesValid() {
    return (
      this.subject.length >= 3 &&
      this.speakers.length !== 0 &&
      this.excerpt.length >= 10
    );
  }
  @computed get isDateValid() {
    return (
      DateTime.fromISO(this.start) < DateTime.fromISO(this.finish) &&
      DateTime.fromISO(this.start).hasSame(
        DateTime.fromISO(this.finish),
        "year"
      ) &&
      DateTime.fromISO(this.start).hasSame(
        DateTime.fromISO(this.finish),
        "month"
      ) &&
      DateTime.fromISO(this.start).hasSame(DateTime.fromISO(this.finish), "day")
    );
  }
  @computed get isReqFilled() {
    return !this.speakers || !this.subject || !this.excerpt;
  }
  @computed get minDate() {
    return DateTime.fromISO(this.start).toJSDate();
  }
  @computed get maxDate() {
    return DateTime.fromISO(this.start).toJSDate();
  }
  @computed get minTime() {
    return DateTime.fromISO(this.start).plus({ minutes: 30 }).toJSDate();
  }
  @computed get maxTime() {
    return DateTime.fromISO(this.start).plus({ hours: 3 }).toJSDate();
  }
  @computed get isInit() {
    if (
      this.id &&
      this.start &&
      this.finish &&
      this.users.length > 0 &&
      this.speakers.length > 0 &&
      this.subject &&
      this.excerpt
    ) {
      return true;
    } else {
      return false;
    }
  }

  constructor(notificationStore: NotificationStore) {
    makeObservable(this);
    this.notificationsStore = notificationStore;
  }
}
