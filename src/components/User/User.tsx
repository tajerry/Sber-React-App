import { useGetUserQuery } from "../../tkqstore/services/userApi";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../hooks/useUserContext";

function User():JSX.Element | undefined {
  const { user, setUser } = useUserContext();
  const { data: userQuery } = useGetUserQuery(user);
  const navigate = useNavigate();
  let name:string = "";
  if (userQuery) {
    name = userQuery.name;
    return <h2>Hello, {name}</h2>;
  }
  if (userQuery === null) {
    setUser({
      name: user.name,
      email: user.email,
      isAuth: false,
    });
    navigate(-1);
  }
}
export default User;
