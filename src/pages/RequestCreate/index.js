import React from "react";
import { Heading } from "react-bulma-components";

import "./RequestCreate.css";
import RequestCreate from "./components/index";

const RequestCreateContainer = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    var data = new FormData(e.currentTarget);
    console.log(data);
    for (const [name, value] of data) {
      console.log(name, value);
    }
  };
  return (
    <form className="RequestCreateContainer" onSubmit={handleSubmit}>
      <Heading className="RequestCreateTitle">Crear pedido</Heading>
      <RequestCreate />
    </form>
  );
};

export default RequestCreateContainer;
