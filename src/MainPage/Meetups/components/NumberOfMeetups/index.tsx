import React from "react";
import { FormattedMessage } from "react-intl";

type Props = {
  length: number;
  status: string;
  past: boolean;
};

const NumberOfMeetups = ({ length, status, past }: Props) => {
  return (
    <p>
      {status !== "DRAFT" ? (
        (status === "REQUEST" && (
          <FormattedMessage
            id="moderated-number-of-meetups"
            values={{ length: length }}
          />
        )) ||
        (status === "CONFIRMED" && past && (
          <FormattedMessage
            id="past-number-of-meetups"
            values={{ length: length }}
          />
        )) || (
          <FormattedMessage
            id="published-number-of-meetups"
            values={{ length: length }}
          />
        )
      ) : (
        <FormattedMessage
          id={"theme-numbers-of-meetups"}
          values={{ length: length }}
        />
      )}
    </p>
  );
};

export default NumberOfMeetups;
