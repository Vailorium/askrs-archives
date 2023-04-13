import Joi from 'joi';

const heroBuildSchema = Joi.object({
  _id: Joi.string().optional(),
  buildName: Joi.string().required(),
  uid: Joi.string().optional().allow(''),
  heroIdNum: Joi.number().required(),
  rarity: Joi.number().min(1).max(5).required(),
  merges: Joi.number().min(0).max(10).required(),
  weapon: Joi.number().optional(),
  refine: Joi.number().optional(),
  assist: Joi.number().optional(),
  special: Joi.number().optional(),
  a: Joi.number().optional(),
  b: Joi.number().optional(),
  c: Joi.number().optional(),
  s: Joi.number().optional(),
  resplendent: Joi.boolean().required(),
  boon: Joi
    .when('merges', {
      is: 0,
      then: Joi.when('bane', {
        is: Joi.number().greater(0),
        then: Joi.number().min(1),
        otherwise: Joi.number().min(0),
      }),
      otherwise: Joi.number().min(0),
    })
    .when(Joi.number().greater(0), {
      then: Joi.invalid(Joi.ref('bane'), Joi.ref('floret')),
    })
    .required(),
  bane: Joi.number()
    .when('merges', {
      is: 0,
      then: Joi.number().when('boon', {
        is: Joi.number().greater(0),
        then: Joi.number().min(1),
        otherwise: Joi.number().min(0),
      }),
      otherwise: Joi.number().valid(0),
    })
    .when(Joi.number().greater(0), {
      then: Joi.invalid(Joi.ref('boon')),
    })
    .required(),
  floret: Joi
    .number()
    .min(0)
    .when(Joi.number().greater(0), {
      then: Joi.invalid(Joi.ref('boon')),
    })
    .required(),
  dragonflowers: Joi.number().min(0).required(),
  blessing: Joi.number().min(0).required(),
  summonerSupport: Joi.number().min(0).required(),
  allySupportTarget: Joi.number().optional(),
  allySupportLevel: Joi.number().min(0).required(),
  createdAt: Joi.string().optional(),
  updatedAt: Joi.string().optional(),
  __v: Joi.string().optional(),
});

export default heroBuildSchema;
