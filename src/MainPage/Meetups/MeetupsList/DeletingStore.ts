import { action, observable, makeObservable } from "mobx";
import { NotificationStore } from "../../Notifications/NotificationStore";

export class DeletingStore {
  @observable id = "";
  @observable isOpen = false;
  private notificationsStore: NotificationStore;

  @action setId = (id: string) => {
    this.id = id;
  };
  @action closeModal = () => {
    this.id = "";
    this.isOpen = false;
  };
  constructor(notificationStore: NotificationStore) {
    makeObservable(this);
    this.notificationsStore = notificationStore;
  }
}
