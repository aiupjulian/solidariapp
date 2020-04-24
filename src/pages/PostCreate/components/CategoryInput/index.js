import React, { useState } from "react";
import { Form } from "react-bulma-components";

import "./CategoryInput.css";
import { categories } from "../../../../utils/filters";

const { Radio } = Form;

const CategoryInput = (props) => {
  const [category, setCategory] = useState();
  return (
    <>
      {Object.values(categories).map((categoryRadio) => (
        <Radio
          key={categoryRadio.path}
          className="CategoryRadio"
          value={categoryRadio.path}
          checked={category === categoryRadio.path}
          onChange={() => setCategory(categoryRadio.path)}
          {...props}
        >
          {categoryRadio.name}
        </Radio>
      ))}
    </>
  );
};

export default CategoryInput;
