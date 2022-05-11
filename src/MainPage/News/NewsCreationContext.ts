import React from "react";
import { NewsCreationStore } from "./NewsCreationStore";

export const NewsCreationContext: React.Context<NewsCreationStore> =
  React.createContext({} as NewsCreationStore);
