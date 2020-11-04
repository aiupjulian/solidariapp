import {setLocale} from 'yup';

setLocale({
  mixed: {
    required: 'Este campo es requerido.',
    oneOf: 'Este campo es requerido.',
    typeError: 'Este campo es requerido.',
  },
  string: {
    min: ({min}) => `Debe tener al menos ${min} caracteres.`,
    max: ({max}) => `Debe tener hasta ${max} caracteres.`,
  },
  date: {
    typeError: 'Este campo es requerido.',
    min: ({min}) => `La fecha mínima es el ${min.toLocaleDateString('es')}.`,
    max: ({max}) => `La fecha máxima es el ${max.toLocaleDateString('es')}.`,
  },
});
