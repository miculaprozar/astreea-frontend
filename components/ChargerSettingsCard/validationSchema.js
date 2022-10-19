import * as yup from "yup";

const validationSchema = yup.object().shape({
  name: yup.string().required("The  name is required"),
  address: yup.string().required("The address  is required"),
  currency: yup.string().required("required"),
  price: yup.number().typeError("number").required("required"),
});

export default validationSchema;
