import { News } from "../MainPage/News/NewsStore";
import { Meetup } from "../MainPage/Meetups/MeetupsStore";
import { observable } from "mobx";
import axios from "axios";

export const languages: { ru: "ru"; en: "en" } = {
  ru: "ru",
  en: "en",
};

type Keys = keyof typeof languages;
export type Localization = typeof languages[Keys];
export type Person = { id: string; name: string; surname: string };
export interface User {
  id: string;
  name: string;
  password: string;
  surname: string;
  post: string;
  roles: string;
  label?: string;
  value?: string;
}
export type LoginInfo = {
  username: string;
  password: string;
};

export interface User {
  id: string;
  name: string;
  password: string;
  surname: string;
  post: string;
  roles: string;
  label?: string;
  value?: string;
}

export const URL = {
  meetups: process.env.REACT_APP_MEETUPS as string,
  login: process.env.REACT_APP_LOGIN as string,
  news: process.env.REACT_APP_NEWS as string,
};
export type TestStore = {
  testNews: News[];
  testMeetups: Meetup[];
  getMeetups: () => void;
  getNews: () => void;
};
export type TestOneNewsStore = {
  id: string;
  text: string;
  title: string;
  image: string;
  getNews: (id: string) => void;
};

export type Author = { id: string; name: string; surname: string };

export type NewsTest = {
  id: string;
  title: string;
  text: string;
  image: string;
};
export type TestDeleteStore = {
  id: string;
  isOpen: boolean;
  deleteNews: () => void;
  openModal: (id: string) => void;
  closeModal: () => void;
};
