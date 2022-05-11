import React, { useContext, useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { MeetupCreationContext } from "../../MeetupCreationContext";
import { DateTime } from "luxon";
import Image from "./Image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import { useIntl, FormattedMessage } from "react-intl";
import DropzoneComponent from "components/DropZone";
import ReactDatePickerStart from "components/DatePickers/ReactDatePickerStart";
import "react-datepicker/dist/react-datepicker.css";
import "./style.scss";
import ReactDatePickerFinish from "components/DatePickers/ReactDatePickerFinish";

type Props = {};
export type AdditionalValues = {
  start: Date;
  finish: Date;
  place?: string;
  imageFile?: Blob;
};
const AdditionalStep: React.FC<Props> = observer(() => {
  const meetupCreationStore = useContext(MeetupCreationContext);
  const intl = useIntl();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<AdditionalValues>({
    defaultValues: {
      start:
        (meetupCreationStore.start &&
          DateTime.fromISO(meetupCreationStore.start).toJSDate()) ||
        undefined,
      finish:
        (meetupCreationStore.start &&
          DateTime.fromISO(meetupCreationStore.start).toJSDate()) ||
        undefined,
      place: meetupCreationStore.place,
    },
  });

  const onSubmit: SubmitHandler<AdditionalValues> = (data) => {
    meetupCreationStore.setAdditionalValues(data as AdditionalValues);
  };

  const resetImg = () => {
    setValue("imageFile", undefined);
    meetupCreationStore.resetImage();
  };
  useEffect(() => {
    if (meetupCreationStore.isReqFilled) {
      navigate("/meetups/creation/required");
    }
  }, [meetupCreationStore.isReqFilled]);
  useEffect(() => {
    if (meetupCreationStore.isCreated) {
      navigate(`/meetups/meetup/${meetupCreationStore.id}`);
    }
  }, [meetupCreationStore.isCreated]);
  const onDrop = (img: Blob[] | undefined) => {
    if (img && img.length) {
      meetupCreationStore.setImage(img[0]);

      return img[0];
    }
  };

  return (
    <>
      <div>
        <div className="creation-page-additional-form">
          <div className="creation-page-dates">
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
                      intl.formatMessage({
                        id: "meetup-start-err-valid",
                      }),
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <div data-cy="date-picker-start">
                    <ReactDatePickerStart
                      onChange={onChange}
                      value={value}
                      meetupCreationStore={meetupCreationStore}
                    />
                  </div>
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
                  <div data-cy="date-picker-finish">
                    <ReactDatePickerFinish
                      onChange={onChange}
                      value={value}
                      meetupCreationStore={meetupCreationStore}
                    />
                  </div>
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
            data-cy="creation-place"
            className="place-input"
            type="text"
            {...register("place")}
          />
          {!meetupCreationStore.imageFile ? (
            <Controller
              control={control}
              name="imageFile"
              render={({ field: { onChange } }) => (
                <DropzoneComponent onDrop={onDrop} onChange={onChange} />
              )}
            />
          ) : (
            <>
              <label className="downloaded-image-label">
                <FormattedMessage id="additional-page-image-label" />
              </label>
              <Image
                setValue={resetImg}
                img={meetupCreationStore.imageFile as File}
              />
            </>
          )}
        </div>
      </div>
      <div className="creation-page-buttons">
        <button
          onClick={() => navigate("/meetups/creation/required")}
          className="creation-page-back"
        >
          <FormattedMessage id="creation-page-additional-back" />
        </button>
        <button
          data-cy="creation-create"
          className="creation-page-next"
          onClick={handleSubmit(onSubmit)}
        >
          <FormattedMessage id="creation-page-additional-create" />
        </button>
      </div>
    </>
  );
});

export default AdditionalStep;
