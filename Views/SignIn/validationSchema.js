import * as yup from "yup";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .test(
      "firstLetterToLower",
      "First email letter must be lower case",
      function (value) {
        if (value) {
          const firstLetter = value[0];
          return firstLetter[0].toLowerCase() === firstLetter[0];
        } else return true;
      }
    )
    .required("Email-ul este obligatoriu")
    .email("Email incomplet"),

  password: yup
    .string()
    .required("Parolă obligatorie")
    .min(6, "Minim 6 caractere"),
});

export default validationSchema;
