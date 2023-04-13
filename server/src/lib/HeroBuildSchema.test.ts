import heroBuildSchema from './HeroBuildSchema';

describe('heroBuildSchema', () => {
  it('should validate a valid hero build object', () => {
    const heroBuild = {
      buildName: 'My Hero Build',
      uid: '123',
      heroIdNum: 1,
      rarity: 5,
      merges: 0,
    };
    const { error } = heroBuildSchema.validate(heroBuild);
    expect(error).toBeFalsy();
  });

  it('should return an error if buildName is missing', () => {
    const heroBuild = {
      uid: '123',
      heroIdNum: 1,
      rarity: 5,
      merges: 0,
    };
    const { error } = heroBuildSchema.validate(heroBuild);
    expect(error).toBeTruthy();
    if (error) {
      expect(error.details[0].message).toMatch(/"buildName" is required/);
    }
  });

  it('should return an error if heroIdNum is missing', () => {
    const heroBuild = {
      buildName: 'My Hero Build',
      uid: '123',
      rarity: 5,
      merges: 0,
    };
    const { error } = heroBuildSchema.validate(heroBuild);
    expect(error).toBeTruthy();
    if (error) {
      expect(error.details[0].message).toMatch(/"heroIdNum" is required/);
    }
  });

  it('should return an error if rarity is missing', () => {
    const heroBuild = {
      buildName: 'My Hero Build',
      uid: '123',
      heroIdNum: 1,
      merges: 0,
    };
    const { error } = heroBuildSchema.validate(heroBuild);
    expect(error).toBeTruthy();
    if (error) {
      expect(error.details[0].message).toMatch(/"rarity" is required/);
    }
  });

  it('should return an error if merges is missing', () => {
    const heroBuild = {
      buildName: 'My Hero Build',
      uid: '123',
      heroIdNum: 1,
      rarity: 5,
    };
    const { error } = heroBuildSchema.validate(heroBuild);
    expect(error).toBeTruthy();
    if (error) {
      expect(error.details[0].message).toMatch(/"merges" is required/);
    }
  });

  it('should return an error if a field is not of the expected type', () => {
    const heroBuild = {
      buildName: 'My Hero Build',
      uid: '123',
      heroIdNum: 'not a number',
      rarity: 5,
      merges: 0,
    };
    const { error } = heroBuildSchema.validate(heroBuild);
    expect(error).toBeTruthy();
    if (error) {
      expect(error.details[0].message).toMatch(/"heroIdNum" must be a number/);
    }
  });

  it('should return an error if an unexpected field is present', () => {
    const heroBuild = {
      buildName: 'My Hero Build',
      uid: '123',
      heroIdNum: 1,
      rarity: 5,
      merges: 0,
      unknownField: 'unexpected value',
    };
    const { error } = heroBuildSchema.validate(heroBuild);
    expect(error).toBeTruthy();
    if (error) {
      expect(error.details[0].message).toMatch(/"unknownField" is not allowed/);
    }
  });
});
