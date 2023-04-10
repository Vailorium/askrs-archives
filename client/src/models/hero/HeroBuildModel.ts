import { SkillDataModel } from '../skill';

export interface HeroBuildModel{
  rarity: number;
  merges: number;
  skills: {
    weapon?: SkillDataModel,
    refine?: SkillDataModel,
    assist?: SkillDataModel,
    special?: SkillDataModel,
    a?: SkillDataModel,
    b?: SkillDataModel,
    c?: SkillDataModel,
    s?: SkillDataModel
  };
  resplendent: boolean;
  ivs: { boon: number, bane: number, floret: number };
  dragonflowers: number;
  blessing: number;
  summonerSupport: number;
  allySupport: { targetIdNum?: number, level: number };
}
