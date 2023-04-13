import { ValidationError } from 'yup';
import unitBuilderFormSchema from './UnitBuilderFormSchema';
import ErrorMessages from './SchemaErrorMessages';

const validInput = {
  // Add a valid input object here that satisfies all schema requirements
  maxSkills: true,
  resplendentCostume: true,
  id: 'test',
  buildName: 'Potato',
  hero: {
    id_num: 1,
    roman: 'Extra property',
  },
  build: {
    rarity: 5,
    merges: 3,
    skills: {
      weapon: { id_num: 1 },
      refine: { id_num: 1 },
      assist: { id_num: 1 },
      special: { id_num: 1 },
      a: { id_num: 1 },
      b: { id_num: 1 },
      c: { id_num: 1 },
      s: { id_num: 1 },
    },
    resplendent: true,
    ivs: {
      boon: 0,
      bane: 0,
      floret: 0,
    },
    dragonflowers: 0,
    blessing: 0,
    summonerSupport: 0,
    allySupport: {
      targetIdNum: 0,
      level: 0,
    },
  },
};

const validateSchema = async (input: any) => {
  try {
    await unitBuilderFormSchema.validate(input, { abortEarly: false });
    return null;
  } catch (error) {
    return error;
  }
};

describe('unitBuilderFormSchema', () => {
  it('should validate a valid input', async () => {
    const value = await validateSchema(validInput);
    expect(value).toBeFalsy();
    // await expect(unitBuilderFormSchema.validate(validInput)).resolves.toBe(validInput);
  });

  it('should throw an error for a missing values', async () => {
    const input = {
      ...validInput,
      id: undefined,
      hero: undefined,
      build: undefined,
    };
    const { errors } = await validateSchema(input) as ValidationError;
    expect(errors.length).toBe(12);
    expect(errors).toContain(ErrorMessages.UnitBuilderForm.ID_REQUIRED);
    expect(errors).toContain(ErrorMessages.UnitBuilderForm.HERO_REQUIRED);
    expect(errors).toContain(ErrorMessages.UnitBuilderForm.RARITY_REQUIRED);
    expect(errors).toContain(ErrorMessages.UnitBuilderForm.MERGES_REQUIRED);
    expect(errors).toContain(ErrorMessages.UnitBuilderForm.SKILLS_REQUIRED);
    expect(errors).toContain(ErrorMessages.UnitBuilderForm.RESPLENDENT_REQUIRED);
    expect(errors).toContain(ErrorMessages.UnitBuilderForm.IVS_BOON_REQUIRED);
    expect(errors).toContain(ErrorMessages.UnitBuilderForm.IVS_BANE_REQUIRED);
    expect(errors).toContain(ErrorMessages.UnitBuilderForm.IVS_FLORET_REQUIRED);
    expect(errors).toContain(ErrorMessages.UnitBuilderForm.DRAGONFLOWERS_REQUIRED);
    expect(errors).toContain(ErrorMessages.UnitBuilderForm.SUMMONER_SUPPORT_REQUIRED);
    expect(errors).toContain(ErrorMessages.UnitBuilderForm.ALLY_SUPPORT_LEVEL_REQUIRED);
  });

  it('should throw an error for an invalid hero id_num', async () => {
    const input = { ...validInput, hero: { id_num: 0 } };
    const { errors } = await validateSchema(input) as ValidationError;
    expect(errors.length).toBe(1);
    expect(errors).toContain(ErrorMessages.UnitBuilderForm.HERO_REQUIRED);
  });

  it('should throw an error for min number checks', async () => {
    const input = {
      ...validInput,
      build: {
        ...validInput.build,
        ivs: { boon: -10, bane: -20, floret: -30 },
        rarity: -1,
        merges: -1,
        dragonflowers: -1,
        blessing: -1,
        summonerSupport: -1,
        allySupport: {
          targetIdNum: -1,
          level: -1,
        },
      },
    };
    const { errors } = await validateSchema(input) as ValidationError;
    expect(errors.length).toBe(10);
    expect(errors).toContain(ErrorMessages.UnitBuilderForm.IVS_BOON_MIN);
    expect(errors).toContain(ErrorMessages.UnitBuilderForm.IVS_BANE_MIN);
    expect(errors).toContain(ErrorMessages.UnitBuilderForm.IVS_FLORET_MIN);
    expect(errors).toContain(ErrorMessages.UnitBuilderForm.RARITY_MIN);
    expect(errors).toContain(ErrorMessages.UnitBuilderForm.MERGES_MIN);
    expect(errors).toContain(ErrorMessages.UnitBuilderForm.DRAGONFLOWERS_MIN);
    expect(errors).toContain(ErrorMessages.UnitBuilderForm.BLESSING_MIN);
    expect(errors).toContain(ErrorMessages.UnitBuilderForm.SUMMONER_SUPPORT_MIN);
    expect(errors).toContain(ErrorMessages.UnitBuilderForm.ALLY_SUPPORT_LEVEL_MIN);
    expect(errors).toContain(ErrorMessages.UnitBuilderForm.ALLY_SUPPORT_INVALID_TARGET);
  });

  it('should throw an error for max number checks', async () => {
    const input = {
      ...validInput,
      build: {
        ...validInput.build,
        ivs: { boon: 10, bane: 20, floret: 30 },
        rarity: 1000,
        merges: 1000,
        blessing: 1000,
        summonerSupport: 1000,
        allySupport: {
          level: 1000,
        },
      },
    };
    const { errors } = await validateSchema(input) as ValidationError;
    expect(errors.length).toBe(8);
    expect(errors).toContain(ErrorMessages.UnitBuilderForm.IVS_BOON_MAX);
    expect(errors).toContain(ErrorMessages.UnitBuilderForm.IVS_BANE_MAX);
    expect(errors).toContain(ErrorMessages.UnitBuilderForm.IVS_FLORET_MAX);
    expect(errors).toContain(ErrorMessages.UnitBuilderForm.RARITY_MAX);
    expect(errors).toContain(ErrorMessages.UnitBuilderForm.MERGES_MAX);
    expect(errors).toContain(ErrorMessages.UnitBuilderForm.BLESSING_MAX);
    expect(errors).toContain(ErrorMessages.UnitBuilderForm.SUMMONER_SUPPORT_MAX);
    expect(errors).toContain(ErrorMessages.UnitBuilderForm.ALLY_SUPPORT_LEVEL_MAX);
  });

  it('should throw an error for non-unique ivs', async () => {
    const input = {
      ...validInput, build: { ...validInput.build, ivs: { boon: 1, bane: 1, floret: 1 } },
    };
    const { errors } = await validateSchema(input) as ValidationError;
    expect(errors.length).toBe(4);
    expect(errors).toContain(ErrorMessages.UnitBuilderForm.IVS_BOON_UNIQUE_BANE);
    expect(errors).toContain(ErrorMessages.UnitBuilderForm.IVS_BOON_UNIQUE_FLORET);
    expect(errors).toContain(ErrorMessages.UnitBuilderForm.IVS_BANE_UNIQUE_BOON);
    expect(errors).toContain(ErrorMessages.UnitBuilderForm.IVS_FLORET_UNIQUE_BOON);
  });

  it('should throw an error if boon is not set but bane is when merges = 0', async () => {
    const input = {
      ...validInput,
      build: { ...validInput.build, merges: 0, ivs: { boon: 0, bane: 1, floret: 0 } },
    };
    const { errors } = await validateSchema(input) as ValidationError;

    expect(errors.length).toBe(1);
    expect(errors).toContain(ErrorMessages.UnitBuilderForm.IVS_BOON_SET_IF_MERGE_0_AND_BANE_SET);
  });

  it('should throw an error if bane is not set but boon is when merges = 0', async () => {
    const input = {
      ...validInput,
      build: { ...validInput.build, merges: 0, ivs: { boon: 1, bane: 0, floret: 0 } },
    };
    const { errors } = await validateSchema(input) as ValidationError;

    expect(errors.length).toBe(1);
    expect(errors).toContain(ErrorMessages.UnitBuilderForm.IVS_BANE_SET_IF_MERGE_0_AND_BOON_SET);
  });
});
