import { setLocale } from "yup";

setLocale({
  mixed: {
    required: "Este campo es requerido.",
    oneOf: "Este campo es requerido.",
  },
  string: {
    min: ({ min }) => `Debe tener al menos ${min} caracteres.`,
    max: ({ max }) => `Debe tener hasta ${max} caracteres.`,
  },
  date: {
    min: ({ min }) => `La fecha minima es el ${min}.`,
    max: ({ max }) => `La fecha maxima es el ${max}`,
  },
});
