import React from "react";
import { MeetupsStore } from "./MeetupsStore";

export const MeetupsContext: React.Context<MeetupsStore> = React.createContext(
  {} as MeetupsStore
);
