import * as yup from 'yup';
import ErrorMessages from './SchemaErrorMessages';

const registerSchema = yup.object({
  username: yup
    .string()
    .max(20, ErrorMessages.Register.USERNAME_MAX)
    .required(ErrorMessages.Register.USERNAME_REQUIRED),
  email: yup
    .string()
    .email(ErrorMessages.Register.EMAIL_VALID_ADDRESS)
    .required(ErrorMessages.Register.EMAIL_REQUIRED),
  password: yup
    .string()
    .required(ErrorMessages.Register.PASSWORD_REQUIRED)
    .min(8, ErrorMessages.Register.PASSWORD_MIN),
  confirmPassword: yup
    .string()
    .test('passwords-match', ErrorMessages.Register.CONFIRM_PASSWORD_MATCH,
      function passwordsMatch(value) { return this.parent.password === value; })
    .required(ErrorMessages.Register.CONFIRM_PASSWORD_REQUIRED),
});
export default registerSchema;
