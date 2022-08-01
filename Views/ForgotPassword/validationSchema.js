import * as yup from "yup";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email-ul este obligatoriu")
    .email("Email incomplet"),
});

export default validationSchema;
