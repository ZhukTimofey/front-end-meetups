import React from "react";
import Dropzone from "react-dropzone";
import Cloud from "../../assets/images/Cloud.png";
import { FormattedMessage } from "react-intl";
import { dropzone } from "constants/imgFormats";

type Props = {
  onDrop: (img: Blob[] | undefined) => Blob | undefined;
  onChange: (...event: any[]) => void;
};

const DropzoneComponent: React.FC<Props> = ({ onDrop, onChange }) => {
  return (
    <Dropzone
      accept={dropzone}
      maxFiles={1}
      multiple={false}
      onDrop={(value) => {
        onDrop(value);
        onChange(value);
      }}
    >
      {({ getRootProps, getInputProps }) => (
        <section>
          <div className="dropzone-edit" {...getRootProps()}>
            <input {...getInputProps()} />

            <img src={Cloud} alt="" />
            <p className="dropzone-description">
              <FormattedMessage id="creation-page-img-text" />
              <span>
                <FormattedMessage id="creation-page-img-upload" />
              </span>
            </p>
            <p className="dropzone-rules">
              <FormattedMessage id="creation-page-formats" />
            </p>
            <p className="dropzone-rules">
              <FormattedMessage id="creation-page-size" />
            </p>
          </div>
        </section>
      )}
    </Dropzone>
  );
};

export default DropzoneComponent;
