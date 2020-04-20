import { setLocale } from "yup";

const createMessage = (key, value) => ({ key, value });

setLocale({
  mixed: {
    required: ({ path }) => createMessage(path, "Este campo es requerido."),
  },
  string: {
    min: ({ path, min }) =>
      createMessage(path, `Debe tener al menos ${min} caracteres.`),
    max: ({ path, max }) =>
      createMessage(path, `Debe tener hasta ${max} caracteres.`),
  },
  date: {
    min: ({ path, min }) =>
      createMessage(path, `La fecha minima es el ${min}.`),
    max: ({ path, max }) => createMessage(path, `La fecha maxima es el ${max}`),
  },
});
