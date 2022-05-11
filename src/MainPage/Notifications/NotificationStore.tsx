import { makeObservable, observable, action } from "mobx";
import { toast } from "react-toastify";
import { IntlShape } from "react-intl";
import { notifications } from "constants/config";

export class NotificationStore {
  @observable intl: IntlShape = {} as IntlShape;
  @observable success = (id: string) =>
    toast.success(this.intl.formatMessage({ id: id }), {
      ...notifications,
      autoClose: 2000,
      pauseOnHover: false,
    });
  @observable error = (error: string) => {
    toast.error(error, {
      ...notifications,
      autoClose: 3000,
      pauseOnHover: true,
    });
  };
  @action initMessages = (intl: IntlShape) => {
    this.intl = intl;
  };
  constructor() {
    makeObservable(this);
  }
}
