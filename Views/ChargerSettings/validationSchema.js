import * as yup from "yup";

const validationSchema = yup.object().shape({
  name: yup.string().required("The  name is required"),
  address: yup.string().required("The address  is required"),
  currency: yup.string().required("The currency is required"),
  price: yup.string().required("The price  is required"),
});

export default validationSchema;
