import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { DateTime } from "luxon";
import { datePicker } from "../../constants/data";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import { MeetupCreationStore } from "../../MainPage/Meetups/MeetupCreationStore";
import ru from "date-fns/locale/ru";
import en from "date-fns/locale/en-CA";

import "./style.scss";
import { useIntl } from "react-intl";
import { LanguageContext } from "../../MainPage/LanguageContext";
registerLocale("ru", ru);
registerLocale("en", en);

type Props = {
  onChange: (...event: any[]) => void;
  value: Date;
  meetupCreationStore: MeetupCreationStore;
};
const ReactDatePickerStart = ({
  onChange,
  value,
  meetupCreationStore,
}: Props) => {
  const intl = useIntl();
  const { lang } = useContext(LanguageContext);
  return (
    <ReactDatePicker
      data-cy={"creation-date-start"}
      locale={lang}
      timeCaption={intl.formatMessage({ id: "react-datepicker-caption" })}
      renderCustomHeader={({
        date,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div
          style={{
            padding: 10,
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "#fff",
            borderBottom: "1px solid #D5DCE7",
          }}
        >
          <button
            onClick={decreaseMonth}
            disabled={prevMonthButtonDisabled}
            className="date-picker-buttons"
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>

          <div>{DateTime.fromJSDate(date).toFormat("yy")}</div>
          <button
            className={"date-picker-buttons"}
            onClick={increaseMonth}
            disabled={nextMonthButtonDisabled}
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </div>
      )}
      dateFormat={datePicker}
      onChange={(date) => {
        meetupCreationStore.setStartDate(
          DateTime.fromJSDate(date as Date).toISO()
        );
        onChange(date);
      }}
      selected={value}
      showTimeSelect
    />
  );
};

export default ReactDatePickerStart;
