import unitBuilderFormSchema from './UnitBuilderFormSchema';
import { IVS, Element, SupportLevel } from '../enums';

describe('unitBuilderFormSchema', () => {
  it('should validate a valid input', async () => {
    const input = {
      maxSkills: false,
      resplendentCostume: true,
      id: '1234',
      buildName: 'My Build',
      hero: {
        id_num: 1,
      },
      build: {
        rarity: 5,
        merges: 5,
        skills: { skill1: 'A', skill2: 'B', skill3: 'C' },
        resplendent: true,
        ivs: { boon: IVS.atk, bane: IVS.res, floret: IVS.neutral },
        dragonflowers: 10,
        blessing: Element.anima,
        summonerSupport: SupportLevel.S,
        allySupport: { targetIdNum: 2, level: SupportLevel.B },
      },
    };
    await expect(unitBuilderFormSchema.validate(input)).resolves.toBe(input);
  });

  it('should throw an error for a missing id', async () => {
    const input = {
      maxSkills: false,
      resplendentCostume: true,
      build: {
        rarity: 5,
        merges: 5,
        skills: { skill1: 'A', skill2: 'B', skill3: 'C' },
        resplendent: true,
        ivs: { boon: IVS.atk, bane: IVS.res, floret: IVS.neutral },
        dragonflowers: 10,
        summonerSupport: SupportLevel.S,
        allySupport: { targetIdNum: 2, level: SupportLevel.B },
      },
    };
    await expect(unitBuilderFormSchema.validate(input)).rejects.toThrowError('id is a required field');
  });

  it('should throw an error for a missing hero', async () => {
    const input = {
      maxSkills: false,
      resplendentCostume: true,
      id: '1234',
      build: {
        rarity: 5,
        merges: 5,
        skills: { skill1: 'A', skill2: 'B', skill3: 'C' },
        resplendent: true,
        ivs: { boon: IVS.atk, bane: IVS.res, floret: IVS.neutral },
        dragonflowers: 10,
        summonerSupport: SupportLevel.S,
        allySupport: { targetIdNum: 2, level: SupportLevel.B },
      },
    };
    await expect(unitBuilderFormSchema.validate(input)).rejects.toThrowError('Hero is required!');
  });

  it('should throw an error for an invalid hero id_num', async () => {
    const input = {
      maxSkills: false,
      resplendentCostume: true,
      id: '1234',
      hero: {
        id_num: 0,
      },
      build: {
        rarity: 5,
        merges: 5,
        skills: { skill1: 'A', skill2: 'B', skill3: 'C' },
        resplendent: true,
        ivs: { boon: IVS.atk, bane: IVS.res, floret: IVS.neutral },
        dragonflowers: 10,
        summonerSupport: SupportLevel.S,
        allySupport: { targetIdNum: 2, level: SupportLevel.B },
      },
    };
    await expect(unitBuilderFormSchema.validate(input)).rejects.toThrowError('Hero is required!');
  });

  it('should throw an error for an invalid ivs', async () => {
    const input = {
      maxSkills: false,
      resplendentCostume: true,
      id: '1234',
      hero: {
        id_num: 1,
      },
      build: {
        rarity: 5,
        merges: 5,
        skills: { skill1: 'A', skill2: 'B', skill3: 'C' },
        resplendent: true,
        ivs: { boon: IVS.atk, bane: -10, floret: IVS.neutral },
        dragonflowers: 10,
        summonerSupport: SupportLevel.S,
        allySupport: { targetIdNum: 2, level: SupportLevel.B },
      },
    };
    await expect(unitBuilderFormSchema.validate(input)).rejects.toThrowError('build.ivs.bane must be greater than or equal to 0');
  });

  it('should throw an error for an invalid blessing', async () => {
    const input = {
      maxSkills: false,
      resplendentCostume: true,
      id: '1234',
      hero: {
        id_num: 1,
      },
      build: {
        rarity: 5,
        merges: 5,
        skills: { skill1: 'A', skill2: 'B', skill3: 'C' },
        resplendent: true,
        ivs: { boon: IVS.atk, bane: IVS.res, floret: IVS.neutral },
        dragonflowers: 10,
        blessing: -10, // invalid
        summonerSupport: SupportLevel.S,
        allySupport: { targetIdNum: 2, level: SupportLevel.B },
      },
    };
    await expect(unitBuilderFormSchema.validate(input)).rejects.toThrowError('build.blessing must be greater than or equal to 0');
  });
});
