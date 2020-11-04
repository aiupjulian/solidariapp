import React, {useEffect, useState} from 'react';
import {Form} from 'react-bulma-components';
import {DateRangePicker, SingleDatePicker} from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';
import 'moment/locale/es';
import {useFormContext, Controller} from 'react-hook-form';

import './DateInput.css';
import './ReactDatesOverrides.css';
import InputContainer from '../InputContainer';

const {Field, Label, Control, Radio} = Form;

const minDate = moment().add(1, 'd');
const maxDate = moment().add(3, 'M');

const validationProps = {
  minDate,
  maxDate,
};
const sharedProps = {
  displayFormat: 'DD/MM/YYYY',
  hideKeyboardShortcutsPanel: true,
  numberOfMonths: 1,
  readOnly: true,
  verticalSpacing: 2,
};

const DateRangePickerContainer = () => {
  const {
    setValue,
    register,
    unregister,
    formState: {isSubmitted},
  } = useFormContext();
  useEffect(() => {
    register({name: 'startDate'});
    register({name: 'endDate'});
    return () => {
      unregister('startDate');
      unregister('endDate');
    };
  }, [register, unregister]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [focusedInput, setFocusedInput] = useState(null);
  return (
    <InputContainer
      name={['startDate', 'endDate']}
      render={(props) => (
        <DateRangePicker
          startDate={startDate}
          startDateId="startDate"
          endDate={endDate}
          endDateId="endDate"
          onDatesChange={({startDate, endDate}) => {
            setStartDate(startDate);
            setEndDate(endDate);
            setValue(
              'startDate',
              startDate === null ? undefined : startDate,
              isSubmitted,
            );
            setValue(
              'endDate',
              endDate === null ? undefined : endDate,
              isSubmitted,
            );
          }}
          focusedInput={focusedInput}
          onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
          startDatePlaceholderText="Fecha inicio"
          endDatePlaceholderText="Fecha fin"
          showClearDates
          {...sharedProps}
          {...validationProps}
        />
      )}
    />
  );
};

const SingleDatePickerContainer = () => {
  const {
    setValue,
    register,
    unregister,
    formState: {isSubmitted},
  } = useFormContext();
  useEffect(() => {
    register({name: 'date'});
    return () => unregister('date');
  }, [register, unregister]);
  const [date, setDate] = useState(null);
  const [focused, setFocused] = useState(false);
  return (
    <InputContainer
      name="date"
      render={(props) => (
        <SingleDatePicker
          date={date}
          id="date"
          onDateChange={(date) => {
            setDate(date);
            setValue('date', date === null ? undefined : date, isSubmitted);
          }}
          focused={focused}
          onFocusChange={({focused}) => {
            setFocused(focused);
          }}
          placeholder="Fecha"
          {...sharedProps}
          {...validationProps}
        />
      )}
    />
  );
};

const inputTypes = {
  noInput: {text: 'Sin fecha'},
  singleDate: {text: 'Dia particular', Component: SingleDatePickerContainer},
  rangeDate: {text: 'Rango de fechas', Component: DateRangePickerContainer},
};

const renderDateInput = (inputType) => {
  const {Component = null} = inputTypes[inputType];
  return Component && <Component />;
};

const DateInput = (props) => {
  const [selectedInputType, setSelectedInputType] = useState(
    Object.keys(inputTypes)[0],
  );
  return (
    <Field>
      <Label>Fecha</Label>
      <Control className="DateTypeRadiosContainer">
        {Object.entries(inputTypes).map(([inputType, inputData]) => (
          <div key={inputType} className="InputType">
            <Controller
              as={Radio}
              className="DateTypeRadio"
              name="dateInputType"
              value={inputType}
              checked={selectedInputType === inputType}
              onChange={() => {
                setSelectedInputType(inputType);
                return inputType;
              }}
              {...props}
            >
              {inputData.text}
            </Controller>
            {selectedInputType === inputType && renderDateInput(inputType)}
          </div>
        ))}
      </Control>
    </Field>
  );
};

export default DateInput;
