/* eslint-disable no-bitwise */
import randomstring from 'randomstring';
import {
  Element, IVS, SupportLevel, WeaponType,
} from '../enums';
import IHeroBuild from '../interfaces/IHeroBuild';
import { Legendary, SkillDataModel } from '../models';
import UnitBuildValuesModel from '../models/UnitBuild/UnitBuildValuesModel';
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
  getHeroByIdNum(idNum: number | undefined, heroList: HeroDataModel[]): HeroDataModel | undefined {
    if (!idNum) {
      return undefined;
    }
    let start = 0;
    let end = heroList.length - 1;

    while (start <= end) {
      const middle = Math.floor((start + end) / 2);

      if (heroList[middle].id_num === idNum) {
        return heroList[middle];
      }

      if (heroList[middle].id_num < idNum) {
        start = middle + 1;
      } else {
        end = middle - 1;
      }
    }
    return undefined;
  },
  getSkillByIdNum(
    idNum: number | undefined, skillList: SkillDataModel[],
  ): SkillDataModel | undefined {
    if (!idNum) {
      return undefined;
    }
    let start = 0;
    let end = skillList.length - 1;

    while (start <= end) {
      const middle = Math.floor((start + end) / 2);

      if (skillList[middle].id_num === idNum) {
        return skillList[middle];
      }

      if (skillList[middle].id_num < idNum) {
        start = middle + 1;
      } else {
        end = middle - 1;
      }
    }
    return undefined;
  },
  convertToFullBuild(
    build: IHeroBuild,
    heroList: HeroDataModel[],
    skillList: SkillDataModel[],
  ): UnitBuildValuesModel {
    const unitBuild: UnitBuildValuesModel = {
      hero: this.getHeroByIdNum(build.heroIdNum, heroList) as HeroDataModel,
      build: {
        rarity: build.rarity,
        merges: build.merges,
        skills: {
          weapon: this.getSkillByIdNum(build.weapon, skillList),
          refine: this.getSkillByIdNum(build.refine, skillList),
          assist: this.getSkillByIdNum(build.assist, skillList),
          special: this.getSkillByIdNum(build.special, skillList),
          a: this.getSkillByIdNum(build.a, skillList),
          b: this.getSkillByIdNum(build.b, skillList),
          c: this.getSkillByIdNum(build.c, skillList),
          s: this.getSkillByIdNum(build.s, skillList),
        },
        resplendent: !!build.resplendent,
        ivs: {
          boon: build.boon ? build.boon : IVS.neutral,
          bane: build.bane ? build.bane : IVS.neutral,
          floret: build.floret ? build.floret : IVS.neutral,
        },
        dragonflowers: build.dragonflowers ? build.dragonflowers : 0,
        blessing: build.blessing ? build.blessing : Element.none,
        summonerSupport: build.summonerSupport ? build.summonerSupport : SupportLevel.none,
        allySupport: {
          targetIdNum: build.allySupportTarget,
          level: build.allySupportLevel ? build.allySupportLevel : SupportLevel.none,
        },
      },
      maxSkills: true,
      resplendentCostume: !!build.resplendent,
      // eslint-disable-next-line no-underscore-dangle
      id: build._id ? build._id : randomstring.generate(),
      buildName: build.buildName ? build.buildName : '',
      uid: build.uid ? build.uid : undefined,
    };

    return unitBuild;
  },
  getHeroColor(hero: HeroDataModel): 'red' | 'blue' | 'green' | 'colorless' {
    switch (hero.weapon_type) {
      case WeaponType.red_beast:
        return 'red';
      case WeaponType.red_bow:
        return 'red';
      case WeaponType.red_breath:
        return 'red';
      case WeaponType.red_dagger:
        return 'red';
      case WeaponType.red_tome:
        return 'red';
      case WeaponType.sword:
        return 'red';
      case WeaponType.blue_beast:
        return 'blue';
      case WeaponType.blue_bow:
        return 'blue';
      case WeaponType.blue_breath:
        return 'blue';
      case WeaponType.blue_dagger:
        return 'blue';
      case WeaponType.blue_tome:
        return 'blue';
      case WeaponType.lance:
        return 'blue';
      case WeaponType.green_beast:
        return 'green';
      case WeaponType.green_bow:
        return 'green';
      case WeaponType.green_breath:
        return 'green';
      case WeaponType.green_dagger:
        return 'green';
      case WeaponType.green_tome:
        return 'green';
      case WeaponType.axe:
        return 'green';
      case WeaponType.colorless_beast:
        return 'colorless';
      case WeaponType.colorless_bow:
        return 'colorless';
      case WeaponType.colorless_breath:
        return 'colorless';
      case WeaponType.colorless_dagger:
        return 'colorless';
      case WeaponType.colorless_tome:
        return 'colorless';
      case WeaponType.staff:
        return 'colorless';
      default:
        return 'red';
    }
  },
};
export default HeroData;
