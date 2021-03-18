import React, {useEffect, useState, useMemo} from 'react';
import styled from 'styled-components';
import algoliasearch from 'algoliasearch/src/browser/builds/algoliasearchLite';
import debounce from 'lodash/debounce';
import {useHistory} from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import pages from '../../';
import {FILTERS} from '../../../utils/filters';
import useQuery from '../../../hooks/useQuery';

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
  const query = useQuery();
  const selectedCity = query.get(FILTERS.CITY);
  const history = useHistory();
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedCity) {
      client.getObject(selectedCity, (_, city) => {
        city.locale_names = city.locale_names.default;
        setValue(city);
      });
    }
  }, [selectedCity]);

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
    <Autocomplete
      id="places"
      getOptionLabel={(option) => {
        return typeof option === 'string'
          ? option
          : `${option.locale_names[0]}, ${option.administrative[0]}`;
      }}
      getOptionSelected={(option, value) => option.objectID === value.objectID}
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
      onChange={(event, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
        query.delete(FILTERS.CITY);
        if (newValue) {
          query.append(FILTERS.CITY, newValue.objectID);
        }
        history.push(pages.PostList.path.concat('?', query.toString()));
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField {...params} variant="outlined" fullWidth label="Ciudad" />
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
  );
};

export default CityInput;
