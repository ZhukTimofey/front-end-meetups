import { makeObservable, observable, action } from "mobx";
import { languages, Localization } from "../types";

export class LanguageStore {
  @observable lang: Localization = languages.ru;

  @action setLang(value: Localization) {
    this.lang = value;
    localStorage.setItem("lang", this.lang);
  }
  @action init = () => {
    if (
      localStorage.getItem("lang") === "ru" ||
      localStorage.getItem("lang") === "en"
    ) {
      this.lang = localStorage.getItem("lang") as Localization;
    }
  };

  constructor() {
    makeObservable(this);
  }
}
