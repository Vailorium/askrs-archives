import loginSchema from './LoginSchema';

describe('loginSchema', () => {
  it('should validate a valid input', async () => {
    const input = { email: 'john@example.com', password: 'password' };
    await expect(loginSchema.validate(input)).resolves.toBe(input);
  });

  it('should throw an error for an invalid email', async () => {
    const input = { email: 'invalid-email', password: 'password' };
    await expect(loginSchema.validate(input)).rejects.toThrowError('email must be a valid email');
  });

  it('should throw an error for a missing email', async () => {
    const input = { password: 'password' };
    await expect(loginSchema.validate(input)).rejects.toThrowError('email is a required field');
  });

  it('should throw an error for a missing password', async () => {
    const input = { email: 'john@example.com' };
    await expect(loginSchema.validate(input)).rejects.toThrowError('password is a required field');
  });
});
