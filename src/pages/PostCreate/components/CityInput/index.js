import React, {useEffect, useRef, useState} from 'react';
import places from 'places.js';
import {Controller, useFormContext} from 'react-hook-form';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import OutlinedInput from '@material-ui/core/OutlinedInput';

const CITY_INPUT_NAME = 'city';

const CityInput = () => {
  const {
    setValue,
    register,
    unregister,
    triggerValidation,
    errors,
    formState: {isSubmitted},
  } = useFormContext();
  const [city, setCity] = useState('');
  const cityInputElement = useRef(null);
  const placesAutocomplete = useRef(null);

  useEffect(() => {
    register({name: 'city'});
    placesAutocomplete.current = places({
      appId: 'plN14EG00UY5',
      apiKey: '545521c135e551ef2d973e5a991311b1',
      container: cityInputElement.current,
      type: 'city',
      language: 'es',
      countries: ['AR'],
      style: false,
    });

    return () => unregister('city');
  }, []);

  useEffect(() => {
    placesAutocomplete.current.on('change', (e) => {
      setValue('city', e.suggestion.value, isSubmitted);
      setCity(e.suggestion.value);
    });
    placesAutocomplete.current.on('clear', (e) => {
      setValue('city', '', isSubmitted);
      setCity('');
    });

    return () => {
      placesAutocomplete.current.removeAllListeners('change');
      placesAutocomplete.current.removeAllListeners('clear');
    };
  }, [setValue, isSubmitted]);

  return (
    <FormControl
      error={CITY_INPUT_NAME in errors}
      fullWidth
      variant="outlined"
      margin="normal"
    >
      <InputLabel htmlFor={CITY_INPUT_NAME}>Ciudad</InputLabel>
      <Controller
        as={OutlinedInput}
        defaultValue=""
        name={CITY_INPUT_NAME}
        id={CITY_INPUT_NAME}
        aria-describedby="city-helper"
        label="Ciudad"
        onChange={(e) => {
          setCity(e.target.value);
          setValue('city', '', isSubmitted);
        }}
        onFocus={() => {
          placesAutocomplete.current.open();
        }}
        onBlur={() => {
          placesAutocomplete.current.close();
          if (isSubmitted) triggerValidation('city');
        }}
        value={city}
        inputRef={cityInputElement}
      />
      {errors[CITY_INPUT_NAME] && (
        <FormHelperText id="city-helper">
          {errors[CITY_INPUT_NAME].message}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default CityInput;
