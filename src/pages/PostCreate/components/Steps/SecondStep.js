import React from 'react';
import {Controller, useFormContext} from 'react-hook-form';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import OutlinedInput from '@material-ui/core/OutlinedInput';

const TITLE_INPUT_NAME = 'title';
const DESCRIPTION_INPUT_NAME = 'description';

const SecondStep = () => {
  const {errors} = useFormContext();

  return (
    <>
      <FormControl
        error={TITLE_INPUT_NAME in errors}
        fullWidth
        variant="outlined"
        margin="normal"
      >
        <InputLabel htmlFor={TITLE_INPUT_NAME}>Título</InputLabel>
        <Controller
          as={OutlinedInput}
          defaultValue=""
          name={TITLE_INPUT_NAME}
          id={TITLE_INPUT_NAME}
          aria-describedby="title-helper"
          label="Título"
        />
        {errors[TITLE_INPUT_NAME] && (
          <FormHelperText id="title-helper">
            {errors[TITLE_INPUT_NAME].message}
          </FormHelperText>
        )}
      </FormControl>
      <FormControl
        error={DESCRIPTION_INPUT_NAME in errors}
        fullWidth
        variant="outlined"
        margin="normal"
      >
        <InputLabel htmlFor={DESCRIPTION_INPUT_NAME}>Descripción</InputLabel>
        <Controller
          as={OutlinedInput}
          defaultValue=""
          name={DESCRIPTION_INPUT_NAME}
          id={DESCRIPTION_INPUT_NAME}
          aria-describedby="description-helper"
          multiline
          rows={3}
          label="Descripción"
        />
        {errors[DESCRIPTION_INPUT_NAME] && (
          <FormHelperText id="description-helper">
            {errors[DESCRIPTION_INPUT_NAME].message}
          </FormHelperText>
        )}
      </FormControl>
    </>
  );
};

export default SecondStep;
