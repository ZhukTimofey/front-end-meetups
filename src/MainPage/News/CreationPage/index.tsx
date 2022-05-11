import React, { useContext, useEffect } from "react";
import "./style.scss";
import { observer, useLocalObservable } from "mobx-react-lite";
import { NewsCreationStore } from "../NewsCreationStore";
import { NotificationContext } from "../../Notifications/NotificationContext";
import { FormattedMessage, useIntl } from "react-intl";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import DropzoneComponent from "../../../components/DropZone";
import Image from "../../Meetups/CreationPage/Additional/Image";
import { UserContext } from "../../ModalLogin/UserContext";
import { useNavigate } from "react-router-dom";

type Props = {};

export type Form = { title: string; text: string; imageFile?: Blob };

const CreationPage: React.FC<Props> = observer(() => {
  const notifications = useContext(NotificationContext);
  const newsCreationStore = useLocalObservable(
    () => new NewsCreationStore(notifications)
  );
  const navigate = useNavigate();
  const intl = useIntl();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<Form>();
  const resetImg = () => {
    setValue("imageFile", undefined);
    newsCreationStore.resetImage();
  };
  const onSubmit: SubmitHandler<Form> = (data) => {
    newsCreationStore.createNews(data.title, data.text);
  };
  const onDrop = (img: Blob[] | undefined) => {
    if (img && img.length) {
      newsCreationStore.setImage(img[0]);
      return img[0];
    }
  };
  useEffect(() => {
    if (newsCreationStore.id) {
      navigate(`/news/${newsCreationStore.id}`);
    }
  }, [newsCreationStore.id]);
  return (
    <div>
      <div className="news-creation-wrapper">
        <h2 className="news-creation-header">
          <FormattedMessage id="news-creation-header" />
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="news-creation-form">
          <label>
            <FormattedMessage id="required-page-req-name" />
          </label>
          <input
            data-cy="news-creation-title"
            {...register("title", {
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
            type="text"
          />
          <span
            className={classNames("errors", {
              hidden: !errors.title,
            })}
          >
            <FontAwesomeIcon
              className="dropdown-icons"
              icon={faExclamationTriangle}
            />
            <span className={"errors-text"}>{errors?.title?.message}</span>
          </span>
          <label>
            <FormattedMessage id="news-creation-text" />
          </label>
          <textarea
            data-cy="news-creation-text"
            {...register("text", {
              required: {
                value: true,
                message: intl.formatMessage({
                  id: "news-editing-text-req",
                }),
              },
              minLength: {
                value: 3,
                message: intl.formatMessage({
                  id: "news-editing-text-short",
                }),
              },
            })}
          />
          <span
            className={classNames("errors", {
              hidden: !errors.text,
            })}
          >
            <FontAwesomeIcon
              className="dropdown-icons"
              icon={faExclamationTriangle}
            />
            <span className={"errors-text"}>{errors?.text?.message}</span>
          </span>
          {!newsCreationStore.imageFile ? (
            <>
              <label htmlFor="">
                <FormattedMessage id="news-creation-image" />
              </label>
              <Controller
                control={control}
                name="imageFile"
                render={({ field: { onChange } }) => (
                  <DropzoneComponent onDrop={onDrop} onChange={onChange} />
                )}
              />
            </>
          ) : (
            <>
              <label className="downloaded-image-label">
                <FormattedMessage id="additional-page-image-label" />
              </label>
              <Image
                setValue={resetImg}
                img={newsCreationStore.imageFile as File}
              />
            </>
          )}
        </form>
        <div className="news-creation-buttons">
          <button
            onClick={() => {
              navigate("/news");
            }}
            className="news-creation-page-back"
          >
            <FormattedMessage id="creation-page-additional-back" />
          </button>
          <button
            data-cy="news-creation-button"
            className="news-creation-page-create"
            onClick={handleSubmit(onSubmit)}
          >
            <FormattedMessage id="creation-page-additional-create" />
          </button>
        </div>
      </div>
    </div>
  );
});

export default CreationPage;
