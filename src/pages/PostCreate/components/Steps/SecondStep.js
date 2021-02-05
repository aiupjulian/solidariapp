import React from 'react';
import {Controller, useFormContext} from 'react-hook-form';

import TextField from '@material-ui/core/TextField';

const TITLE_INPUT_NAME = 'title';
const DESCRIPTION_INPUT_NAME = 'description';

const SecondStep = () => {
  const {errors} = useFormContext();

  return (
    <>
      <Controller
        render={(props, {invalid}) => (
          <TextField
            {...props}
            id={TITLE_INPUT_NAME}
            variant="outlined"
            fullWidth
            margin="normal"
            label="Título"
            required
            error={invalid}
            helperText={
              TITLE_INPUT_NAME in errors && errors[TITLE_INPUT_NAME].message
            }
          />
        )}
        defaultValue=""
        name={TITLE_INPUT_NAME}
      />
      <Controller
        render={(props, {invalid}) => (
          <TextField
            {...props}
            id={DESCRIPTION_INPUT_NAME}
            variant="outlined"
            fullWidth
            margin="normal"
            label="Descripción"
            required
            multiline
            rows={3}
            error={invalid}
            helperText={
              DESCRIPTION_INPUT_NAME in errors &&
              errors[DESCRIPTION_INPUT_NAME].message
            }
          />
        )}
        defaultValue=""
        name={DESCRIPTION_INPUT_NAME}
      />
    </>
  );
};

export default SecondStep;
