import Joi from 'joi';

const userProfileSchema = Joi.object({
  _id: Joi.string(),
  uid: Joi.string().required(),
  username: Joi.string().required(),
  picture: Joi.number(),
  friendCode: Joi.string(),
  socials: Joi.object({
    reddit: Joi.string().allow(null),
    twitter: Joi.string().allow(null),
    youtube: Joi.string().allow(null),
  }),
  favoriteHeroes: Joi.array().items(Joi.number()).max(5),
  favoriteBuilds: Joi.array().items(Joi.string()),
  favoriteARD: Joi.array().items(Joi.string()),
  favoriteARO: Joi.array().items(Joi.string()),
});

export default userProfileSchema;
