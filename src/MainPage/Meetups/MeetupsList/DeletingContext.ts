import React from "react";
import { DeletingStore } from "./DeletingStore";

export const DeletingContext: React.Context<DeletingStore> =
  React.createContext({} as DeletingStore);
