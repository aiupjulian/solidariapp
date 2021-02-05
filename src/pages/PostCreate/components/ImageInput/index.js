import React from 'react';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const ImageInput = () => {
  return (
    <FormControl
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
    </FormControl>
  );
};

export default ImageInput;
