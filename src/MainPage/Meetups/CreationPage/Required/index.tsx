import React, { useContext, useEffect } from "react";
import { MeetupCreationContext } from "../../MeetupCreationContext";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import {
  useForm,
  SubmitHandler,
  Controller,
  NestedValue,
} from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import { reactSelect, reactSelectThemes } from "../../../../constants/styles";

type Props = {};
type RequiredValues = {
  subject: string;
  speakers: NestedValue<{ label: string; value: string }[]>;
  excerpt: string;
};

const RequiredStep: React.FC<Props> = observer(() => {
  const intl = useIntl();
  const meetupCreationStore = useContext(MeetupCreationContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RequiredValues>({
    defaultValues: { speakers: meetupCreationStore.selectedUsersOption },
  });
  const onSubmit: SubmitHandler<RequiredValues> = () => {
    navigate("/meetups/creation/additional");
  };

  useEffect(() => {
    meetupCreationStore.getUsers();
  }, []);
  return (
    <>
      <div>
        <form
          className="creation-page-required-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label>
            <FormattedMessage id="required-page-req-name" />
          </label>
          <input
            data-cy="creation-subject"
            defaultValue={meetupCreationStore.subject}
            type="text"
            {...register("subject", {
              required: {
                value: true,
                message: intl.formatMessage({
                  id: "required-page-name-err-req",
                }),
              },
              minLength: {
                value: 3,
                message: intl.formatMessage({
                  id: "required-page-name-err-short",
                }),
              },
              onChange: (value) => {
                meetupCreationStore.setSubject(value.target.value);
              },
            })}
          />
          <span
            data-cy="subject-error"
            className={classNames("errors", {
              hidden: !errors.subject,
            })}
          >
            <FontAwesomeIcon
              className="dropdown-icons"
              icon={faExclamationTriangle}
            />
            <span className={"errors-text"}>{errors?.subject?.message}</span>
          </span>
          <label>
            <FormattedMessage id="required-page-req-speaker" />
          </label>
          <Controller
            data-cy="creation-speakers"
            control={control}
            name="speakers"
            rules={{
              required: {
                value: true,
                message: intl.formatMessage({
                  id: "required-page-validation-speakers",
                }),
              },
            }}
            render={({ field: { onChange } }) => (
              <Select
                className="required-page-speakers"
                classNamePrefix="required-page-speakers"
                isMulti
                styles={reactSelect}
                theme={reactSelectThemes}
                defaultValue={meetupCreationStore.selectedUsersOption}
                placeholder={intl.formatMessage({
                  id: "react-select-placeholder",
                })}
                onChange={(value) => {
                  meetupCreationStore.setSpeakers(
                    value as { value: string; label: string }[]
                  );
                  onChange(value);
                }}
                options={meetupCreationStore.usersOption}
              />
            )}
          />
          <span
            data-cy="speaker-error"
            className={classNames("errors", {
              hidden: !errors.speakers,
            })}
          >
            <FontAwesomeIcon
              className="dropdown-icons"
              icon={faExclamationTriangle}
            />
            <span className={"errors-text"}>{errors?.speakers?.message}</span>
          </span>

          <label>
            <FormattedMessage id="required-page-req-description" />
          </label>
          <textarea
            data-cy={"creation-excerpt"}
            defaultValue={meetupCreationStore.excerpt}
            {...register("excerpt", {
              required: {
                value: true,
                message: intl.formatMessage({
                  id: "required-page-excerpt-err-req",
                }),
              },
              minLength: {
                value: 10,
                message: intl.formatMessage({
                  id: "required-page-excerpt-err-short",
                }),
              },
              onChange: (value) => {
                meetupCreationStore.setExcerpt(value.target.value);
              },
            })}
          />

          <span
            data-cy="excerpt-error"
            className={classNames("errors", {
              hidden: !errors.excerpt,
            })}
          >
            <FontAwesomeIcon
              className="dropdown-icons"
              icon={faExclamationTriangle}
            />
            <span className={"errors-text"}>{errors?.excerpt?.message}</span>
          </span>
        </form>
      </div>
      <div className="creation-page-buttons">
        <button onClick={() => navigate(-1)} className="creation-page-back">
          <FormattedMessage id="required-page-req-back" />
        </button>
        <button
          data-cy={"creation-to-additional"}
          className="creation-page-next"
          onClick={handleSubmit(onSubmit)}
        >
          <FormattedMessage id="required-page-req-next" />
        </button>
      </div>
    </>
  );
});

export default RequiredStep;
