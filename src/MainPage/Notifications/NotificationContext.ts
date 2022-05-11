import React from "react";
import { NotificationStore } from "./NotificationStore";

export const NotificationContext: React.Context<NotificationStore> =
  React.createContext({} as NotificationStore);
