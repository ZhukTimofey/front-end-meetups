import React, { useContext } from "react";
import MeetupContent from "./MeetupContent";
import { render, screen } from "utils/test";
import "@testing-library/jest-dom/extend-expect";
import { DateTime } from "luxon";
import userEvent from "@testing-library/user-event";
import { LanguageStore } from "../../../LanguageStore";
import { LanguageContext } from "../../../LanguageContext";
import { IntlProvider } from "react-intl";
import { meetupProps } from "utils/testData";
import { observer } from "mobx-react-lite";
import en from "assets/localization/en.json";
import ru from "assets/localization/ru.json";
const localizationLanguage = { en, ru };

type Props = {
  children: JSX.Element;
};
const MeetupProvider = ({ children }: Props) => {
  return (
    <LanguageContext.Provider value={new LanguageStore()}>
      <div>{children}</div>
    </LanguageContext.Provider>
  );
};
const MeetupComponent = observer(() => {
  const languageStore = useContext(LanguageContext);
  return (
    <IntlProvider
      messages={localizationLanguage[languageStore.lang]}
      locale={languageStore.lang}
    >
      <div>
        <button onClick={() => languageStore.setLang("en")}>en</button>
        <button onClick={() => languageStore.setLang("ru")}>ru</button>

        <MeetupContent meetup={meetupProps} />
      </div>
    </IntlProvider>
  );
});
describe("Meetup content test", () => {
  it("Test render of the props", () => {
    const languageStore = new LanguageStore();
    const { getByText } = render(
      <IntlProvider
        messages={localizationLanguage[languageStore.lang]}
        locale={languageStore.lang}
      >
        <MeetupContent meetup={meetupProps} />
      </IntlProvider>
    );

    expect(screen.getByText(meetupProps.subject)).toBeInTheDocument();
    expect(screen.getByText(meetupProps.excerpt)).toBeInTheDocument();
    expect(screen.getByText(meetupProps.place)).toBeInTheDocument();
    meetupProps.speakers.map((speaker) =>
      expect(
        screen.getByText(`${speaker.name} ${speaker.surname}`)
      ).toBeInTheDocument()
    );
    expect(
      screen.getByText(
        `${DateTime.fromISO(meetupProps.start).toFormat("HH:mm")}`
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        `${DateTime.fromISO(meetupProps.finish).toFormat("HH:mm")}`
      )
    ).toBeInTheDocument();
  });
  it("Test language switch", () => {
    const { getByText } = render(
      <MeetupProvider>
        <MeetupComponent />
      </MeetupProvider>
    );
    userEvent.click(getByText("en"));
    expect(screen.getByText("Time and place")).toBeInTheDocument();
    expect(screen.getByText("Speakers")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    userEvent.click(getByText("ru"));
    expect(screen.getByText("Время и место проведения")).toBeInTheDocument();
    expect(screen.getByText("Спикеры")).toBeInTheDocument();
    expect(screen.getByText("Описание")).toBeInTheDocument();
  });
});
