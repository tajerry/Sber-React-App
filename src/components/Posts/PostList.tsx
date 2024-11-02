import React, { useState } from "react";
import "./PostList.css";
import Card from "../Card/Card";
import { Button, Input, Layout } from "antd";
import { CircularProgress, Grid } from "@mui/material";
import { Content } from "antd/es/layout/layout";
import { Link } from "react-router-dom";
import UseDebounce from "../UseDebounce";
import {
  useDeletePostMutation,
  useGetPostsALLQuery,
} from "../../tkqstore/services/postApi";
import { withErrorBoundary } from "react-error-boundary";
import { Fallback } from "../Fallback";
import { useUserContext } from "../../hooks/useUserContext";

function PostList():JSX.Element {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm: string = UseDebounce(searchTerm, 2000);
  let { data: posts, isLoading } = useGetPostsALLQuery();
  const [deletePost] = useDeletePostMutation();
  const { user } = useUserContext();
  if (posts) {
    posts = posts.filter(
      (post) =>
        post.title.includes(debouncedSearchTerm) ||
        post.body.includes(debouncedSearchTerm),
    );
  }
  return (
    <Layout>
      {isLoading && <CircularProgress />}
      <Content>
        <div className="mainHeader">
          <h2>Список маршрутов:</h2>
          {user.isAuth && (
            <Button type={"primary"}>
              <Link to="/new">Создать пост</Link>
            </Button>
          )}
          <Input
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Поиск"
          />
        </div>
        <Grid container spacing={3} className="posts">
          {posts?.map((post) => (
            <Grid key={post.id} item xs={12} sm={6} md={4} lg={3}>
              <Card post={post} />
              <div className="cardButtons">
                <Button>
                  <Link to={`/posts/${post.id}`}>Подробнее</Link>
                </Button>
                <Button onClick={() => deletePost(post.id)}>
                  Удалить пост
                </Button>
              </div>
            </Grid>
          ))}
        </Grid>
      </Content>
    </Layout>
  );
}
export default withErrorBoundary(PostList, {
  FallbackComponent: Fallback,
});
