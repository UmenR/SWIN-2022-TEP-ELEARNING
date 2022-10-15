import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { authenticationStatusSelector } from "../store/authentication/authenticationSelectors";
import { USER_AUTH_TYPE } from "../store/authentication/authenticationSlice";

function ProtectedRoute({ children }) {
  const authStatus = useSelector(authenticationStatusSelector);

  if (authStatus === USER_AUTH_TYPE.none) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default ProtectedRoute;
