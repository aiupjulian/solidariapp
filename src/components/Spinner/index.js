import React from "react";
import { Icon } from "react-bulma-components";

const Spinner = props => (
  <Icon size="medium" {...props}>
    <span className="fas fa-spinner fa-pulse fa-2x" />
  </Icon>
);

export default Spinner;
