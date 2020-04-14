import React, { useState } from "react";
import { Form } from "react-bulma-components";
import { DateRangePicker, SingleDatePicker } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

import "./DateInput.css";
import "./ReactDatesOverrides.css";

const { Field, Label, Control, Radio } = Form;

const today = new Date();
const todayFormatted = new Date(
  today.getTime() - today.getTimezoneOffset() * 60000
)
  .toISOString()
  .split("T")[0];

const DateRangePickerContainer = () => {
  const [startDate, setStartDate] = useState(null); //todayFormatted);
  const [endDate, setEndDate] = useState(null); //todayFormatted);
  const [focusedInput, setFocusedInput] = useState(null);
  return (
    <DateRangePicker
      verticalSpacing={2}
      hideKeyboardShortcutsPanel
      numberOfMonths={1}
      startDate={startDate} // momentPropTypes.momentObj or null,
      startDateId="startDate" // PropTypes.string.isRequired,
      endDate={endDate} // momentPropTypes.momentObj or null,
      endDateId="endDate" // PropTypes.string.isRequired,
      onDatesChange={({ startDate, endDate }) => {
        setStartDate(startDate);
        setEndDate(endDate);
      }} // PropTypes.func.isRequired,
      focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
      onFocusChange={focusedInput => setFocusedInput(focusedInput)} // PropTypes.func.isRequired,
    />
  );
};

const SingleDatePickerContainer = () => {
  const [date, setDate] = useState(null); //todayFormatted);
  const [focused, setFocused] = useState(false);
  return (
    <SingleDatePicker
      verticalSpacing={2}
      hideKeyboardShortcutsPanel
      numberOfMonths={1}
      date={date} // momentPropTypes.momentObj or null
      onDateChange={date => setDate(date)} // PropTypes.func.isRequired
      focused={focused} // PropTypes.bool
      onFocusChange={({ focused }) => setFocused(focused)} // PropTypes.func.isRequired
      id="date" // PropTypes.string.isRequired,
    />
  );
};

const inputTypes = {
  noInput: { text: "Sin fecha" },
  singleDate: { text: "Dia particular", Component: SingleDatePickerContainer },
  rangeDate: { text: "Rango de fechas", Component: DateRangePickerContainer }
};

const DateInput = () => {
  const [selectedInputType, setSelectedInputType] = useState(
    Object.keys(inputTypes)[0]
  );
  const { Component = null } = inputTypes[selectedInputType];
  return (
    <Field>
      <Label>Fecha</Label>
      <Control className="CategoriesRadiosContainer">
        {Object.entries(inputTypes).map(([inputType, inputData]) => (
          <Radio
            key={inputType}
            className="CategoryRadio"
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
