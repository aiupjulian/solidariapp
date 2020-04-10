import React, { useState } from "react";
import { Form } from "react-bulma-components";

const { Field, Label, Control, Textarea } = Form;

const DescriptionInput = () => {
  const [description, setDescription] = useState("");
  return (
    <Field>
      <Label>Descripción</Label>
      <Control>
        <Textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.currentTarget.value)}
        />
      </Control>
    </Field>
  );
};

export default DescriptionInput;
