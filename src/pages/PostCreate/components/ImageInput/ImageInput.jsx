import React from 'react';
import {useFormContext} from 'react-hook-form';
import styled, {css} from 'styled-components';

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

import noImage from '../../../../assets/icons/no-image.svg';

const IMAGE_INPUT_NAME = 'image';
// const IMAGE_MAX_SIZE = 5 * 1000000; // 5 MB

const StyledFormControl = styled(FormControl)`
  ${({theme}) => theme.breakpoints.down('xs')} {
    width: 100%;
  }
`;

const InputContent = styled.div`
  display: flex;
  ${({theme}) => theme.breakpoints.down('xs')} {
    width: 100%;
    flex-direction: column;
    align-items: center;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  margin-right: ${({theme}) => theme.spacing(6)}px;
  > label {
    width: 100%;
    margin-bottom: ${({theme}) => theme.spacing(2)}px;
    text-align: center;
    > span {
      width: 100%;
    }
  }
  ${({theme}) => theme.breakpoints.down('xs')} {
    margin-right: 0;
    align-items: center;
    > label {
      margin-top: ${({theme}) => theme.spacing(2)}px;
    }
  }
`;

const Image = styled.div`
  width: 200px;
  height: 200px;
  background-image: url(${(props) => props.image});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  ${({theme}) => theme.breakpoints.down('xs')} {
    margin-top: ${({theme}) => theme.spacing(2)}px;
  }
  ${(props) =>
    props.noImage &&
    css`
      opacity: 0.2;
    `}
`;

const ImageInput = () => {
  const {errors, register, watch, setValue} = useFormContext();
  const watchImage = watch('image', false);

  const imageURL = watchImage?.[0] && URL.createObjectURL(watchImage[0]);

  return (
    <StyledFormControl error={IMAGE_INPUT_NAME in errors} margin="normal">
      <FormLabel component="legend">Imagen de la publicacion</FormLabel>
      <InputContent>
        <ButtonsContainer>
          <input
            name={IMAGE_INPUT_NAME}
            accept="image/*"
            id="button-file"
            type="file"
            hidden
            ref={register}
          />
          <label htmlFor="button-file">
            <Button
              variant="outlined"
              color="primary"
              component="span"
              disableRipple
            >
              Cargar imagen
            </Button>
          </label>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setValue('image', null)}
            disableRipple
            disabled={!imageURL}
          >
            Eliminar imagen
          </Button>
          {errors[IMAGE_INPUT_NAME] && (
            <FormHelperText>{errors[IMAGE_INPUT_NAME].message}</FormHelperText>
          )}
        </ButtonsContainer>
        <Image
          noImage={!imageURL}
          image={imageURL || noImage}
          alt="Imagen de la publicacion"
        />
      </InputContent>
    </StyledFormControl>
  );
};

export default ImageInput;
