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
import { Controller } from "react-hook-form";

import CategoryInput from "./CategoryInput";
import CityInput from "./CityInput";
import DateInput from "./DateInput";
import ImageInput from "./ImageInput";
import InputContainer from "./InputContainer";

const { Field, Control, Input, Textarea } = Form;

//https://codelabs.developers.google.com/codelabs/firebase-web/?authuser=0#11
const PostCreate = () => {
  return (
    <>
      <h1>Poner un stepper, primero elegir categoria</h1>
      <p>
        No tiene sentido elegir fecha/rango de fechas para mascotas por ejemplo,
        pero si para donaciones
      </p>
      <Heading className="PostCreateTitle">Crear publicación</Heading>
      <InputContainer
        label="Titulo"
        name="title"
        render={(props) => (
          <Controller
            as={Input}
            autoComplete="off"
            defaultValue=""
            maxLength={50}
            {...props}
          />
        )}
      />
      <DateInput />
      <InputContainer
        label="Categoría"
        name="category"
        controlClassName="CategoriesRadiosContainer"
        render={(props) => <CategoryInput {...props} />}
      />
      <InputContainer
        label="Descripción"
        name="description"
        render={(props) => (
          <Controller
            autoComplete="off"
            as={Textarea}
            defaultValue=""
            maxLength={200}
            {...props}
          />
        )}
      />
      <InputContainer
        label="Ciudad"
        name="city"
        render={(props) => <CityInput {...props} />}
      />
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
