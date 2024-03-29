import React, {useEffect} from 'react';
import styled from 'styled-components';

import Typography from '@material-ui/core/Typography';
import Stepper from '@material-ui/core/Stepper';
import MaterialStep from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Box from '@material-ui/core/Box';

import {
  firstStepSchema,
  secondStepSchema,
  thirdStepSchema,
} from '../../utils/validation';
import Step from '../Steps/Step';
import FirstStep from '../Steps/FirstStep';
import SecondStep from '../Steps/SecondStep';
import ThirdStep from '../Steps/ThirdStep';
import LastStep from '../Steps/LastStep';
import {useFormContext} from '../../utils/PostContext';
import {FILTERS} from '../../../../utils/filters';
import useQuery from '../../../../hooks/useQuery';

const StyledStepper = styled(Stepper)`
  ${({theme}) => theme.breakpoints.down('sm')} {
    padding-left: 0;
    padding-right: 0;
  }
`;

const StyledBox = styled(Box)`
  ${({theme}) => theme.breakpoints.up('sm')} {
    width: 75%;
    margin: 0 auto;
  }
`;

const steps = ['Categoría', 'Descripción', 'Información adicional'];

const stepsContent = [
  {StepContent: FirstStep, schema: firstStepSchema},
  {StepContent: SecondStep, schema: secondStepSchema},
  {StepContent: ThirdStep, schema: thirdStepSchema},
  {StepContent: LastStep, schema: {}},
];

const PostForm = ({onSubmit, postDefaultValues}) => {
  const query = useQuery();
  const postId = query.get(FILTERS.ID);
  const [activeStep, setActiveStep] = React.useState(0);
  const [formValues] = useFormContext();

  const handleNext = () => setActiveStep(activeStep + 1);
  const handleBack = () => setActiveStep(activeStep - 1);

  useEffect(() => {
    if (activeStep === steps.length) {
      onSubmit(formValues);
    }
  }, [activeStep, onSubmit, formValues]);

  return (
    <>
      <Typography variant="h4" align="center">
        {postId ? 'Editar' : 'Crear'} publicación
      </Typography>
      <StyledStepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => {
          return (
            <MaterialStep key={label}>
              <StepLabel>{label}</StepLabel>
            </MaterialStep>
          );
        })}
      </StyledStepper>
      <StyledBox>
        {stepsContent.map(({StepContent, schema}, index) => (
          <div key={index} hidden={activeStep !== index}>
            <Step
              activeStep={activeStep}
              handleNext={handleNext}
              handleBack={handleBack}
              stepsLength={steps.length}
              stepIndex={index}
              schema={schema}
              postDefaultValues={postDefaultValues}
            >
              <StepContent />
            </Step>
          </div>
        ))}
      </StyledBox>
    </>
  );
};

export default PostForm;
