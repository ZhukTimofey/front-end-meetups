import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Form } from "../../CreationPage";
import reset from "../../../../assets/images/Group 48.png";
import { NewsCreationStore } from "../../NewsCreationStore";
import { NotificationContext } from "../../../Notifications/NotificationContext";
import { observer, useLocalObservable } from "mobx-react-lite";
import "./style.scss";
import DropzoneComponent from "../../../../components/DropZone";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

type Props = {};

const EditingNews: React.FC<Props> = observer(() => {
  const params = useParams();
  const navigate = useNavigate();
  const notification = useContext(NotificationContext);
  const intl = useIntl();
  const editingStore = useLocalObservable(
    () => new NewsCreationStore(notification)
  );

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<Form>();

  const onSubmit: SubmitHandler<Form> = (data) => {
    editingStore.editNews(data.title, data.text, params.id as string);
    navigate(`/news/${params.id}`);
  };
  const resetImg = () => {
    setValue("imageFile", undefined);
    editingStore.resetImage();
  };
  const onDrop = (img: Blob[] | undefined) => {
    if (img && img.length) {
      editingStore.setImage(img[0]);

      return img[0];
    }
  };
  useEffect(() => {
    editingStore.initEditingStore(params.id as string);
  }, []);
  return editingStore.isInit ? (
    <div className={"news-editing-page-wrapper"}>
      <h1 className={"news-edit-header"}>
        <FormattedMessage id={"news-edit-header"} />
      </h1>
      <form className="news-editing-form" onSubmit={handleSubmit(onSubmit)}>
        <label>
          <FormattedMessage id={"meetup-edit-photo"} />
        </label>
        {!editingStore.image ? (
          <Controller
            control={control}
            name="imageFile"
            render={({ field: { onChange } }) => (
              <DropzoneComponent onDrop={onDrop} onChange={onChange} />
            )}
          />
        ) : (
          <div className="news-editing-images">
            <img className="news-edit-image" src={editingStore.image} alt="" />
            <img
              className="news-reset-image"
              src={reset}
              onClick={resetImg}
              alt=""
            />
          </div>
        )}
        <label>
          <FormattedMessage id={"news-edit-label-title"} />
        </label>
        <input
          data-cy="news-editing-title"
          defaultValue={editingStore.title}
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
          <FormattedMessage id={"news-creation-text"} />
        </label>
        <textarea
          data-cy="news-editing-text"
          defaultValue={editingStore.text}
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
      </form>
      <div className="news-edit-buttons">
        <button
          onClick={() => navigate(`/news/${params.id}`)}
          className="news-edit-buttons-back"
        >
          <FormattedMessage id={"required-page-req-back"} />
        </button>
        <button
          data-cy="news-edit-button"
          className="news-edit-buttons-edit"
          onClick={handleSubmit(onSubmit)}
        >
          <FormattedMessage id={"meetup-edit-button-save"} />
        </button>
      </div>
    </div>
  ) : (
    <div>
      <FormattedMessage id="download" />
    </div>
  );
});

export default EditingNews;
