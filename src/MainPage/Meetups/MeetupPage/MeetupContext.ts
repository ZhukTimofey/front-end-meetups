import React from "react";
import { MeetupStore } from "./MeetupStore";

export const MeetupContext: React.Context<MeetupStore> = React.createContext(
  {} as MeetupStore
);
