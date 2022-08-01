import * as yup from "yup";

const validationSchema = yup.object().shape({
  firstName: yup.string().required("Numele este obligatoriu!"),
  lastName: yup.string().required("Prenumele este obligatoriu!"),
});

export default validationSchema;
