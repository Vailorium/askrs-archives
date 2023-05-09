import userProfileSchema from './UserProfileSchema';

const validUserProfile = {
  _id: 'aosdkfpask123df',
  uid: 'user123',
  username: 'user123',
  picture: 1,
  friendCode: '7812311932',
  socials: {
    reddit: 'user123',
    twitter: 'twitter123',
    youtube: 'user123',
  },
  favoriteHeroes: [1, 2, 3, 4, 5],
  favoriteBuilds: ['build1', 'build2'],
  favoriteARD: ['defense1', 'defense2'],
  favoriteARO: ['offense1', 'offense2'],
};

describe('UserProfileSchema', () => {
  it('should validate a user profile with all fields', () => {
    const { error } = userProfileSchema.validate(validUserProfile, { abortEarly: false });
    expect(error).toBeFalsy();
  });

  it('should validate a user profile with just required fields', () => {
    const requiredUserProfile = {
      ...validUserProfile,
      picture: undefined,
      friendCode: undefined,
      socials: {},
      favoriteHeroes: [],
      favoriteARD: [],
      favoriteARO: [],
    };

    const { error } = userProfileSchema.validate(requiredUserProfile, { abortEarly: false });
    expect(error).toBeFalsy();
  });

  it('should not validate a user profile with missing required fields', () => {
    const invalidUserProfile = {
      ...validUserProfile,
      username: undefined,
      uid: undefined,
    };

    const { error } = userProfileSchema.validate(invalidUserProfile, { abortEarly: false });
    if (error) {
      expect(error.details.length).toBe(2);
      expect(error.details).toEqual(expect.arrayContaining([expect.objectContaining({ message: '"uid" is required' })]));
      expect(error.details).toEqual(expect.arrayContaining([expect.objectContaining({ message: '"username" is required' })]));
    }
  });

  it('should not validate a user profile with invalid data types', () => {
    const invalidUserProfile = {
      uid: 123,
      username: 123,
      picture: 'invalid',
      friendCode: 123,
      socials: null,
      favoriteHeroes: null,
      favoriteBuilds: null,
      favoriteARD: null,
      favoriteARO: null,
    };

    const { error } = userProfileSchema.validate(invalidUserProfile, { abortEarly: false });
    if (error) {
      expect(error.details.length).toBe(9);
      expect(error.details).toEqual(expect.arrayContaining([expect.objectContaining({ message: '"uid" must be a string' })]));
      expect(error.details).toEqual(expect.arrayContaining([expect.objectContaining({ message: '"username" must be a string' })]));
      expect(error.details).toEqual(expect.arrayContaining([expect.objectContaining({ message: '"picture" must be a number' })]));
      expect(error.details).toEqual(expect.arrayContaining([expect.objectContaining({ message: '"friendCode" must be a string' })]));
      expect(error.details).toEqual(expect.arrayContaining([expect.objectContaining({ message: '"socials" must be of type object' })]));
      expect(error.details).toEqual(expect.arrayContaining([expect.objectContaining({ message: '"favoriteHeroes" must be an array' })]));
      expect(error.details).toEqual(expect.arrayContaining([expect.objectContaining({ message: '"favoriteBuilds" must be an array' })]));
      expect(error.details).toEqual(expect.arrayContaining([expect.objectContaining({ message: '"favoriteARD" must be an array' })]));
      expect(error.details).toEqual(expect.arrayContaining([expect.objectContaining({ message: '"favoriteARO" must be an array' })]));
    }
  });

  it('should not validate a user profile with too many favorite heroes', () => {
    const invalidUserProfile = {
      ...validUserProfile,
      favoriteHeroes: [1, 2, 3, 4, 5, 6],
    };

    const { error } = userProfileSchema.validate(invalidUserProfile, { abortEarly: false });
    if (error) {
      expect(error.details.length).toBe(1);
      expect(error.details).toEqual(expect.arrayContaining([expect.objectContaining({ message: '"favoriteHeroes" must contain less than or equal to 5 items' })]));
    }
  });
});
