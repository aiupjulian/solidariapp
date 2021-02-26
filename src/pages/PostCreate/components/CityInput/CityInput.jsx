import React, {useEffect, useState, useMemo} from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import styled from 'styled-components';
import algoliasearch from 'algoliasearch/src/browser/builds/algoliasearchLite';
import debounce from 'lodash/debounce';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const CITY_INPUT_NAME = 'city';

const client = algoliasearch.initPlaces(
  'plN14EG00UY5',
  '9552417a96aa49685c37a4c20846da15',
);

const getPlacePredictions = (query, callback) =>
  client
    .search({query, type: 'city', language: 'es', countries: ['ar']})
    .then((content) => callback(content.hits))
    .catch((e) => console.log(e));

const StyledLocationOnIcon = styled(LocationOnIcon)`
  color: ${({theme}) => theme.palette.text.secondary};
  margin-right: ${({theme}) => theme.spacing(2)}px;
`;

const CityInput = () => {
  const {errors, getValues} = useFormContext();
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const {[CITY_INPUT_NAME]: value} = getValues();

  const fetch = useMemo(
    () =>
      debounce((request, callback) => {
        setIsLoading(true);
        getPlacePredictions(request, callback);
      }, 800),
    [],
  );

  useEffect(() => {
    let active = true;

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch(inputValue, (results) => {
      if (active) {
        setIsLoading(false);
        setOptions(results || []);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  return (
    <Controller
      defaultValue=""
      name={CITY_INPUT_NAME}
      render={({onChange, onBlur, value}, {invalid}) => (
        <Autocomplete
          id="places"
          getOptionLabel={(option) => {
            return typeof option === 'string'
              ? option
              : `${option.locale_names[0]}, ${option.administrative[0]}`;
          }}
          getOptionSelected={(option, value) =>
            option.objectID === value.objectID
          }
          filterOptions={(x) => x}
          options={options}
          autoComplete
          includeInputInList
          filterSelectedOptions
          fullWidth
          value={value}
          loading={isLoading}
          noOptionsText="No hay opciones"
          loadingText="Cargando..."
          onBlur={onBlur}
          onChange={(event, newValue) => {
            // I have to store newValue.objectID
            // client.getObject(newValue.objectID, (city) => {
            //   console.log(city);
            // });
            setOptions(newValue ? [newValue, ...options] : options);
            onChange(newValue);
          }}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              id={CITY_INPUT_NAME}
              variant="outlined"
              fullWidth
              margin="normal"
              label="Ciudad"
              required
              error={invalid}
              helperText={
                CITY_INPUT_NAME in errors && errors[CITY_INPUT_NAME].message
              }
            />
          )}
          renderOption={(option) => (
            <Grid container alignItems="center">
              <Grid item>
                <StyledLocationOnIcon />
              </Grid>
              <Grid item xs>
                <span
                  dangerouslySetInnerHTML={{
                    __html: option._highlightResult?.locale_names[0].value.replaceAll(
                      'em>',
                      'strong>',
                    ),
                  }}
                ></span>
                <Typography variant="body2" color="textSecondary">
                  {option.administrative?.[0]}
                </Typography>
              </Grid>
            </Grid>
          )}
        />
      )}
    />
  );
};

export default CityInput;
