import * as yup from "yup";

const validationSchema = yup.object().shape({
  durationHour: yup
    .number()
    .typeError("Must be a number")
    .min(0, "Min value 0.")
    .max(24, "Max value 24.")
    .required("The hour is required"),
  //   durationMinutes: yup.string().required("The second name is required"),
  //   kwh: yup.string().required("The second name is required"),
  //   stopHour: yup.string().required("The second name is required"),
  //   stopMinutes: yup.string().required("The second name is required"),
});

export default validationSchema;
