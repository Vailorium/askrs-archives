/* eslint-disable no-bitwise */
import { Element } from '../enums';
import { Legendary, SkillDataModel } from '../models';
import { HeroDataModel } from '../models/hero';

const HeroData = {
  /**
  * Checks if hero is a Legendary hero
  * @param hero Hero data
  * @returns true if hero is a legendary hero (fire, earth, water, wind)
  */
  isLegendary: (hero: HeroDataModel): boolean => hero.legendary !== null
    && hero.legendary.element >= Element.fire && hero.legendary.element <= Element.earth,
  /**
   * Checks if hero is a Mythic hero
   * @param hero Hero data
   * @returns true if hero is a mythic hero (light, dark, astra, anima)
   */
  isMythic: (hero: HeroDataModel): boolean => hero.legendary !== null
    && hero.legendary.element >= Element.light && hero.legendary.element <= Element.anima,
  /**
   * Checks if hero is either Legendary or Mythic
   * @param hero Hero data
   * @returns true if hero is legendary or mythic
   */
  isLegendaryOrMythic: (hero: HeroDataModel): boolean => HeroData.isLegendary(hero)
    || HeroData.isMythic(hero),
  /**
   * Checks if hero has a skill in their base kit
   * @param hero Hero data
   * @param skillId Skill ID to check for
   * @returns true if hero has the skill in their base kit
   */
  hasSkill: (hero: HeroDataModel, skillId: string): boolean => {
    for (let i = 0; i < hero.skills.length; i += 1) {
      for (let j = 0; j < hero.skills[i].length; j += 1) {
        if (hero.skills[i][j] === skillId) {
          return true;
        }
      }
    }
    return false;
  },
  canUseSkill: (hero: HeroDataModel, skill: SkillDataModel): boolean => (
    !skill.enemy_only
      && skill.id_tag !== 'SID_無し'
      && (skill.wep_equip & 2 ** hero.weapon_type) > 0 // and the hero has the correct weapon
      && (skill.mov_equip & 2 ** hero.move_type) > 0 // and the hero has the correct movement
      && (!skill.exclusive || HeroData.hasSkill(hero, skill.id_tag))
  ),
  getLegendaryElementString: (legendary: Legendary | null): string => {
    if (legendary) {
      switch (legendary.element) {
        case Element.fire:
          return 'Fire';
        case Element.water:
          return 'Water';
        case Element.wind:
          return 'Wind';
        case Element.earth:
          return 'Earth';
        case Element.light:
          return 'Light';
        case Element.dark:
          return 'Dark';
        case Element.astra:
          return 'Heaven';
        case Element.anima:
          return 'Logic';
        default:
          console.log('Empty string returned from legendary element', legendary);
          return '';
      }
    }
    console.log('Empty string returned from legendary element', legendary);
    return '';
  },
};
export default HeroData;
