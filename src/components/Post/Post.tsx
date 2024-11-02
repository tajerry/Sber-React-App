import { useState } from "react";
import {Link, NavigateFunction, useNavigate, useParams} from "react-router-dom";
import Card from "../Card/Card";
import {CircularProgress, Container, Grid } from "@mui/material";
import { Form, Input, Button, Rate } from "antd";
import "./Post.css";
import {
  useEditPostMutation,
  useGetPostByIdQuery,
} from "../../tkqstore/services/postApi";
import {
  useDeleteCommentMutation,
  useGetCommentALLQuery,
} from "../../tkqstore/services/commentApi";
import { withErrorBoundary } from "react-error-boundary";
import { Fallback } from "../Fallback";

function Post() {
  const [isFormVisible, setFormVisible] = useState(false);
  const [form] = Form.useForm();
  const params = useParams();
  const id: number = params.id !== undefined ? parseInt(params.id) : 0;
  const { data: post } = useGetPostByIdQuery(id);
  const [editPost] = useEditPostMutation();
  const { data: comments, isLoading } = useGetCommentALLQuery(id);
  const [deleteComment] = useDeleteCommentMutation();
  const navigate:NavigateFunction = useNavigate();
  interface Values {
    id: number;
    title: string;
    body: string;
    rate: number;
    url: string;
  }
  interface Comment {
    id: number;
    title: string;
    body: string;
    rate: number;
  }
  const formSend = async (values: Values):Promise<void> => {
    editPost({
      id: id,
      title: values.title,
      body: values.body,
      rate: values.rate,
      url: values.url,
    });
    setFormVisible(false);
  };
  function showForm():void {
    setFormVisible(true);
  }
  function goBack():void {
    navigate(-1);
  }
  return (
    post && (
      <Container>
        {isLoading && <CircularProgress />}
        {isFormVisible && (
          <div className="modal" onClick={() => setFormVisible(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <Form form={form} onFinish={(values) => formSend(values)}>
                <Form.Item
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
                  <Input defaultValue={post.title} name="title" />
                </Form.Item>
                <Form.Item
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
                  <Input defaultValue={post.body} name="body" />
                </Form.Item>
                <Form.Item
                  rules={[
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
                  rules={[
                    {
                      pattern: new RegExp(/^[1-5]$/),
                      message: "Необходимо ввести целое число от 1 до 5!",
                    },
                  ]}
                  label="Рейтинг"
                  name="rate"
                >
                  <Input defaultValue={post.rate} name="url" />
                </Form.Item>
                <Button htmlType="submit" type="primary">
                  Сохранить
                </Button>
              </Form>
            </div>
          </div>
        )}
        <Card post={post} />
        <div className="cardButtons">
          <Button type="primary" onClick={showForm}>
            Редактировать
          </Button>
          <Button type="primary">
            <Link to={`/createComment/${id}`}>Создать комментарий</Link>
          </Button>
          <Button onClick={goBack} type="primary">
            Назад
          </Button>
        </div>
        <Grid container spacing={8} className="commentList">
          {comments?.map((comment: Comment, key: number) => (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <div className="commentList-item">
                <Rate value={comment.rate} />
                <h4>{comment.title}</h4>
                <p>{comment.body}</p>
                <Button onClick={() => deleteComment(comment.id)}>
                  Удалить комментарий
                </Button>
              </div>
            </Grid>
          ))}
        </Grid>
      </Container>
    )
  );
}
export default withErrorBoundary(Post, {
  FallbackComponent: Fallback,
});
