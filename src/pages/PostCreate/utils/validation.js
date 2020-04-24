import * as yup from "yup";
import { add, parse } from "date-fns";

import { categories } from "../../../utils/filters";

const today = new Date();
const minDate = add(today, { days: 1 });
const maxDate = add(today, { months: 2 });
const dateValidations = (dateInputType) =>
  yup
    .date()
    .nullable()
    .transform((_, originalValue) =>
      originalValue === ""
        ? null
        : parse(originalValue, "dd/MM/yyyy", new Date())
    )
    .when("dateInputType", {
      is: dateInputType,
      then: yup
        .date()
        .required()
        .min(minDate)
        .max(maxDate),
    });

const postSchema = yup.object().shape({
  title: yup
    .string()
    .required()
    .min(5)
    .max(20),
  dateInputType: yup
    .string()
    .required()
    .oneOf(["noInput", "singleDate", "rangeDate"]),
  date: dateValidations("singleDate"),
  startDate: dateValidations("rangeDate"),
  endDate: dateValidations("rangeDate"),
  category: yup
    .string()
    .required()
    .oneOf(Object.values(categories).map((category) => category.path)),
  description: yup
    .string()
    .required()
    .min(5)
    .max(100),
  city: yup
    .string()
    .required()
    .min(5),
});

export default postSchema;
