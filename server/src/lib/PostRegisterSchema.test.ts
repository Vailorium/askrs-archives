import postRegisterSchema from './PostRegisterSchema';

describe('postRegisterSchema', () => {
  it('should validate a valid object', () => {
    const validObject = { username: 'myusername', idToken: 'mytoken' };
    const { error } = postRegisterSchema.validate(validObject);
    expect(error).toBeFalsy();
  });

  it('should return an error if username is missing', () => {
    const invalidObject = { idToken: 'mytoken' };
    const { error } = postRegisterSchema.validate(invalidObject);
    expect(error).toBeTruthy();
    if (error) {
      expect(error.details[0].message).toMatch(/"username" is required/);
    }
  });

  it('should return an error if idToken is missing', () => {
    const invalidObject = { username: 'myusername' };
    const { error } = postRegisterSchema.validate(invalidObject);
    expect(error).toBeTruthy();
    if (error) {
      expect(error.details[0].message).toMatch(/"idToken" is required/);
    }
  });

  it('should return an error if username is too long', () => {
    const invalidObject = { username: 'ijoienpiwornhwirhwpoeirhnwpirohnwrihon', idToken: 'mytoken' };
    const { error } = postRegisterSchema.validate(invalidObject);
    expect(error).toBeTruthy();
    if (error) {
      expect(error.details[0].message).toMatch(/"username" length must be less than or equal to 20/);
    }
  });

  it('should return an error if an unexpected field is present', () => {
    const invalidObject = { username: 'myusername', idToken: 'mytoken', unexpectedField: 'unexpectedValue' };
    const { error } = postRegisterSchema.validate(invalidObject);
    expect(error).toBeTruthy();
    if (error) {
      expect(error.details[0].message).toMatch(/"unexpectedField" is not allowed/);
    }
  });
});
