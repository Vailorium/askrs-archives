/* eslint-disable import/no-extraneous-dependencies */
// import { IVS } from '../enums';
// import { Stats, HeroBuildInfoModel } from '../models';
// import StatsCalculator from './StatsCalculator';
// import ExampleBuilds from '../ExampleBuilds';

// describe('StatsCalculator tests', () => {
// eslint-disable-next-line max-len
//   let build: HeroBuildInfoModel; // base marth, +10 merge +15 DF, resplendent, falchion, attack + 3, spd + 2
//   // let fireLegendary: HeroBuildInfoModel; // legendary ephraim
//   // let waterLegendary: HeroBuildInfoModel; // legendary fjorm
//   // let astraMythic: HeroBuildInfoModel; // mythic reginn
//   // let animaMythic: HeroBuildInfoModel; // mythic thrasir
//   // let seasons: number[];
//   // let offSeasons: number[];

//   beforeAll(() => {
//     // seasons = [Blessing.fire, Blessing.water, Blessing.astra, Blessing.anima];
//     // offSeasons = [Blessing.earth, Blessing.wind, Blessing.light, Blessing.dark];
//   });

//   beforeEach(() => {
//     build = JSON.parse(JSON.stringify(ExampleBuilds.basicHero));
//     // fireLegendary = JSON.parse(JSON.stringify(ExampleBuilds.fireLegendaryHero));
//     // waterLegendary = JSON.parse(JSON.stringify(ExampleBuilds.waterLegendaryHero));
//     // astraMythic = JSON.parse(JSON.stringify(ExampleBuilds.astraMythicHero));
//     // animaMythic = JSON.parse(JSON.stringify(ExampleBuilds.animaMythicHero));
//   });

//   describe('StatsCalculator.calculateStats tests', () => {
//     test('it should calculate the stats of a hero', async () => {
//       const calculatedStats: Stats = StatsCalculator.calculateStats(build);

//       expect(calculatedStats).toStrictEqual({
//         hp: 57, atk: 59, spd: 43, def: 38, res: 34,
//       });
//     });

//     test('it should calculate banes if hero has 0 merges', async () => {
//       build.build.merges = 0;
//       const calculatedStats: Stats = StatsCalculator.calculateStats(build);

//       expect(calculatedStats).toStrictEqual({
//         hp: 53, atk: 55, spd: 36, def: 34, res: 30,
//       });
//     });

//     test('it should calculate as a 4 star if the hero is 4 star', async () => {
//       build.build.rarity = 4;
//       const calculatedStats: Stats = StatsCalculator.calculateStats(build);

//       expect(calculatedStats).toStrictEqual({
//         hp: 54, atk: 57, spd: 41, def: 35, res: 32,
//       });
//     });

//     test('it should not add resplendent stats if the hero is resplendent', async () => {
//       build.build.resplendent = false;
//       const calculatedStats: Stats = StatsCalculator.calculateStats(build);

//       expect(calculatedStats).toStrictEqual({
//         hp: 55, atk: 57, spd: 41, def: 36, res: 32,
//       });
//     });

//     test('it should calculate the correct stats for a neutral iv hero', async () => {
//       build.build.ivs.boon = IVS.neutral;

//       const calculatedStats: Stats = StatsCalculator.calculateStats(build);

//       expect(calculatedStats).toStrictEqual({
//         hp: 55, atk: 60, spd: 44, def: 38, res: 34,
//       });
//     });

//     test('it should return blank stats if no hero was provided', async () => {
//       const calculatedStats: Stats = StatsCalculator.calculateStats(null as any);

//       expect(calculatedStats).toStrictEqual({
//         hp: 0, atk: 0, spd: 0, def: 0, res: 0,
//       });
//     });

//     test('expect program to be able to handle incorrect rarities', async () => {
//       build.build.rarity = 9;
//       const calculatedStats: Stats = StatsCalculator.calculateStats(build);

//       expect(calculatedStats).not.toBeInstanceOf(Error);
//     });
//   });

//   // describe('StatsCalculator.calculateStatsAR tests', () => {
//   //   test('it should add mythic stats to relevant blessed hero', async () => {
//   //     build.build.blessing = Blessing.anima;

//   //     const calculatedStats: Stats = StatsCalculator.calculateStatsAR(
//   //       build,
//   //       [animaMythic],
//   //       seasons,
//   //     );

//   //     build.build.blessing = Blessing.astra;

//   //     const calculatedStats2: Stats = StatsCalculator.calculateStatsAR(
//   //       build,
//   //       [astraMythic],
//   //       seasons,
//   //     );

//   //     // Thrasir buffs: +5 HP +5 DEF
//   //     expect(calculatedStats).toStrictEqual({
//   //       hp: 57 + 5, atk: 59, spd: 43, def: 38 + 5, res: 34,
//   //     });

//   //     // Reginn buffs: +5 HP +3 ATK
//   //     expect(calculatedStats2).toStrictEqual({
//   //       hp: 57 + 5, atk: 59 + 3, spd: 43, def: 38, res: 34,
//   //     });
//   //   });

//   //   test('it should add stats from legendary allies', async () => {
//   //     build.build.blessing = Blessing.fire;

//   //     const calculatedStats: Stats = StatsCalculator.calculateStatsAR(
//   //       build,
//   //       [fireLegendary],
//   //       seasons,
//   //     );

//   //     build.build.blessing = Blessing.water;

