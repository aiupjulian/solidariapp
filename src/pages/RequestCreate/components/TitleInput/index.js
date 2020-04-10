import React, { useState } from "react";
import { Form } from "react-bulma-components";

const { Field, Label, Control, Input } = Form;

const TitleInput = () => {
  const [title, setTitle] = useState("");
  return (
    <Field>
      <Label>Titulo</Label>
      <Control>
        <Input
          name="title"
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
        />
      </Control>
    </Field>
  );
};

export default TitleInput;
