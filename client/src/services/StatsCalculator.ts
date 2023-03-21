import { Stats, HeroBuildInfoModel, HeroDataModel } from '../models';
import { Element, IVS } from '../enums';
import config from '../config';
import HeroData from './HeroData';

class StatsCalculator {
  static addStats = (...statsList: Stats[]) => {
    const c: Stats = {
      hp: 0, atk: 0, spd: 0, def: 0, res: 0,
    };
    Object.keys(c).forEach((stat) => {
      const key = stat as keyof Stats;
      statsList.forEach((statList: Stats) => {
        c[key] += statList[key];
      });
    });
    return c;
  };

  // eslint-disable-next-line max-len
  static caluclateDragonflowerStats = (dragonflowerCount: number, dragonflowerOrder: string[]): Stats => {
    const stats: Stats = {
      hp: 0, atk: 0, spd: 0, def: 0, res: 0,
    };

    for (let i = 0; i < dragonflowerCount; i += 1) {
      const stat = dragonflowerOrder[i % dragonflowerOrder.length];
      stats[stat as keyof Stats] += 1;
    }

    return stats;
  };

  // eslint-disable-next-line max-len
  static calculateMergeStats = (ivs: { boon: IVS, bane: IVS }, merges: number, mergeOrder: string[]): Stats => {
    const stats: Stats = {
      hp: 0, atk: 0, spd: 0, def: 0, res: 0,
    };

    for (let i = 0; i < merges; i += 1) {
      // neutral iv increase. boon iv increase is done when increasing bst & growth value for stat
      if (i === 0 && ivs.boon === IVS.neutral) {
        const statsTop = mergeOrder.slice(0, 3);
        statsTop.forEach((stat) => { stats[stat as keyof Stats] += 1; });
      }
      for (let j = 0; j < 2; j += 1) {
        const stat = mergeOrder[((i * 2) + j) % mergeOrder.length];
        stats[stat as keyof Stats] += 1;
      }
    }

    return stats;
  };

  static calculateStats = (buildData: HeroBuildInfoModel): Stats => {
    // From: https://feheroes.fandom.com/wiki/Stat_growth
    const stats: Stats = {
      hp: 0, atk: 0, spd: 0, def: 0, res: 0,
    };

    if (!buildData || !buildData.hero || !buildData.hero.id_tag) {
      return stats; // returns 0's for stats
    }

    const bst: Stats = { ...buildData.hero.base_stats };

    // orders stats by size (forces HP to be last stat)
    const orderedStats: string[] = Object.keys(bst).sort((a, b) => (b === 'hp' ? -1 : bst[b as keyof Stats] - bst[a as keyof Stats]));

    // orders stats by size
    const orderedStatsMergesDragonflowers: string[] = Object.keys(bst).sort(
      (a, b) => bst[b as keyof Stats] - bst[a as keyof Stats],
    );

    // BST in data is for 3*, for 4* and 5* BST is higher
    if (buildData.build.rarity === 4) {
      for (let i = 0; i < 2; i += 1) {
        const stat = orderedStats[i];
        bst[stat as keyof Stats] += 1;
      }
    } else if (buildData.build.rarity === 5) {
      for (let i = 0; i < 5; i += 1) {
        const stat = orderedStats[i];
        bst[stat as keyof Stats] += 1;
      }
    }

    // update bst and growths based on ivs
    const growths = { ...buildData.hero.growth_rates };
    if (buildData.build.ivs.boon !== 0) {
      growths[IVS[buildData.build.ivs.boon] as keyof Stats] += 5;
      bst[IVS[buildData.build.ivs.boon] as keyof Stats] += 1;
    }
    if (buildData.build.ivs.floret !== 0
      && buildData.build.ivs.floret !== buildData.build.ivs.boon) {
      growths[IVS[buildData.build.ivs.floret] as keyof Stats] += 5;
      bst[IVS[buildData.build.ivs.floret] as keyof Stats] += 1;
    }
    if (buildData.build.ivs.bane !== 0 && buildData.build.merges === 0) {
      growths[IVS[buildData.build.ivs.bane] as keyof Stats] -= 5;
      bst[IVS[buildData.build.ivs.bane] as keyof Stats] -= 1;
    }

    Object.keys(growths).forEach((stat) => {
      const statName = stat as keyof Stats;
      // Formula: Floor(Level Increase * (Floor(stat growth * rarity multiplier)))
      // Level Increase is 39 as this is based on level 40
      // Divisons are required in this order to avoid floating point errors
      const level40Stat = Math.floor(
        39 * (Math.floor(
          (growths[stat as keyof Stats] * config.rarityGrowths[buildData.build.rarity - 1]) / 100,
        ) / 100
        ),
      );

      // adds skill stat increases to stats (e.g. Atk+3)
      // adds resplendent stat increases (+2)
      stats[statName] = bst[statName]
      + level40Stat
      + (buildData.build.skills.weapon ? buildData.build.skills.weapon.stats[statName] : 0)
      + (buildData.build.skills.assist ? buildData.build.skills.assist.stats[statName] : 0)
      + (buildData.build.skills.special ? buildData.build.skills.special.stats[statName] : 0)
      + (buildData.build.skills.a ? buildData.build.skills.a.stats[statName] : 0)
      + (buildData.build.skills.b ? buildData.build.skills.b.stats[statName] : 0)
      + (buildData.build.skills.c ? buildData.build.skills.c.stats[statName] : 0)
      + (buildData.build.skills.s ? buildData.build.skills.s.stats[statName] : 0)
      + (buildData.build.resplendent === true ? 2 : 0);
    });

    const bonusStatsMerges = StatsCalculator.calculateMergeStats(
      buildData.build.ivs,
      buildData.build.merges,
      orderedStatsMergesDragonflowers,
    );

    const bonusStatsDragonflowers = StatsCalculator.caluclateDragonflowerStats(
      buildData.build.dragonflowers,
      orderedStatsMergesDragonflowers,
    );

    // Add merges and dragonflowers stats
    Object.keys(stats).forEach((stat) => {
      const key = stat as keyof Stats;
      stats[key] += bonusStatsMerges[key] + bonusStatsDragonflowers[key];
    });

    // add weapon might to atk stat
    stats.atk += buildData.build.skills.weapon ? buildData.build.skills.weapon.might : 0;

    return stats;
  };

