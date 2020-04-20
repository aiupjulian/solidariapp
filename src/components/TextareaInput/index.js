import React, { useState } from "react";
import { Form } from "react-bulma-components";

const { Textarea } = Form;

const TextareaInput = ({ color = null, name }) => {
  const [value, setValue] = useState("");
  return (
    <Textarea
      color={color}
      maxLength={100}
      name={name}
      value={value}
      onChange={(e) => setValue(e.currentTarget.value)}
    />
  );
};

export default TextareaInput;
