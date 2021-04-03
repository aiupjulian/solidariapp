import React from 'react';

import CityInput from '../CityInput';
import ImageInput from '../ImageInput';
// import DateInput from '../DateInput';

// TODO: implement dateinput
// - fecha?: date (dia o rango - si no pone fecha, hay que poner una igual de aca a dos meses)
const ThirdStep = () => {
  return (
    <>
      <CityInput />
      <ImageInput />
      {/* <DateInput /> */}
    </>
  );
};

export default ThirdStep;
