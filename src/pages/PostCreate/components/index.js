/* fields:
  - titulo: string(20)
  - descripcion: string(300)
  - ciudad: string(100)
  - imagen?: file
  - categoria: 'salud' | 'donaciones' | 'desaparecidos' | 'mascotas'
  - fecha?: date (dia o rango - si no pone fecha, hay que poner una igual de aca a dos meses)
*/
import React from "react";
import { Button, Form, Heading } from "react-bulma-components";

import { TextareaInput, TextInput } from "../../../components";
import CategoryInput from "./CategoryInput";
import CityInput from "./CityInput";
import DateInput from "./DateInput";
import ImageInput from "./ImageInput";
import InputContainer from "./InputContainer";

const { Field, Control } = Form;

const PostCreate = ({ errors }) => (
  <>
    <Heading className="PostCreateTitle">Crear publicacion</Heading>
    <InputContainer
      label="Titulo"
      name="title"
      error={errors.title}
      render={(props) => <TextInput {...props} />}
    />
    <DateInput />
    <CategoryInput />
    <InputContainer
      label="Descripción"
      name="description"
      error={errors.description}
      render={(props) => <TextareaInput {...props} maxLength={100} />}
    />
    <CityInput />
    <ImageInput />
    <Field>
      <Control>
        <Button submit>Crear</Button>
      </Control>
    </Field>
  </>
);

export default PostCreate;
