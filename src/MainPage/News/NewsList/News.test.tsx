import { LanguageStore } from "../../LanguageStore";
import { render, screen } from "utils/test";
import { IntlProvider } from "react-intl";
import News from "./News";
import { newsProps } from "utils/testData";
import "@testing-library/jest-dom";

import React from "react";
import en from "assets/localization/en.json";
import ru from "assets/localization/ru.json";
import { DateTime } from "luxon";
const localizationLanguage = { en, ru };

test("Testing render of the props in news component", () => {
  const languageStore = new LanguageStore();
  const { getByText } = render(
    <IntlProvider
      messages={localizationLanguage[languageStore.lang]}
      locale={languageStore.lang}
    >
      <News news={newsProps} />
    </IntlProvider>
  );
  expect(getByText(newsProps.title)).toBeInTheDocument();
  expect(getByText(newsProps.text)).toBeInTheDocument();
  expect(
    getByText(
      DateTime.fromISO(newsProps.publicationDate).toFormat("dd.MM.yyyy")
    )
  ).toBeInTheDocument();
});
