import * as yup from 'yup';
import { Element, IVS, SupportLevel } from '../enums';
import ErrorMessages from './SchemaErrorMessages';

const unitBuilderFormSchema = yup.object({
  maxSkills: yup.boolean(),
  resplendentCostume: yup.boolean(),
  id: yup.string().required(ErrorMessages.UnitBuilderForm.ID_REQUIRED),
  buildName: yup.string().optional(),
  // frontend schema doesn't need to be strict with exactly what data is sent,
  // its just a guide for users
  hero: yup.object({
    // if id_num = 0 hero isn't selected
    id_num: yup
      .number()
      .min(1, ErrorMessages.UnitBuilderForm.HERO_REQUIRED)
      .required(ErrorMessages.UnitBuilderForm.HERO_REQUIRED),
  }),
  build: yup.object({
    rarity: yup
      .number()
      .min(1, ErrorMessages.UnitBuilderForm.RARITY_MIN)
      .max(5, ErrorMessages.UnitBuilderForm.RARITY_MAX)
      .required(ErrorMessages.UnitBuilderForm.RARITY_REQUIRED),
    merges: yup
      .number()
      .min(0, ErrorMessages.UnitBuilderForm.MERGES_MIN)
      .max(10, ErrorMessages.UnitBuilderForm.MERGES_MAX)
      .required(ErrorMessages.UnitBuilderForm.MERGES_REQUIRED),
    skills: yup.object().required(ErrorMessages.UnitBuilderForm.SKILLS_REQUIRED),
    resplendent: yup.boolean().required(ErrorMessages.UnitBuilderForm.RESPLENDENT_REQUIRED),
    ivs: yup.object({
      boon: yup
        .number()
        .min(IVS.neutral, ErrorMessages.UnitBuilderForm.IVS_BOON_MIN)
        .max(IVS.res, ErrorMessages.UnitBuilderForm.IVS_BOON_MAX)
        .test('unique-boon-floret', ErrorMessages.UnitBuilderForm.IVS_BOON_UNIQUE_FLORET, function (value) {
          return value === IVS.neutral
            || this.parent.floret !== value;
        })
        .test('unique-boon-bane', ErrorMessages.UnitBuilderForm.IVS_BOON_UNIQUE_BANE, function (value) {
          return value === IVS.neutral
            || this.parent.bane !== value;
        })
        .test('boon-set-if-merge-0-and-bane-set', ErrorMessages.UnitBuilderForm.IVS_BOON_SET_IF_MERGE_0_AND_BANE_SET, function (value, context) {
          const build = context.from ? context.from[1].value : { merges: 0 };
          return build.merges !== 0 || this.parent.bane === IVS.neutral || value !== IVS.neutral;
        })
        .required(ErrorMessages.UnitBuilderForm.IVS_BOON_REQUIRED),
      bane: yup
        .number()
        .min(IVS.neutral, ErrorMessages.UnitBuilderForm.IVS_BANE_MIN)
        .max(IVS.res, ErrorMessages.UnitBuilderForm.IVS_BANE_MAX)
        .test('unique-boon-bane', ErrorMessages.UnitBuilderForm.IVS_BANE_UNIQUE_BOON, function (value) {
          return value === IVS.neutral
            || this.parent.boon !== value;
        })
        .test('bane-set-if-merge-0-and-boon-set', ErrorMessages.UnitBuilderForm.IVS_BANE_SET_IF_MERGE_0_AND_BOON_SET, function (value, context) {
          const build = context.from ? context.from[1].value : { merges: 0 };
          return build.merges !== 0 || this.parent.boon === IVS.neutral || value !== IVS.neutral;
        })
        .required(ErrorMessages.UnitBuilderForm.IVS_BANE_REQUIRED),
      floret: yup
        .number()
        .min(IVS.neutral, ErrorMessages.UnitBuilderForm.IVS_FLORET_MIN)
        .max(IVS.res, ErrorMessages.UnitBuilderForm.IVS_FLORET_MAX)
        .test('unique-boon-floret', ErrorMessages.UnitBuilderForm.IVS_FLORET_UNIQUE_BOON, function (value) {
          return value === IVS.neutral
            || this.parent.boon !== value;
        })
        .required(ErrorMessages.UnitBuilderForm.IVS_FLORET_REQUIRED),
    }),
    dragonflowers: yup
      .number()
      .min(0, ErrorMessages.UnitBuilderForm.DRAGONFLOWERS_MIN)
      .required(ErrorMessages.UnitBuilderForm.DRAGONFLOWERS_REQUIRED),
    blessing: yup
      .number()
      .min(Element.none, ErrorMessages.UnitBuilderForm.BLESSING_MIN)
      .max(Element.anima, ErrorMessages.UnitBuilderForm.BLESSING_MAX),
    summonerSupport: yup
      .number()
      .min(SupportLevel.none, ErrorMessages.UnitBuilderForm.SUMMONER_SUPPORT_MIN)
      .max(SupportLevel.S, ErrorMessages.UnitBuilderForm.SUMMONER_SUPPORT_MAX)
      .required(ErrorMessages.UnitBuilderForm.SUMMONER_SUPPORT_REQUIRED),
    allySupport: yup.object({
      targetIdNum: yup.number().min(0, ErrorMessages.UnitBuilderForm.ALLY_SUPPORT_INVALID_TARGET),
      level: yup.number()
        .min(SupportLevel.none, ErrorMessages.UnitBuilderForm.ALLY_SUPPORT_LEVEL_MIN)
        .max(SupportLevel.S, ErrorMessages.UnitBuilderForm.ALLY_SUPPORT_LEVEL_MAX)
        .required(ErrorMessages.UnitBuilderForm.ALLY_SUPPORT_LEVEL_REQUIRED),
    }),
  }),
});
export default unitBuilderFormSchema;
