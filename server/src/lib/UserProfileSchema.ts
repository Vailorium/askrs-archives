import Joi from 'joi';

const userProfileSchema = Joi.object({
  _id: Joi.string(),
  uid: Joi.string().required(),
  username: Joi.string().required(),
  picture: Joi.number(),
  friendCode: Joi.string().length(10),
  socials: Joi.object({
    reddit: Joi.string().allow(null, '').max(50),
    twitter: Joi.string().allow(null, '').max(50),
    youtube: Joi.string().allow(null, '').max(50),
  }),
  favoriteHeroes: Joi.array().items(Joi.number()).max(5),
  favoriteBuilds: Joi.array().items(Joi.string()),
  favoriteARD: Joi.array().items(Joi.string()),
  favoriteARO: Joi.array().items(Joi.string()),
});

export default userProfileSchema;
