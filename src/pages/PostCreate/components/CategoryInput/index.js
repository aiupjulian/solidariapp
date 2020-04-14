import React, { useState } from "react";
import { Form } from "react-bulma-components";

import "./CategoryInput.css";
import { categories } from "../../../../utils/filters";

const { Field, Label, Control, Radio } = Form;
const CategoryInput = () => {
  const [category, setCategory] = useState();
  return (
    <Field>
      <Label>Categoría</Label>
      <Control className="CategoriesRadiosContainer">
        {Object.values(categories).map((categoryRadio) => (
          <Radio
            key={categoryRadio.path}
            className="CategoryRadio"
            name="category"
            value={categoryRadio.path}
            checked={category === categoryRadio.path}
            onChange={() => setCategory(categoryRadio.path)}
          >
            {categoryRadio.name}
          </Radio>
        ))}
      </Control>
    </Field>
  );
};

export default CategoryInput;
