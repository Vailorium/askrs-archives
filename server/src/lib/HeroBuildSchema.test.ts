import IHeroBuild from '../interfaces/db/IDBHeroBuild';
import heroBuildSchema from './HeroBuildSchema';

const validBuild: IHeroBuild = {
  _id: 'test',
  buildName: 'My Build',
  uid: 'test',
  heroIdNum: 1,
  rarity: 5,
  merges: 0,
  weapon: 1,
  refine: 1,
  assist: 1,
  special: 1,
  a: 1,
  b: 1,
  c: 1,
  s: 1,
  resplendent: false,
  boon: 0,
  bane: 0,
  floret: 0,
  dragonflowers: 0,
  blessing: 0,
  summonerSupport: 0,
  allySupportLevel: 0,
  allySupportTarget: 0,
  createdAt: '2023-04-04T09:50:43.192+00:00',
  updatedAt: '2023-04-04T09:50:43.192+00:00',
  __v: '0',
};

describe('heroBuildSchema', () => {
  it('should validate a valid hero build object', () => {
    const { error } = heroBuildSchema.validate(validBuild, { abortEarly: false });
    expect(error).toBeFalsy();
  });

  it('should return errors if any required parameters are missing', () => {
    const { error } = heroBuildSchema.validate({}, { abortEarly: false });
    expect(error).toBeTruthy();
    if (error) {
      expect(error.details.length).toBe(12);
      expect(error.details).toEqual(expect.arrayContaining([expect.objectContaining({ message: '"buildName" is required' })]));
      expect(error.details).toEqual(expect.arrayContaining([expect.objectContaining({ message: '"heroIdNum" is required' })]));
      expect(error.details).toEqual(expect.arrayContaining([expect.objectContaining({ message: '"rarity" is required' })]));
      expect(error.details).toEqual(expect.arrayContaining([expect.objectContaining({ message: '"merges" is required' })]));
      expect(error.details).toEqual(expect.arrayContaining([expect.objectContaining({ message: '"resplendent" is required' })]));
      expect(error.details).toEqual(expect.arrayContaining([expect.objectContaining({ message: '"boon" is required' })]));
      expect(error.details).toEqual(expect.arrayContaining([expect.objectContaining({ message: '"bane" is required' })]));
      expect(error.details).toEqual(expect.arrayContaining([expect.objectContaining({ message: '"floret" is required' })]));
      expect(error.details).toEqual(expect.arrayContaining([expect.objectContaining({ message: '"dragonflowers" is required' })]));
      expect(error.details).toEqual(expect.arrayContaining([expect.objectContaining({ message: '"blessing" is required' })]));
      expect(error.details).toEqual(expect.arrayContaining([expect.objectContaining({ message: '"summonerSupport" is required' })]));
      expect(error.details).toEqual(expect.arrayContaining([expect.objectContaining({ message: '"allySupportLevel" is required' })]));
    }
  });

  it('should return errors if boon, bane and floret are the same', () => {
    const build = {
      ...validBuild,
      boon: 1,
      bane: 1,
      floret: 1,
    };
    const { error } = heroBuildSchema.validate(build, { abortEarly: false });
    expect(error).toBeTruthy();
    if (error) {
      expect(error.details.length).toBe(3);
      expect(error.details).toEqual(expect.arrayContaining([expect.objectContaining({ message: '"boon" contains an invalid value' })]));
      expect(error.details).toEqual(expect.arrayContaining([expect.objectContaining({ message: '"bane" contains an invalid value' })]));
      expect(error.details).toEqual(expect.arrayContaining([expect.objectContaining({ message: '"floret" contains an invalid value' })]));
    }
  });

  it('should return errors if boon isn\'t set but bane is when merges = 0', () => {
    const build = {
      ...validBuild,
      boon: 0,
      bane: 1,
      floret: 0,
    };
    const { error } = heroBuildSchema.validate(build, { abortEarly: false });
    expect(error).toBeTruthy();
    if (error) {
      expect(error.details.length).toBe(1);
      expect(error.details).toEqual(expect.arrayContaining([expect.objectContaining({ message: '"boon" must be greater than or equal to 1' })]));
    }
  });

  it('should return errors if bane isn\'t set but boon is when merges = 0', () => {
    const build = {
      ...validBuild,
      boon: 1,
      bane: 0,
      floret: 0,
    };
    const { error } = heroBuildSchema.validate(build, { abortEarly: false });
    expect(error).toBeTruthy();
    if (error) {
      expect(error.details.length).toBe(1);
      expect(error.details).toEqual(expect.arrayContaining([expect.objectContaining({ message: '"bane" must be greater than or equal to 1' })]));
    }
  });

  it('should return if bane is set at merges > 0', () => {
    const build = {
      ...validBuild,
      merges: 1,
      boon: 1,
      bane: 2,
      floret: 0,
    };
    const { error } = heroBuildSchema.validate(build, { abortEarly: false });
    expect(error).toBeTruthy();
    if (error) {
      expect(error.details.length).toBe(1);
      expect(error.details).toEqual(expect.arrayContaining([expect.objectContaining({ message: '"bane" must be [0]' })]));
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
      ...validBuild,
      unknownField: 'unexpected value',
    };
    const { error } = heroBuildSchema.validate(heroBuild);
    expect(error).toBeTruthy();
    if (error) {
      expect(error.details[0].message).toMatch(/"unknownField" is not allowed/);
    }
  });
});
