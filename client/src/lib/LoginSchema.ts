import * as yup from 'yup';
import ErrorMessages from './SchemaErrorMessages';

const loginSchema = yup.object({
  email: yup
    .string()
    .email(ErrorMessages.Login.EMAIL_VALID_ADDRESS)
    .required(ErrorMessages.Login.EMAIL_REQUIRED),
  password: yup.string().required(ErrorMessages.Login.PASSWORD_REQUIRED),
});
export default loginSchema;
