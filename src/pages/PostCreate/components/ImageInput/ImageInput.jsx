import React, {useMemo} from 'react';
import {useFormContext} from 'react-hook-form';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

const IMAGE_INPUT_NAME = 'image';
const IMAGE_MAX_SIZE = 5 * 1000000; // 5 MB

const Image = styled.div`
  width: 200px;
  height: 200px;
  background-image: url(${(props) => props.image});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const ImageInput = () => {
  const {errors, register, watch, setValue} = useFormContext();
  const watchImage = watch('image', false);

  const imageURL = useMemo(
    () => watchImage?.[0] && URL.createObjectURL(watchImage[0]),
    [watchImage],
  );

  return (
    <FormControl error={IMAGE_INPUT_NAME in errors} margin="normal">
      <FormLabel component="legend">Imagen de la publicacion</FormLabel>
      <input
        name={IMAGE_INPUT_NAME}
        accept="image/*"
        id="contained-button-file"
        type="file"
        hidden
        ref={register}
      />
      <label htmlFor="contained-button-file">
        <Button
          variant="contained"
          color="primary"
          component="span"
          disableRipple
        >
          Cargar imagen
        </Button>
      </label>
      {errors[IMAGE_INPUT_NAME] && (
        <FormHelperText>{errors[IMAGE_INPUT_NAME].message}</FormHelperText>
      )}
      {imageURL && (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setValue('image', null)}
            disableRipple
          >
            Eliminar imagen
          </Button>
          <Image image={imageURL} alt="Imagen de la publicacion" />
        </>
      )}
    </FormControl>
  );
};

export default ImageInput;
