import React from 'react';
import {useForm, FormProvider} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${({theme}) => theme.spacing(3)}px;
`;

const StepContainer = (props) => {
  const {schema, children, activeStep, handleBack, isLastStep} = props;
  const methods = useForm({resolver: yupResolver(schema)});

  const onSubmit = (data) => {
    console.log('Submit: ', data);
    props.handleNext();
  };

  console.log('Values: ', methods.getValues());
  console.log('Errors: ', methods.errors);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        noValidate
        autoComplete="off"
      >
        {children}
        <ButtonsContainer>
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Anterior
          </Button>
          <Button variant="contained" color="primary" type="submit">
            {isLastStep ? 'Crear' : 'Siguiente'}
          </Button>
        </ButtonsContainer>
      </form>
    </FormProvider>
  );
};

export default StepContainer;