//   //     const calculatedStats2: Stats = StatsCalculator.calculateStatsAR(
//   //       build,
//   //       [waterLegendary],
//   //       seasons,
//   //     );

//   //     // Ephraim buffs: +3 HP +4 DEF
//   //     expect(calculatedStats).toStrictEqual({
//   //       hp: 57 + 3, atk: 59, spd: 43, def: 38 + 4, res: 34,
//   //     });

//   //     // Fjorm buffs: +3 HP +3 SPD
//   //     expect(calculatedStats2).toStrictEqual({
//   //       hp: 57 + 3, atk: 59, spd: 43 + 3, def: 38, res: 34,
//   //     });
//   //   });

//   //   test('it should not add stats when off-season', async () => {
//   //     build.build.blessing = Blessing.fire;

//   //     const calculatedStats: Stats = StatsCalculator.calculateStatsAR(
//   //       build,
//   //       [fireLegendary],
//   //       offSeasons,
//   //     );

//   //     build.build.blessing = Blessing.anima;

//   //     const calculatedStats2: Stats = StatsCalculator.calculateStatsAR(
//   //       build,
//   //       [animaMythic],
//   //       offSeasons,
//   //     );

//   //     // expected: no buffs because it is not fire season
//   //     expect(calculatedStats).toStrictEqual({
//   //       hp: 57, atk: 59, spd: 43, def: 38, res: 34,
//   //     });

//   //     // expected: no buffs because it is not anima season
//   //     expect(calculatedStats2).toStrictEqual({
//   //       hp: 57, atk: 59, spd: 43, def: 38, res: 34,
//   //     });
//   //   });

//   //   test('it should not add stats if doesnt have relevant blessing', async () => {
//   //     build.build.blessing = Blessing.fire;

//   //     const calculatedStats: Stats = StatsCalculator.calculateStatsAR(
//   //       build,
//   //       [waterLegendary],
//   //       offSeasons,
//   //     );

//   //     build.build.blessing = Blessing.anima;

//   //     const calculatedStats2: Stats = StatsCalculator.calculateStatsAR(
//   //       build,
//   //       [astraMythic],
//   //       offSeasons,
//   //     );

//   //     // expected: no buffs because it is not fire season
//   //     expect(calculatedStats).toStrictEqual({
//   //       hp: 57, atk: 59, spd: 43, def: 38, res: 34,
//   //     });

//   //     // expected: no buffs because it is not anima season
//   //     expect(calculatedStats2).toStrictEqual({
//   //       hp: 57, atk: 59, spd: 43, def: 38, res: 34,
//   //     });
//   //   });

//   //   test('it should add both offense and defense mythic stats to on-season legendary', () => {
//   //     const calculatedStats: Stats = StatsCalculator.calculateStatsAR(
//   //       fireLegendary,
//   //       [astraMythic, animaMythic],
//   //       seasons,
//   //     );

//   //     // Thrasir/Reginn buffs: +10 HP +3 ATK +5 DEF
//   //     expect(calculatedStats).toStrictEqual({
//   //       hp: 43 + 10, atk: 36 + 3, spd: 27, def: 33 + 5, res: 18,
//   //     });
//   //   });

//   //   test('it should not add on-season mythic stats to off-season legendary', () => {
//   //     const calculatedStats: Stats = StatsCalculator.calculateStatsAR(
//   //       fireLegendary,
//   //       [astraMythic, animaMythic],
//   //       [Blessing.earth, Blessing.wind, Blessing.astra, Blessing.anima],
//   //     );

//   //     // expected: no buffs because its not fire season
//   //     expect(calculatedStats).toStrictEqual({
//   //       hp: 43, atk: 36, spd: 27, def: 33, res: 18,
//   //     });
//   //   });

//   //   test('it should not add off-season mythic stats to on-season legendary', () => {
//   //     const calculatedStats: Stats = StatsCalculator.calculateStatsAR(
//   //       fireLegendary,
//   //       [astraMythic, animaMythic],
//   //       [Blessing.fire, Blessing.water, Blessing.light, Blessing.dark],
//   //     );

//   //     // expected: no buffs because its not astra/anima season
//   //     expect(calculatedStats).toStrictEqual({
//   //       hp: 43, atk: 36, spd: 27, def: 33, res: 18,
//   //     });
//   //   });

//   //   test('it should not add legendary stats to another legendary', () => {
//   //     const calculatedStats: Stats = StatsCalculator.calculateStatsAR(
//   //       fireLegendary,
//   //       [fireLegendary],
//   //       seasons,
//   //     );

//   //     // expected: no buffs because legendaries don't give each other buffs
//   //     expect(calculatedStats).toStrictEqual({
//   //       hp: 43, atk: 36, spd: 27, def: 33, res: 18,
//   //     });
//   //   });

//   //   test('mythic heroes shouldnt get buffs at all', () => {
//   //     const calculatedStats: Stats = StatsCalculator.calculateStatsAR(
//   //       animaMythic,
//   //       [animaMythic, astraMythic, fireLegendary, waterLegendary],
//   //       seasons,
//   //     );

//   //     // expected: no buffs because mythic heroes can't get buffs
//   //     expect(calculatedStats).toStrictEqual({
//   //       hp: 40, atk: 33, spd: 39, def: 23, res: 27,
//   //     });
//   //   });
//   // });
// });

// export {};
test('Filler test', async () => {
  expect(1).toBe(1);
});
export {};
