import * as yup from 'yup';

const registerSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});
export default registerSchema;
