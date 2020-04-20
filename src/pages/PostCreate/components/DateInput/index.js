import React, { useState } from "react";
import { Form } from "react-bulma-components";
import { DateRangePicker, SingleDatePicker } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import moment from "moment";
import "moment/locale/es";

import "./DateInput.css";
import "./ReactDatesOverrides.css";

const { Field, Label, Control, Radio } = Form;

const minDate = moment().add(1, "d");
const maxDate = moment().add(3, "M");

const validationProps = {
  minDate,
  maxDate,
};
const sharedProps = {
  displayFormat: "DD/MM/YYYY",
  hideKeyboardShortcutsPanel: true,
  numberOfMonths: 1,
  readOnly: true,
  verticalSpacing: 2,
};

const DateRangePickerContainer = () => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [focusedInput, setFocusedInput] = useState(null);
  return (
    <DateRangePicker
      startDate={startDate}
      startDateId="startDate"
      endDate={endDate}
      endDateId="endDate"
      onDatesChange={({ startDate, endDate }) => {
        setStartDate(startDate);
        setEndDate(endDate);
      }}
      focusedInput={focusedInput}
      onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
      startDatePlaceholderText="Fecha inicio"
      endDatePlaceholderText="Fecha fin"
      {...sharedProps}
      {...validationProps}
    />
  );
};

const SingleDatePickerContainer = () => {
  const [date, setDate] = useState(null);
  const [focused, setFocused] = useState(false);
  return (
    <SingleDatePicker
      date={date}
      id="date"
      onDateChange={(date) => setDate(date)}
      focused={focused}
      onFocusChange={({ focused }) => setFocused(focused)}
      placeholder="Fecha"
      {...sharedProps}
      {...validationProps}
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
