import Joi from 'joi';

const postRegisterSchema = Joi.object({
  username: Joi.string().max(20).required(),
  idToken: Joi.string().required(),
});

export default postRegisterSchema;
