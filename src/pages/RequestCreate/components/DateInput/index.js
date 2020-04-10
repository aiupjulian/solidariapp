import React, { useState } from "react";
import { Form } from "react-bulma-components";

const { Field, Label, Control, Input } = Form;

const today = new Date();
const todayFormatted = new Date(
  today.getTime() - today.getTimezoneOffset() * 60000
)
  .toISOString()
  .split("T")[0];

const TitleInput = () => {
  const [date, setDate] = useState(todayFormatted);
  return (
    <Field>
      <Label>Fecha</Label>
      <Control>
        <Input
          name="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.currentTarget.value)}
        />
      </Control>
    </Field>
  );
};

export default TitleInput;
