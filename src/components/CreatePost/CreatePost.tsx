import { Button, Form, Input } from "antd";
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./CreatePost.css";
import { useCreatePostMutation } from "../../tkqstore/services/postApi";
import { withErrorBoundary } from "react-error-boundary";
import { Fallback } from "../Fallback";

interface Values {
  title: string;
  body: string;
  url: string;
  rate: number;
}
function CreatePost() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [createPost] = useCreatePostMutation();
  const formSend = (values: Values) => {
    createPost({
      title: values.title,
      body: values.body,
      url: values.url,
      rate: values.rate,
    });
    navigate("/posts");
  };
  return (
    <Container>
      <Form
        form={form}
        className="createPostForm"
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
              max: 50,
              message: "Максимальное число символов 50!",
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
              max: 100,
              message: "Максимальное число символов 100!",
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
              pattern: new RegExp(/^(http|https):/),
              message: "Адрес должен начинаться с http: или https:",
            },
          ]}
          label="Изображение"
          name="url"
        >
          <Input name="url" />
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
export default withErrorBoundary(CreatePost, {
  FallbackComponent: Fallback,
});
