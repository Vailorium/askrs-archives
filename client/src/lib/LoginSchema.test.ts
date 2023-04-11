import loginSchema from './LoginSchema';

describe('loginSchema', () => {
  it('should validate a valid input', async () => {
    const input = { email: 'john@example.com', password: 'password' };
    await expect(loginSchema.validate(input)).resolves.toBe(input);
  });

  it('should throw an error for an invalid email', async () => {
    const input = { email: 'invalid-email', password: 'password' };
    await expect(loginSchema.validate(input)).rejects.toThrowError('Must be a valid email address');
  });

  it('should throw an error for a missing email', async () => {
    const input = { password: 'password' };
    await expect(loginSchema.validate(input)).rejects.toThrowError('Email is required');
  });

  it('should throw an error for a missing password', async () => {
    const input = { email: 'john@example.com' };
    await expect(loginSchema.validate(input)).rejects.toThrowError('Password is required');
  });
});