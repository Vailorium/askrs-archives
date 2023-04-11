import * as yup from 'yup';

const registerSchema = yup.object({
  username: yup.string().max(20).required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  confirmPassword: yup
    .string()
    .test('passwords-match', 'Passwords must match', function passwordsMatch(value) { return this.parent.password === value; })
    .required(),
});
export default registerSchema;
