import React from "react";
import Notfound from "../assets/404.svg";

const NotFound = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${Notfound})`,
        height: "100vh",
        width: "100%",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    ></div>
  );
};

export default NotFound;
