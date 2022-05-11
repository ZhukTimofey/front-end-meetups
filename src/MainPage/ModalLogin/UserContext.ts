import React from "react";
import { UserStore } from "./UserStore";

export const UserContext: React.Context<UserStore> = React.createContext(
  {} as UserStore
);
