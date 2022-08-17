import * as yup from "yup";

const validationSchema = yup.object().shape({
  firstName: yup.string().required("The first name is required"),
  lastName: yup.string().required("The second name is required"),
});

export default validationSchema;
