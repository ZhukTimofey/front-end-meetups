import { makeAutoObservable } from "mobx";
import { URL } from "types";
import axios from "axios";

export function TestDeleteStore() {
  return makeAutoObservable({
    id: "",
    isOpen: false,
    async deleteNews() {
      await axios.delete(`${URL.news}/${this.id}`);
      this.isOpen = false;
    },
    openModal(id: string) {
      this.id = id;
      this.isOpen = true;
    },
    closeModal() {
      this.isOpen = false;
    },
  });
}
