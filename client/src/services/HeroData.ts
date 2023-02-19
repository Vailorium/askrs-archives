import { Blessing } from '../enums';
import { HeroDataModel } from '../models/hero';

const HeroData = {
  /**
  * Checks if hero is a Legendary hero
  * @param hero Hero data
  * @returns true if hero is a legendary hero (fire, earth, water, wind)
  */
  isLegendary: (hero: HeroDataModel): boolean => hero.legendary !== null
    && hero.legendary.element >= Blessing.fire && hero.legendary.element <= Blessing.earth,
  /**
   * Checks if hero is a Mythic hero
   * @param hero Hero data
   * @returns true if hero is a mythic hero (light, dark, astra, anima)
   */
  isMythic: (hero: HeroDataModel): boolean => hero.legendary !== null
    && hero.legendary.element >= Blessing.light && hero.legendary.element <= Blessing.anima,
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
};
export default HeroData;
