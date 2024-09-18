import React from "react";
import { Outlet } from "react-router";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../../hooks/useUserContext";
function PrivateRoute() {
  const { user } = useUserContext();
  if (!user.isAuth) {
    return <Navigate to="/logIn" />;
  }
  return <Outlet />;
}
export default PrivateRoute;
