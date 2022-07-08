import * as yup from "yup";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email-ul este obligatoriu")
    .email("Email incomplet"),

  password: yup
    .string()
    .required("Parolă obligatorie")
    .min(6, "Minim 6 caractere"),
});

export default validationSchema;
