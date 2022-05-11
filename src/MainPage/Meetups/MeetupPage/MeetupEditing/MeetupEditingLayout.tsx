import React, { useContext } from "react";
import {
  useForm,
  Controller,
  NestedValue,
  SubmitHandler,
} from "react-hook-form";
import { DateTime } from "luxon";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import { observer } from "mobx-react-lite";
import { MeetupCreationContext } from "../../MeetupCreationContext";
import { reactSelect, reactSelectThemes } from "constants/styles";
import reset from "assets/images/Group 48.png";
import { FormattedMessage, useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import ReactDatePickerStart from "components/DatePickers/ReactDatePickerStart";
import "../style.scss";
import DropzoneComponent from "components/DropZone";
import ReactDatePickerFinish from "components/DatePickers/ReactDatePickerFinish";

type Props = {};

type Form = {
  start: Date;
  finish: Date;
  speakers: NestedValue<{ label: string; value: string }[]>;
  subject: string;
  excerpt: string;
  place: string | undefined;
  imageFile?: Blob;
};

const MeetupEditing: React.FC<Props> = observer(() => {
  const meetupCreationStore = useContext(MeetupCreationContext);
  const intl = useIntl();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<Form>({
    defaultValues: {
      start: DateTime.fromISO(meetupCreationStore.start).toJSDate(),
      finish: DateTime.fromISO(meetupCreationStore.finish).toJSDate(),
      speakers: meetupCreationStore.selectedUsersOption,
    },
  });
  const onDrop = (img: Blob[] | undefined) => {
    if (img && img.length) {
      meetupCreationStore.setImage(img[0]);
      return img[0];
    }
  };

  const preview: SubmitHandler<Form> = async (data) => {
    meetupCreationStore.setForm(
      data.subject,
      data.excerpt,
      data.speakers,
      data.place
    );
    navigate(`preview`);
  };

  const resetImg = () => {
    setValue("imageFile", undefined);
    meetupCreationStore.resetImage();
  };

  const onSubmit: SubmitHandler<Form> = (data) => {
    meetupCreationStore.setForm(
      data.subject,
      data.excerpt,
      data.speakers,
      data.place
    );
    meetupCreationStore.editMeetup();
    navigate(`/meetups/meetup/${meetupCreationStore.id}`);
  };

  return (
    <div className="meetup-page-edit-wrapper">
      <div className="meetup-page-edit-header">
        <h2>
          <FormattedMessage id="meetup-edit-header" />
        </h2>
      </div>
      <div className="meetup-page-edit-forms">
        <label>
          <FormattedMessage id="meetup-edit-photo" />
        </label>
        {!meetupCreationStore.image ? (
          <Controller
            control={control}
            name="imageFile"
            render={({ field: { onChange } }) => (
              <DropzoneComponent onDrop={onDrop} onChange={onChange} />
            )}
          />
        ) : (
          <div className={"meetup-editing-images"}>
            <img
              className="edit-image"
              src={meetupCreationStore.image}
              alt=""
            />
            <img
              className="reset-image"
              src={reset}
              onClick={resetImg}
              alt=""
            />
          </div>
        )}
        <label>
          <FormattedMessage id="meetup-edit-theme" />
        </label>
        <input
          defaultValue={meetupCreationStore.subject}
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
          })}
        />
        <span
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
        <div className="meetup-page-edit-dates">
          <div className="date-start">
            <label>
              <FormattedMessage id="additional-page-beginning-label" />
            </label>
            <Controller
              control={control}
              name="start"
              rules={{
                required: {
                  value: true,
                  message: intl.formatMessage({
                    id: "meetup-start-err-req",
                  }),
                },
                validate: {
                  value: () =>
                    meetupCreationStore.isDateValid ||
                    "Start date must be less than finish, and in same day",
                },
              }}
              render={({ field: { onChange, value } }) => (
                <ReactDatePickerStart
                  onChange={onChange}
                  value={value}
                  meetupCreationStore={meetupCreationStore}
                />
              )}
            />
          </div>
          <div className="date-finish">
            <label>
              <FormattedMessage id="additional-page-end-label" />
            </label>
            <Controller
              control={control}
              name="finish"
              render={({ field: { onChange, value } }) => (
                <ReactDatePickerFinish
                  onChange={onChange}
                  value={value}
                  meetupCreationStore={meetupCreationStore}
                />
              )}
            />
          </div>
        </div>
        <span
          className={classNames("errors", {
            hidden: !errors.start,
          })}
        >
          <FontAwesomeIcon
            className="dropdown-icons"
            icon={faExclamationTriangle}
          />
          <span className={"errors-text"}>{errors?.start?.message}</span>
        </span>
        <label>
          <FormattedMessage id="additional-page-place-label" />
        </label>
        <input
          data-cy="meetup-edit-place"
          className="place-input"
          defaultValue={meetupCreationStore.place}
          {...register("place")}
        />
        <label>
          <FormattedMessage id="meetup-page-speakers" />
        </label>
        <Controller
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
              styles={reactSelect}
              theme={reactSelectThemes}
              className="required-page-speakers"
              classNamePrefix="required-page-speakers"
              isMulti
              onChange={onChange}
              options={meetupCreationStore.usersOption}
              defaultValue={meetupCreationStore.selectedUsersOption}
            />
          )}
        />

        <span
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
          data-cy="meetup-edit-excerpt"
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
          })}
        />
        <span
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
      </div>
      <div className="meetup-page-edit-buttons">
        <button onClick={() => navigate("/")} className="meetup-page-cancel">
          <FormattedMessage id="meetup-edit-button-cancel" />
        </button>
        <div>
          <button
            className="meetup-page-preview"
            onClick={handleSubmit(preview)}
          >
            <FormattedMessage id="meetup-edit-button-preview" />
          </button>
          <button
            data-cy="meetup-edit-save"
            onClick={handleSubmit(onSubmit)}
            className="meetup-page-save"
          >
            <FormattedMessage id="meetup-edit-button-save" />
          </button>
        </div>
      </div>
    </div>
  );
});

export default MeetupEditing;
