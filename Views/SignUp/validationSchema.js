import * as yup from "yup";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .test(
      "firstLetterToLower",
      "First letter must be lower case",
      function (value) {
        const firstLetter = value[0];
        return firstLetter[0].toLowerCase() === firstLetter[0];
      }
    )
    .required("The email is required")
    .email("Incomplete email"),
  firstName: yup.string().required("The first name is required"),

  lastName: yup.string().required("The last name is required"),

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
