import React from "react";
import { NewsStore } from "./NewsStore";

export const NewsContext: React.Context<NewsStore> = React.createContext(
  {} as NewsStore
);
