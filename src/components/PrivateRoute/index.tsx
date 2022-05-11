import React from "react";
import { Navigate } from "react-router-dom";

type Props = {
  isValid: boolean;
  path: string;
  children: JSX.Element;
};

function PrivateOutlet({ isValid, path, children }: Props) {
  return isValid ? children : <Navigate to={path} />;
}
export default PrivateOutlet;
