// Card.jsx
import React from "react";
import "../Posts/PostList.css";
import { Card as AntdCard, Image, Rate } from "antd";
import "./Card.css";
import { withErrorBoundary } from "react-error-boundary";
import { Fallback } from "../Fallback";
const Card = (props: any) => {
  return (
    <AntdCard>
      <div className="card-item">
        <div className="card-header">
          <Rate className="card-rate" value={props.post.rate} />
        </div>
        <Image className="card-image" src={props.post.url} />
        <h3>{props.post.title}</h3>
        <p>{props.post.body}</p>
      </div>
    </AntdCard>
  );
};

export default withErrorBoundary(Card, {
  FallbackComponent: Fallback,
});
