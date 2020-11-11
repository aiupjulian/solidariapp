import React, {useState} from 'react';
// import {Form} from 'react-bulma-components';
import {Controller} from 'react-hook-form';

import './CategoryInput.css';
import {categories} from '../../../../utils/filters';

// const {Radio} = Form;

const CategoryInput = (props) => {
  const [category, setCategory] = useState();
  return (
    <>
      {Object.values(categories).map((categoryRadio) => ({
        /* <Controller
          as={Radio}
          key={categoryRadio.path}
          className="CategoryRadio"
          value={categoryRadio.path}
          checked={category === categoryRadio.path}
          onChange={() => {
            setCategory(categoryRadio.path);
            return categoryRadio.path;
          }}
          {...props}
        >
          {categoryRadio.name}
        </Controller> */
      }))}
    </>
  );
};

export default CategoryInput;
