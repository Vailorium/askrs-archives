import _heroList from './heroes/hero_list.json';
import _resplendentList from './heroes/resplendent_list.json';
import _skillList from './skills/skill_list.json';
import _sealList from './skills/seal_list.json';
import { HeroDataModel } from '../models/hero';
import { SkillDataModel } from '../models/skill';

export default {
  heroList: _heroList as HeroDataModel[],
  resplendentList: _resplendentList as string[],
  skillList: _skillList as SkillDataModel[],
  sealList: _sealList as string[],
};
