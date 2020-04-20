import React, { useState } from "react";
import { Form } from "react-bulma-components";

const { Input } = Form;

const TextInput = ({ color = null, name }) => {
  const [value, setValue] = useState("");
  return (
    <Input
      color={color}
      maxLength={20}
      name={name}
      value={value}
      onChange={(e) => setValue(e.currentTarget.value)}
    />
  );
};

export default TextInput;
