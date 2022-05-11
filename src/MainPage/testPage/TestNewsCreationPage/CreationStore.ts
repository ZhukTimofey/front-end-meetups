import { makeAutoObservable } from "mobx";

export function CreationStore() {
  makeAutoObservable({
    title: "",
    img: "",
    image: "",
    text: "",
    date: "",
  });
}
