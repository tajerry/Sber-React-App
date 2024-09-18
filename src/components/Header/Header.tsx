// Header.jsx
import React from "react";
import { Header as AntdHeader } from "antd/es/layout/layout";
import "./Header.css";
import { Link } from "react-router-dom";
import { useGetUserQuery } from "../../tkqstore/services/userApi";
import { withErrorBoundary } from "react-error-boundary";
import { Fallback } from "../Fallback";
import { useUserContext } from "../../hooks/useUserContext";
function Header() {
  const { user, setUser } = useUserContext();
  const { data: headerUser } = useGetUserQuery(user);
  let name: string = "";
  if (headerUser) {
    name = headerUser.name;
  }
  return (
    <AntdHeader className="header">
      <Link className="logo" to="/">
        <img
          src="https://s3.amazonaws.com/media-p.slid.es/uploads/471071/images/8695882/pasted-from-clipboard.png"
          width={80}
          height={30}
          alt={"logo"}
        />
      </Link>
      <div className="auth">
        {!user.isAuth && (
          <div className="auth">
            <Link to="/logIn">Войти</Link>
            <Link to="/registration">Регистрация</Link>
          </div>
        )}
        {user.isAuth && (
          <div className="auth">
            <Link to="/user">{name}</Link>
            <Link
              to="/login"
              onClick={() => {
                setUser({
                  name: headerUser.name,
                  email: headerUser.email,
                  isAuth: false,
                });
              }}
            >
              Выйти
            </Link>
          </div>
        )}
      </div>
    </AntdHeader>
  );
}

export default withErrorBoundary(Header, {
  FallbackComponent: Fallback,
});
