import React from 'react';
import {useForm, FormProvider} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';

import {useFormContext} from '../../utils/PostContext';

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${({theme}) => theme.spacing(3)}px;
`;

const Step = (props) => {
  const {
    schema,
    children,
    activeStep,
    handleBack,
    handleNext,
    stepsLength,
    stepIndex,
  } = props;
  const methods = useForm({resolver: yupResolver(schema)});
  const [formValues, setFormValues] = useFormContext();
  const isLastStep = stepIndex === stepsLength - 1;
  const finishedSteps = stepIndex === stepsLength;

  const onSubmit = (data) => {
    setFormValues({...formValues, ...data});
    handleNext();
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        noValidate
        autoComplete="off"
      >
        {children}
        {!finishedSteps && (
          <ButtonsContainer>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              disableRipple
            >
              Anterior
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disableRipple
            >
              {isLastStep ? 'Crear' : 'Siguiente'}
            </Button>
          </ButtonsContainer>
        )}
      </form>
    </FormProvider>
  );
};

export default Step;
