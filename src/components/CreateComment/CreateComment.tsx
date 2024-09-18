import { Button, Form, Input } from "antd";
import { Container } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import "./CreateComment.css";
import { useCreateCommentMutation } from "../../tkqstore/services/commentApi";
import { withErrorBoundary } from "react-error-boundary";
import { Fallback } from "../Fallback";

function CreateComment() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const params = useParams();
  const id: number = params.id !== undefined ? parseInt(params.id) : 0;
  const [createComment] = useCreateCommentMutation();

  interface Values {
    postId: number;
    title: string;
    body: string;
    rate: string;
  }
  const formSend = async (values: Values) => {
    createComment({
      postId: id,
      title: values.title,
      body: values.body,
      rate: parseInt(values.rate),
    });
    navigate(`/posts/${id}`);
  };
  return (
    <Container>
      <Form
        form={form}
        className="createCommentForm"
        onFinish={(values) => formSend(values)}
      >
        <Form.Item
          className="formItem"
          rules={[
            {
              required: true,
              message: "Заполните заголовок!",
            },
            {
              max: 30,
              message: "Максимальное число символов 30!",
            },
          ]}
          label="Заголовок"
          name="title"
        >
          <Input name="title" />
        </Form.Item>
        <Form.Item
          className="formItem"
          rules={[
            {
              required: true,
              message: "Заполните описание!",
            },
            {
              max: 500,
              message: "Максимальное число символов 500!",
            },
          ]}
          label="Описание"
          name="body"
        >
          <Input name="body" />
        </Form.Item>

        <Form.Item
          className="formItem"
          rules={[
            {
              required: true,
              message: "Заполните описание!",
            },
            {
              pattern: new RegExp(/^[1-5]$/),
              message: "Необходимо ввести целое число от 1 до 5!",
            },
          ]}
          label="Рейтинг"
          name="rate"
        >
          <Input name="rate" />
        </Form.Item>
        <Button htmlType="submit">Отправить</Button>
      </Form>
    </Container>
  );
}
export default withErrorBoundary(CreateComment, {
  FallbackComponent: Fallback,
});
