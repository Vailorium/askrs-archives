import * as yup from 'yup';

const registerSchema = yup.object({
  username: yup.string().max(20).required('Username is required'),
  email: yup.string().email('Must be a valid email').required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long'),
  confirmPassword: yup
    .string()
    .test('passwords-match', 'Passwords must match', function passwordsMatch(value) { return this.parent.password === value; })
    .required('Confirm Password is required'),
});
export default registerSchema;
