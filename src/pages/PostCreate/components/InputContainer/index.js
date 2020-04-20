import React from "react";
import { Form } from "react-bulma-components";

const { Field, Label, Control, Help } = Form;

const InputContainer = ({
  render,
  label,
  name,
  error,
  controlClassName = "",
}) => {
  const color = error ? "danger" : null;
  return (
    <Field>
      <Label>{label}</Label>
      <Control className={controlClassName}>{render({ color, name })}</Control>
      {error && <Help color={color}>{error}</Help>}
    </Field>
  );
};

export default InputContainer;
