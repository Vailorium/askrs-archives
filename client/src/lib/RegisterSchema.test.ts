import registerSchema from './RegisterSchema';
import ErrorMessages from './SchemaErrorMessages';

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
    await expect(registerSchema.validate(input))
      .rejects.toThrowError(ErrorMessages.Register.USERNAME_REQUIRED);
  });

  it('should throw an error for an invalid email', async () => {
    const input = {
      username: 'testuser',
      email: 'invalid-email',
      password: 'password123',
      confirmPassword: 'password123',
    };
    await expect(registerSchema.validate(input))
      .rejects.toThrowError(ErrorMessages.Register.EMAIL_VALID_ADDRESS);
  });

  it('should throw an error for a missing password', async () => {
    const input = {
      username: 'testuser',
      email: 'testuser@example.com',
      confirmPassword: 'password123',
    };
    await expect(registerSchema.validate(input))
      .rejects.toThrowError(ErrorMessages.Register.PASSWORD_REQUIRED);
  });

  it('should throw an error for a password that is too short', async () => {
    const input = {
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'asdf',
      confirmPassword: 'asdf',
    };
    await expect(registerSchema.validate(input))
      .rejects.toThrowError(ErrorMessages.Register.PASSWORD_MIN);
  });

  it('should throw an error for a missing confirm password', async () => {
    const input = {
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password123',
    };
    await expect(registerSchema.validate(input))
      .rejects.toThrowError(ErrorMessages.Register.CONFIRM_PASSWORD_REQUIRED);
  });

  it('should throw an error for a password that does not match confirmPassword', async () => {
    const input = {
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password123',
      confirmPassword: 'wrongpassword',
    };
    await expect(registerSchema.validate(input))
      .rejects.toThrowError(ErrorMessages.Register.CONFIRM_PASSWORD_MATCH);
  });
});
