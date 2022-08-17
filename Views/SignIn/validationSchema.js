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
    .required("The email is required")
    .email("The email is incomplete"),

  password: yup
    .string()
    .required("The password is required")
    .min(6, "Password must be at least 6 characters"),
});

export default validationSchema;