  // eslint-disable-next-line max-len
  static calculateStatsLegendary = (buildData: HeroBuildInfoModel, allies: HeroDataModel[], season: number[]): Stats => {
    let stats = {
      hp: 0, atk: 0, spd: 0, def: 0, res: 0,
    };
    // if hero isn't legendary/mythic and has a blessing
    if (buildData.build.blessing !== Element.none
      && !HeroData.isLegendaryOrMythic(buildData.hero)) {
      allies.forEach((ally) => {
        // if hero has correct blessing and blessing is on season
        // and hero is not mythic
        if (
          HeroData.isLegendary(ally) // ally is legendary
          && buildData.build.blessing === ally.legendary?.element // blessing == ally element
          && season.includes(ally.legendary?.element) // ally is on-season
        ) {
          stats = StatsCalculator.addStats(stats, ally.legendary?.bonus_effect);
        }
      });
    }
    return stats;
  };

  // eslint-disable-next-line max-len
  static calculateStatsMythic = (buildData: HeroBuildInfoModel, allies: HeroDataModel[], season: number[]): Stats => {
    let stats = {
      hp: 0, atk: 0, spd: 0, def: 0, res: 0,
    };
    // if hero isn't mythic or unblessed
    if (buildData.build.blessing !== Element.none
        && !HeroData.isMythic(buildData.hero)) {
      allies.forEach((ally) => {
        // if ally blessing is mythic and this ally is on-season mythic
        // and the hero is on-season legendary or is blessed with mythic blessing
        if (
          HeroData.isMythic(ally) // ally is mythic
          && ally.legendary !== null // have to do this for typecheck thanks TS :^)
          && season.includes(ally.legendary?.element) // ally is on-season
          && ((HeroData.isLegendary(buildData.hero) && buildData.hero.legendary !== null
            && season.includes(buildData.hero.legendary?.element)) // if is on season legendary
            || buildData.build.blessing === ally.legendary?.element) // or has right blessing
        ) {
          stats = StatsCalculator.addStats(stats, ally.legendary?.bonus_effect);
        }
      });
    }

    return stats;
  };

  // eslint-disable-next-line max-len
  static calculateStatsAR = (buildData: HeroBuildInfoModel, allies: HeroDataModel[], season: number[]): Stats => {
    const heroCalculatedStats = StatsCalculator.calculateStats(buildData);
    const heroLegendaryBuffs = StatsCalculator.calculateStatsLegendary(buildData, allies, season);
    const heroMythicBuffs = StatsCalculator.calculateStatsMythic(buildData, allies, season);

    const ARStats = StatsCalculator.addStats(
      heroCalculatedStats,
      heroLegendaryBuffs,
      heroMythicBuffs,
    );

    return ARStats;
  };
}
export default StatsCalculator;
