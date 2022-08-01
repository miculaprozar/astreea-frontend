import * as yup from "yup";

const validationSchema = yup.object().shape({
  password: yup
    .string()
    .required("Parolă obligatorie")
    .min(6, "Minim 6 caractere"),
  newPassword: yup
    .string()
    .required("Parolă obligatorie")
    .min(6, "Minim 6 caractere"),
  confirmNewPassword: yup
    .string()
    .required("Parolă obligatorie")
    .oneOf([yup.ref("newPassword")], "Cele doua parole nu se potrivesc!"),
});

export default validationSchema;
