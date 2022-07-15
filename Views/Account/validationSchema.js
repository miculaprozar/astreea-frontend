import * as yup from "yup";

const validationSchema = yup.object().shape({
  firstName: yup.string().required("Numele este obligatoriu!"),

  lastName: yup.string().required("Prenumele este obligatoriu!"),

  passwordControlled: yup
    .string()
    .required("Parolă obligatorie")
    .min(6, "Minim 6 caractere"),
  seccondPasswordControlled: yup
    .string()
    .oneOf(
      [yup.ref("passwordControlled")],
      "Cele doua parole nu se potrivesc!"
    ),
});

export default validationSchema;
