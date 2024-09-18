import { Button, Image } from "antd";
import { CircularProgress, Container } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useGetPhotoByIdQuery } from "../../tkqstore/services/photoApi";
import React from "react";
import { withErrorBoundary } from "react-error-boundary";
import { Fallback } from "../Fallback";

function Photo() {
  const params = useParams();
  const id: number = params.id !== undefined ? parseInt(params.id) : 0;
  const { data: item, isLoading } = useGetPhotoByIdQuery(id);
  return (
    item && (
      <Container>
        {isLoading && <CircularProgress />}
        <div className="PhotoList-item">
          <Image src={item.url} />
          <h3>ID: {item.id}</h3>
          <h4>{item.title}</h4>
        </div>
        <Button type="primary">
          <Link to={"/photos"}>Назад</Link>
        </Button>
      </Container>
    )
  );
}
export default withErrorBoundary(Photo, {
  FallbackComponent: Fallback,
});
