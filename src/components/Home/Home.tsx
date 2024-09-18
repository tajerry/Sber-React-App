import React from "react";
import "./Home.css";

function Home() {
  return (
    <div className="main-content">
      <h1 className="content-header">Добро пожаловать на наш сайт!</h1>
      <video
        className={"video"}
        autoPlay
        muted
        height={"800px"}
        width={"1200px"}
        loop
      >
        <source type={"video/mp4"} src="/helicopter_over_mountains.mp4" />
      </video>
    </div>
  );
}
export default Home;
