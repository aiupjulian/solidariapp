import React from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import styled, {css} from 'styled-components';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import OutlinedInput from '@material-ui/core/OutlinedInput';

import {categories} from '../../../../utils/filters';

const StyledFormControl = styled(FormControl)`
  width: 100%;
  margin-top: ${({theme}) => theme.spacing(3)}px;
  margin-bottom: ${({theme}) => theme.spacing(3)}px;
`;

const StyledCard = styled(Card)`
  width: 140px;
  ${({selected}) =>
    !selected &&
    css`
      opacity: 0.3;
    `}
`;

const StyledRadioGroup = styled(RadioGroup)`
  flex-direction: row;
  justify-content: space-around;
  margin-top: ${({theme}) => theme.spacing(2)}px;
  > .MuiIconButton-root:hover {
    background-color: unset;
    box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
    border-radius: 0;
  }
  > .MuiRadio-root {
    padding: 0;
  }
`;

const CategoryCard = ({Icon, label, selected}) => (
  <StyledCard selected={selected}>
    <CardContent>
      <Icon width={70} height={70} />
      <Typography variant="subtitle1">{label}</Typography>
    </CardContent>
  </StyledCard>
);

const CATEGORY_INPUT_NAME = 'category';

const CategoryInput = () => {
  const {errors} = useFormContext();

  return (
    <StyledFormControl
      component="fieldset"
      error={CATEGORY_INPUT_NAME in errors}
      variant="outlined"
    >
      <FormLabel component="legend">Seleccioná la categoria</FormLabel>
      <Controller
        defaultValue={null}
        name={CATEGORY_INPUT_NAME}
        as={StyledRadioGroup}
      >
        {Object.values(categories).map((categoryRadio) => {
          const iconProps = {
            Icon: categoryRadio.Icon,
            label: categoryRadio.name,
          };
          return (
            <Radio
              key={categoryRadio.path}
              value={categoryRadio.path}
              disableRipple
              color="default"
              icon={<CategoryCard {...iconProps} />}
              checkedIcon={<CategoryCard selected {...iconProps} />}
            />
          );
        })}
      </Controller>
      {errors[CATEGORY_INPUT_NAME] && (
        <FormHelperText>{errors[CATEGORY_INPUT_NAME].message}</FormHelperText>
      )}
    </StyledFormControl>
  );
};

export default CategoryInput;
