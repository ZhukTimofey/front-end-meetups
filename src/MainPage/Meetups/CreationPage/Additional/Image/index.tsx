import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import fakeImg from "assets/images/fakeImg.png";
import { toKilobyte } from "constants/data";
import "./style.scss";

type Props = {
  setValue: () => void;
  img: File;
};

const Image: React.FC<Props> = ({ img, setValue }) => {
  return (
    <div className="uploaded-image">
      <img src={fakeImg} alt="" />
      <div>
        <p>{img.name}</p>
        <p>{`File size: ${Math.round(img.size / toKilobyte)} KB`}</p>
      </div>
      <FontAwesomeIcon onClick={setValue} icon={faTimes} />
    </div>
  );
};

export default Image;
