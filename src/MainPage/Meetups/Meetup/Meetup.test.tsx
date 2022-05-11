import React from "react";
import { render } from "utils/test";
import "@testing-library/jest-dom";
import Meetup from "./index";
import { IntlProvider } from "react-intl";
import { meetupProps, themeProps } from "utils/testData";
import en from "assets/localization/en.json";
import ru from "assets/localization/ru.json";
import { LanguageStore } from "../../LanguageStore";
const localizationLanguage = { en, ru };

describe("Meetup component", () => {
  it("Testing rendering props in theme component", () => {
    const languageStore = new LanguageStore();
    const { getByText } = render(
      <IntlProvider
        messages={localizationLanguage[languageStore.lang]}
        locale={languageStore.lang}
      >
        <Meetup meetup={themeProps} />
      </IntlProvider>
    );
    expect(
      getByText(`${themeProps.author.name} ${themeProps.author.surname}`)
    ).toBeInTheDocument();
    expect(getByText(themeProps.subject)).toBeInTheDocument();
    expect(getByText(themeProps.excerpt)).toBeInTheDocument();
    expect(getByText(themeProps.goCount)).toBeInTheDocument();
  });
  it("Testing rendering props in meetup component", () => {
    const languageStore = new LanguageStore();
    const { getByText } = render(
      <IntlProvider
        messages={localizationLanguage[languageStore.lang]}
        locale={languageStore.lang}
      >
        <Meetup meetup={meetupProps} />
      </IntlProvider>
    );
    expect(getByText(meetupProps.place)).toBeInTheDocument();
    expect(getByText(meetupProps.subject)).toBeInTheDocument();
    expect(getByText(meetupProps.excerpt)).toBeInTheDocument();
    expect(
      getByText(`${meetupProps.author.name} ${meetupProps.author.surname}`)
    ).toBeInTheDocument();
  });
});
