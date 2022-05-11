import { makeAutoObservable } from "mobx";
import { News } from "../News/NewsStore";
import { Meetup } from "../Meetups/MeetupsStore";
import { URL } from "types";
import axios, { AxiosResponse } from "axios";
import { TestStore as TestStoreType } from "types";

export function TestStore(): TestStoreType {
  return makeAutoObservable({
    testNews: [] as News[],
    testMeetups: [] as Meetup[],
    async getMeetups() {
      try {
        const resp: AxiosResponse = await axios.get(URL.meetups);
        this.testMeetups = resp.data;
      } catch (err) {
        console.log(err);
      }
    },
    async getNews() {
      try {
        const resp: AxiosResponse = await axios.get(URL.news);
        this.testNews = resp.data;
      } catch (err) {
        console.log(err);
      }
    },
  });
}

// export class TestStore {
//   testNews: News[] = [];
//   testMeetups: Meetup[] = [];
//
//   getNews = () => {};
//
//   constructor(props) {
//     super(props);
//   }
// }
