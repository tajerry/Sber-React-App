import { Button, Form, Input } from "antd";
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { withErrorBoundary } from "react-error-boundary";
import { Fallback } from "../Fallback";
import { useUserContext } from "../../hooks/useUserContext";
interface Data {
  name: string;
  email: string;
  isAuth: boolean;
}
function CreateUser() {
  const navigate = useNavigate();
  const { user, setUser } = useUserContext();
  const formSend = (data: Data) => {
    setUser({
      name: user.name,
      email: data.email,
      isAuth: true,
    });
    navigate("/user");
  };
  return (
    <Container>
      <Form className="createPostForm" onFinish={(value) => formSend(value)}>
        <Form.Item label="Email" name="email">
          <Input required={true} name="email" />
        </Form.Item>
        <Button htmlType="submit">Отправить</Button>
      </Form>
    </Container>
  );
}

export default withErrorBoundary(CreateUser, {
  FallbackComponent: Fallback,
});
