/* fields:
  - titulo: string(20)
  - descripcion: string(300)
  - ciudad: string(100)
  - imagen?: file
  - categoria: 'salud' | 'donaciones' | 'desaparecidos' | 'mascotas'
  - fecha?: date (dia o rango - si no pone fecha, hay que poner una igual de aca a dos meses)
*/
import React from "react";
import { Button, Form } from "react-bulma-components";

import CategoryInput from "./CategoryInput";
import CityInput from "./CityInput";
import DateInput from "./DateInput";
import DescriptionInput from "./DescriptionInput";
import ImageInput from "./ImageInput";
import TitleInput from "./TitleInput";

const { Field, Control } = Form;

const PostCreate = () => {
  return (
    <>
      <TitleInput />
      <DateInput />
      <CategoryInput />
      <DescriptionInput />
      <CityInput />
      <ImageInput />
      <Field>
        <Control>
          <Button submit>Crear</Button>
        </Control>
      </Field>
    </>
  );
};

export default PostCreate;
