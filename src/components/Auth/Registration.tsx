import { Button, Form, Input } from "antd";
import { Container } from "@mui/material";
import {NavigateFunction, useNavigate} from "react-router-dom";
import { useCreateUserMutation } from "../../tkqstore/services/userApi";
import { withErrorBoundary } from "react-error-boundary";
import { Fallback } from "../Fallback";

interface Data {
  name: string;
  email: string;
}
function Registration():JSX.Element {
  const navigate:NavigateFunction = useNavigate();
  const [createUser] = useCreateUserMutation();
  const formSend = (data: Data): void => {
    createUser({
      name: data.name,
      email: data.email,
    });
    navigate("/logIn");
  };
  return (
    <Container>
      <Form onFinish={(value) => formSend(value)}>
        <Form.Item label="Имя" name="name">
          <Input required={true} name="name" />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input required={true} name="email" />
        </Form.Item>
        <Button htmlType="submit">Отправить</Button>
      </Form>
    </Container>
  );
}
export default withErrorBoundary(Registration, {
  FallbackComponent: Fallback,
});
