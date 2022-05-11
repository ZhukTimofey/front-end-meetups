import React from "react";
import "./style.scss";

type Props = {
  name: string;
  surname: string;
};
const User: React.FC<Props> = ({ name, surname }) => {
  return (
    <div className="avatar">
      <div className="profile-avatar">
        <div className="profile-avatar-text">{`${name[0].toUpperCase()}${surname[0].toUpperCase()}`}</div>
      </div>
      <p>{`${name} ${surname}`}</p>
    </div>
  );
};

export default User;
