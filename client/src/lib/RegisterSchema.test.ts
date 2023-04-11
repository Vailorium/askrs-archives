import registerSchema from './RegisterSchema';

describe('registerSchema', () => {
  it('should validate a valid input', async () => {
    const input = {
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password123',
      confirmPassword: 'password123',
    };
    await expect(registerSchema.validate(input)).resolves.toBe(input);
  });

  it('should throw an error for a missing username', async () => {
    const input = {
      email: 'testuser@example.com',
      password: 'password123',
      confirmPassword: 'password123',
    };
    await expect(registerSchema.validate(input)).rejects.toThrowError('Username is required');
  });

  it('should throw an error for an invalid email', async () => {
    const input = {
      username: 'testuser',
      email: 'invalid-email',
      password: 'password123',
      confirmPassword: 'password123',
    };
    await expect(registerSchema.validate(input)).rejects.toThrowError('Must be a valid email');
  });

  it('should throw an error for a missing password', async () => {
    const input = {
      username: 'testuser',
      email: 'testuser@example.com',
      confirmPassword: 'password123',
    };
    await expect(registerSchema.validate(input)).rejects.toThrowError('Password is required');
  });

  it('should throw an error for a password that is too short', async () => {
    const input = {
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'asdf',
      confirmPassword: 'asdf',
    };
    await expect(registerSchema.validate(input)).rejects.toThrowError('Password must be at least 8 characters long');
  });

  it('should throw an error for a missing confirm password', async () => {
    const input = {
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password123',
    };
    await expect(registerSchema.validate(input)).rejects.toThrowError('Confirm Password is required');
  });

  it('should throw an error for a password that does not match confirmPassword', async () => {
    const input = {
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password123',
      confirmPassword: 'wrongpassword',
    };
    await expect(registerSchema.validate(input)).rejects.toThrowError('Passwords must match');
  });
});
