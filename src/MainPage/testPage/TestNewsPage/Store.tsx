import { makeAutoObservable } from "mobx";
import axios from "axios";
import { URL } from "types";

export function NewsPageStore() {
  return makeAutoObservable({
    id: "",
    text: "",
    title: "",
    image: "",
    async getNews(id: string) {
      try {
        const resp = await axios.get(`${URL.news}/${id}`);
        this.id = resp.data.id;
        this.text = resp.data.text;
        this.title = resp.data.title;
        this.image = resp.data.image;
      } catch (err) {
        console.log(err);
      }
    },
  });
}
