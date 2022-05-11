import { LanguageStore } from "./LanguageStore";

test("Test of switching languages", () => {
  const languageStore = new LanguageStore();

  languageStore.setLang("ru");
  expect(languageStore.lang).toBe("ru");
  languageStore.setLang("en");
  expect(languageStore.lang).toBe("en");
});
