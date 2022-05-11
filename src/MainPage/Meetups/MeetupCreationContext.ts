import React from "react";
import { MeetupCreationStore } from "./MeetupCreationStore";

export const MeetupCreationContext: React.Context<MeetupCreationStore> =
  React.createContext({} as MeetupCreationStore);
