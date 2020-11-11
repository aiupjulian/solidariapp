import React from 'react';
// import {Form} from 'react-bulma-components';
import {useFormContext} from 'react-hook-form';

// const {Field, Label, Control, Help} = Form;

const InputContainer = ({render, label, name, controlClassName = ''}) => {
  const {errors} = useFormContext();
  let error = '';
  let controlClassNames = controlClassName;
  if (Array.isArray(name)) {
    let errorArray = [];
    Object.keys(errors)
      .filter((errorField) => name.includes(errorField))
      .forEach((errorField) => {
        const message = errors[errorField].message;
        controlClassNames = controlClassNames.concat(
          ` InputContainerError-${errorField}`,
        );
        if (!errorArray.includes(message)) errorArray.push(message);
      });
    error = errorArray.join(' ');
  } else {
    error = errors[name]?.message;
    if (error)
      controlClassNames = controlClassNames.concat(
        `InputContainerError-${name}`,
      );
  }
  const color = error ? 'danger' : null;
  return (
    // <Field>
    //   <Label>{label}</Label>
    //   <Control className={controlClassNames}>{render({color, name})}</Control>
    //   {error && <Help color={color}>{error}</Help>}
    // </Field>
    <a>asd</a>
  );
};

export default InputContainer;
