import React, { useEffect, forwardRef, useState, useRef } from "react";
import { Form } from "react-bulma-components";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";

import "./DateInput.css";

const { Field, Label, Control, Radio, Input } = Form;
registerLocale("es", es);
setDefaultLocale("es");

function useShareForwardedRef(forwardedRef) {
  const innerRef = useRef(null);
  useEffect(() => {
    if (!forwardedRef) {
      return;
    }
    if (typeof forwardedRef === "function") {
      forwardedRef(innerRef.current);
      return;
    } else {
      forwardedRef.current = innerRef.current;
    }
  });
  return innerRef;
}

const CustomInput = forwardRef(({ value, onClick }, ref) => {
  const innerRef = useShareForwardedRef(ref);
  console.log(innerRef);

  console.log("recibo date", value);

  return (
    <Input
      autoComplete="off"
      domRef={innerRef}
      value={value}
      onFocus={onClick}
      onChange={(e) => {
        console.log(e);
      }}
    />
  );
});

const DateRangePickerContainer = () => {
  // const [startDate, setStartDate] = useState();
  // const [endDate, setEndDate] = useState();
  // const [focusedInput, setFocusedInput] = useState(null);
  return <div>Range</div>;
};

const SingleDatePickerContainer = () => {
  let ref = useRef(null);
  console.log(ref);

  const [startDate, setStartDate] = useState(null);
  return (
    <DatePicker
      name="date"
      dateFormat="dd/MM/yyyy"
      selected={startDate}
      customInput={<CustomInput ref={ref} />}
      onSelect={(date) => setStartDate(date)}
      onChange={(date) => setStartDate(date)}
    />
  );
};

const inputTypes = {
  noInput: { text: "Sin fecha" },
  singleDate: { text: "Dia particular", Component: SingleDatePickerContainer },
  rangeDate: { text: "Rango de fechas", Component: DateRangePickerContainer },
};

const DateInput = () => {
  const [selectedInputType, setSelectedInputType] = useState(
    Object.keys(inputTypes)[0]
  );
  const { Component = null } = inputTypes[selectedInputType];
  return (
    <Field>
      <Label>Fecha</Label>
      <Control className="DateTypeRadiosContainer">
        {Object.entries(inputTypes).map(([inputType, inputData]) => (
          <Radio
            key={inputType}
            className="DateTypeRadio"
            name="dateInputType"
            value={inputType}
            checked={selectedInputType === inputType}
            onChange={() => setSelectedInputType(inputType)}
          >
            {inputData.text}
          </Radio>
        ))}
      </Control>
      <Control>{Component && <Component />}</Control>
    </Field>
  );
};

export default DateInput;
