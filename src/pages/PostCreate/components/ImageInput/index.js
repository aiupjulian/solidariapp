import React, {useState} from 'react';
import {Controller, useFormContext} from 'react-hook-form';
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
  const {errors} = useFormContext();
  const [image, setImage] = useState();

  const handleImageChange = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <FormControl error={IMAGE_INPUT_NAME in errors} margin="normal">
      <FormLabel component="legend">Imagen de la publicacion</FormLabel>
      <Controller
        defaultValue={null}
        name={IMAGE_INPUT_NAME}
        render={() => (
          <>
            <input
              accept="image/*"
              id="contained-button-file"
              type="file"
              hidden
              onChange={handleImageChange}
            />
            <label htmlFor="contained-button-file">
              <Button variant="contained" color="primary" component="span">
                Cargar imagen
              </Button>
            </label>
          </>
        )}
      />
      {errors[IMAGE_INPUT_NAME] && (
        <FormHelperText>{errors[IMAGE_INPUT_NAME].message}</FormHelperText>
      )}
      {image && (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setImage(null)}
          >
            Eliminar imagen
          </Button>
          <Image image={image} alt="Imagen de la publicacion" />
        </>
      )}
    </FormControl>
  );
};

export default ImageInput;
