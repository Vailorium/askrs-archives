import * as yup from 'yup';
import { Element, IVS, SupportLevel } from '../enums';

const unitBuilderFormSchema = yup.object({
  maxSkills: yup.boolean(),
  resplendentCostume: yup.boolean(),
  id: yup.string().required(),
  // eslint-disable-next-line max-len
  // buildName: yup.string().max(30, 'Build Name must be less than 31 characters!').required('Build Name is required!'),
  buildName: yup.string().optional(),
  // frontend schema doesn't need to be strict with exactly what data is sent,
  // its just a guide for users
  hero: yup.object({
    // if id_num = 0 hero isn't selected
    id_num: yup.number().min(1, 'Hero is required!').required('Hero is required!'),
  }),
  build: yup.object({
    rarity: yup.number().min(1).max(5).required(),
    merges: yup.number().min(0).max(10).required(),
    skills: yup.object().required(),
    resplendent: yup.boolean().required(),
    ivs: yup.object({
      boon: yup.number().min(IVS.neutral).max(IVS.res).required(),
      bane: yup.number().min(IVS.neutral).max(IVS.res).required(),
      floret: yup.number().min(IVS.neutral).max(IVS.res).required(),
    }),
    dragonflowers: yup.number().min(0).required(),
    blessing: yup.number().min(Element.none).max(Element.anima),
    summonerSupport: yup.number().min(SupportLevel.none).max(SupportLevel.S).required(),
    allySupport: yup.object({
      targetIdNum: yup.number().min(0),
      level: yup.number().min(SupportLevel.none).max(SupportLevel.S).required(),
    }),
  }),
});
export default unitBuilderFormSchema;
