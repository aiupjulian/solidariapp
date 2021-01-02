import * as yup from 'yup';
// import moment from 'moment';

import './validationLocales';
import {categories} from '../../../utils/filters';

// const minDate = moment().add(1, 'd').startOf('day');
// const maxDate = moment().add(3, 'M').endOf('day');
// const dateValidations = (dateInputType) =>
//   yup
//     .date()
//     .nullable()
//     .transform((_, originalValue) =>
//       originalValue === '' ? null : moment(originalValue).toDate(),
//     )
//     .when('dateInputType', {
//       is: dateInputType,
//       then: yup.date().required().min(minDate.toDate()).max(maxDate.toDate()),
//     });

const firstStepSchema = yup.object().shape({
  category: yup
    .string()
    .required()
    .nullable()
    .oneOf(Object.values(categories).map((category) => category.path)),
});

const secondStepSchema = yup.object().shape({
  title: yup.string().required().min(5).max(50),
  description: yup.string().required().min(5).max(200),
});

const thirdStepSchema = yup.object().shape({
  city: yup.string().required().min(5),
  // dateInputType: yup
  //   .string()
  //   .required()
  //   .oneOf(['noInput', 'singleDate', 'rangeDate']),
  // date: dateValidations('singleDate'),
  // startDate: dateValidations('rangeDate'),
  // endDate: dateValidations('rangeDate'),
});

export {firstStepSchema, secondStepSchema, thirdStepSchema};
