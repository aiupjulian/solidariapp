/* fields:
  - categoria: 'salud' | 'donaciones' | 'desaparecidos' | 'mascotas'
  - titulo: string(20)
  - descripcion: string(300)
  - ciudad: string(100)
  - imagen?: file
  - fecha?: date (dia o rango - si no pone fecha, hay que poner una igual de aca a dos meses)
*/
import React, {useEffect} from 'react';
import styled from 'styled-components';

import Typography from '@material-ui/core/Typography';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Box from '@material-ui/core/Box';

import {
  firstStepSchema,
  secondStepSchema,
  thirdStepSchema,
} from '../utils/validation';
import StepContainer from './Steps/StepContainer';
import FirstStep from './Steps/FirstStep';
import SecondStep from './Steps/SecondStep';
import ThirdStep from './Steps/ThirdStep';
import {useFormContext} from '../PostContext';

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
  {StepContent: () => <div>Creando publicacion...</div>, schema: {}},
];

const PostCreate = ({onSubmit}) => {
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
        Crear publicación
      </Typography>
      <StyledStepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => {
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </StyledStepper>
      <StyledBox>
        {stepsContent.map(({StepContent, schema}, index) => (
          <div key={index} hidden={activeStep !== index}>
            <StepContainer
              activeStep={activeStep}
              handleNext={handleNext}
              handleBack={handleBack}
              stepsLength={steps.length}
              stepIndex={index}
              schema={schema}
            >
              <StepContent />
            </StepContainer>
          </div>
        ))}
      </StyledBox>
    </>
  );
};

export default PostCreate;
