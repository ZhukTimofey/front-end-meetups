import React from "react";
import { LanguageStore } from "./LanguageStore";

export const LanguageContext: React.Context<LanguageStore> =
  React.createContext({} as LanguageStore);
