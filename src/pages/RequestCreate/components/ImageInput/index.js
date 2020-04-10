import React from "react";
import { Form } from "react-bulma-components";

const { Field, Label, InputFile } = Form;

const ImageInput = () => {
  return (
    <Field>
      <Label>Imagen</Label>
      <InputFile />
    </Field>
  );
};

export default ImageInput;
