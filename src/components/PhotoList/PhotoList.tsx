import React, { useEffect } from "react";
import "./PhotoList.css";
import { Button, Image } from "antd";
import { CircularProgress, Container, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import {
  useDeletePhotoMutation,
  useGetPhotosALLQuery,
} from "../../tkqstore/services/photoApi";
import { withErrorBoundary } from "react-error-boundary";
import { Fallback } from "../Fallback";

function PhotoList() {
  const { data: items, isLoading } = useGetPhotosALLQuery();
  const [deletePhoto, { data: error }] = useDeletePhotoMutation();
  return (
    <div>
      {isLoading && <CircularProgress />}
      <Container>
        <div>
          <h2>Наши фотографии</h2>
        </div>
        <Grid container spacing={6} className={"photoList"}>
          {items?.map((photo) => (
            <Grid key={photo.id} item xs={12} sm={6} md={4} lg={3}>
              <div className="photoList-item">
                <Image src={photo.url} />
                <h3>ID: {photo.id}</h3>
                <h4>{photo.title}</h4>
                <Button>
                  <Link to={`/photos/${photo.id}`}>Подробнее</Link>
                </Button>
                <Button onClick={() => deletePhoto(photo.id)}>Удалить</Button>
              </div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
export default withErrorBoundary(PhotoList, {
  FallbackComponent: Fallback,
});
