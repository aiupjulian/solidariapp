import * as yup from "yup";
import moment from "moment";

import { categories } from "../../../utils/filters";

const minDate = moment().add(1, "d");
const maxDate = moment().add(3, "M");
const dateValidations = (dateInputType) =>
  yup
    .date()
    .nullable()
    .transform((currentValue, originalValue) =>
      originalValue === "" ? null : moment(originalValue, "DD/MM/YYYY")
    )
    .when("dateInputType", {
      is: dateInputType,
      then: yup
        .date()
        .required()
        .min(minDate.toDate())
        .max(maxDate.toDate()),
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
