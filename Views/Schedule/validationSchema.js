import * as yup from "yup";

const validationSchema = yup.object().shape({
  startHour: yup
    .number()
    .typeError("Must be a number")
    .min(0, "Min value 0.")
    .max(24, "Max value 24.")
    .required("The hour is required"),
  startMinutes: yup
    .number()
    .typeError("Must be a number")
    .min(0, "Min value 0.")
    .max(60, "Max value 60.")
    .required("The Minutes are required"),
  stopHour: yup
    .number()
    .typeError("Must be a number")
    .min(0, "Min value 0.")
    .max(24, "Max value 24.")
    .required("The hour is required"),
  stopMinutes: yup
    .number()
    .typeError("Must be a number")
    .min(0, "Min value 0.")
    .max(60, "Max value 60.")
    .required("The Minutes are required"),
  watts: yup
    .number()
    .typeError("Must be a number")

    .required("The Watts are required"),
  //   durationMinutes: yup.string().required("The second name is required"),
  //   kwh: yup.string().required("The second name is required"),
  //   stopHour: yup.string().required("The second name is required"),
  //   stopMinutes: yup.string().required("The second name is required"),
});

export default validationSchema;
