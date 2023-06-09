import { ArticlesModel, HeroBuildInfoModel } from './models';

interface Config {
  title: string;
  version: string;
  articles: ArticlesModel[];
  articleScrollLength: number;
  rarityGrowths: number[];
  emptyBuild: HeroBuildInfoModel;
  SPRITESHEET_WIDTH: number;
  SPRITESHEET_HEIGHT: number;
  SPRITE_HEIGHT: { xs: number, sm: number, md: number, lg: number, xl: number };
  SPRITE_WIDTH: { xs: number, sm: number, md: number, lg: number, xl: number };
  FULL_HEIGHT: { xs: number, sm: number, md: number, lg: number };
  FULL_WIDTH: { xs: number, sm: number, md: number, lg: number };
  CANVAS: {
    // eslint-disable-next-line max-len
    COLORS: { WHITE: string, BLACK: string, YELLOW: string, RED: string, BLUE: string, GREEN: string };
  };
}

/* eslint-disable object-curly-newline */
const config: Config = {
  title: 'Askrs Archives',
  version: '0.4',
  articles: [
    { id: 'version-0.3.12-update', title: "Version 0.3.12 Update - Summer's Dream", img: 'v0312banner.png', text: 'New content includes:\n- New Heroes (Freyja, Norne, Caeda & Plumeria, Freyr, Ogma)\n- New Skills (Def/Res Catch, Dragonskin II, Laws of Sacae II, Flow Refresh, Threat. Spd/Def)\n- New Refines (Expiration, Blizzard, Huginn\'s Egg, Leiptr, Masking Axe, Stout Tomahawk)\n- New Resplendent - Merric', timestamp: '1625553272489' },
    { id: 'version-0.3.11-update', title: 'Version 0.3.11 Update - Legendary Hero Byleth', img: 'v0311banner.png', text: 'New content includes:<ul><li>New Hero (Byleth)</li></ul>', timestamp: '1625028966206' },
    { id: 'version-0.3.10-update', title: 'Version 0.3.10 Update - Summer Vibrance', img: 'v0310banner.png', text: 'New content includes:<ul><li>New Heroes(Hilda, Leonie, Mercedes, Caspar, Ashe)</li><li>New Skills (A/R Far Trace, B Duel Cav, Even Recovery)</li><li>New Resplendent - Celica</li></ul>', timestamp: '1624260257699' },
    { id: 'version-0.3.9-update', title: 'Version 0.3.9 Update - Midpoint (Nott and More!)', img: 'v039banner.png', text: "New content includes:<ul><li>New Heroes (Nott, Tatiana, Zeke, Palla, Fernand, Luthier)</li><li>New Skills (Def/Res Menace, Atk/Spd Menace, R Duel Flying 4)</li><li>New Refines (Vassal's Blade, Hoarfrost Knife, Muninn's Egg, Peshkatz, Skadi)</li><li>New Resplendent - Chrom</li></ul>", timestamp: '1623067081584' },
    { id: 'version-0.3.8-update', title: 'Version 0.3.8 Update - Mythic Hero Ashera', img: 'v038banner.png', text: "New content includes:<ul><li>New Hero (Ashera)</li><li>New Skills (Atk/Res Ideal, Order's Restraint)</li></ul>", timestamp: '1622437931420' },
    { id: 'version-0.3.7-update', title: 'Version 0.3.7 Update - Bridal Grace', img: 'v037banner.png', text: 'New content includes:<ul><li>New Heroes (Shanna, Saul, Juno, Zelot, Catria)</li><li>New Skills (Atk/Def Far Trace, Atk/Def Near Trace, C Duel Cav)</li><li>New Resplendent - Nino</li></ul>', timestamp: '1621495204280' },
    { id: 'version-0.3.6-update', title: 'Version 0.3.6 Update - Forces of Will', img: 'v036banner.png', text: 'New content includes:<ul><li>New Heroes (Edelgard, Dimitri, Morgan M, Morgan F, Orson)</li><li>New Skills (Atk/Def Ideal, Atk/Res Menace, Atk/Def Menace)</li><li>New Resplendent - Leif</li><li>New Refines (Ragnell, Alondite, Gradivus, Raijinto, Siegfried)</li></ul>', timestamp: '1620290298160' },
    { id: 'version-0.3.5-update', title: 'Version 0.3.5 Update - Legendary Hero Sigurd', img: 'v035banner.png', text: 'New content includes:<ul><li>New Hero (Sigurd)</li><li>New Skill (Atk/Def Catch 4)</li></ul>', timestamp: '1619766998214' },
    { id: 'version-0.3.4-update', title: 'Version 0.3.4 Update - Childhood Encounters', img: 'v034banner.png', text: "New content includes:<ul><li>New Heroes (Eirika&Ephraim, Lyon, Tana, L'Arachel, Innes)</li><li>New Skills (Spd/Def Near Trace, Spd/Res Far Trace)</li><li>New Resplendent - Lilina</li></ul>", timestamp: '1618818817269' },
    { id: 'version-0.3.3-update', title: 'Version 0.3.3 Update - Bond of Trust', img: 'v033banner.png', text: "New content includes:<ul><li>New Heroes (Erk, Louise, Pent, Sonia, Farina)</li><li>New Skills (G Duel Infantry 4, Atk/Spd Snag, Atk/Spd Ideal)</li><li>New refines (Berserk Armads, Flower Lance, Gáe Bolg, Grima's Truth, Shamshir)</li></ul>", timestamp: '1617600892000' },
    { id: 'version-0.3.2-update', title: 'Version 0.3.2 Update - Mythic Hero Dagr', img: 'v032banner.png', text: 'New content includes:<ul><li>New Hero - Mythic Hero Dagr</li><li>New Skills Added (Even Tempest)</li></ul>Also fixed a bug with Spring Duo Myrrhs image - she is now not invisible!', timestamp: '1617086350378' },
    { id: 'version-0.3.1-update', title: 'Version 0.3.1 Update - Willful Rabbits', img: 'v031banner.png', text: 'New content includes:<ul><li>New Heroes Added (Severa, Inigo, Myrrh, Minvera, Saleh)</li><li>New Skills Added (R Duel Cavalry, G Duel Flying 4)</li><li>Seals added (Bracing Blow, Spd/Def Solo)</li></ul>Small bug fixes with assets too.', timestamp: '1615965120788' },
    { id: 'version-0.3-update', title: 'Version 0.3 Update - Seeds of Fodlan + QOL Updates', img: 'v03banner.png', text: "New content includes:<ul><li>New Heroes Added (Marianne, Ingrid, Dedue, Linhardt, Solon)</li><li>New Skills Added (B Duel Infantry 4, Atk/Def Near Save)</li><li>New refines added (Grimoire, Ayra's Blade, Ivaldi, Naglfar, Mjolnir)</li></ul>Changes to the website include:<ul><li>Updated Save Image menu to be more efficient, and hopefully fixes some bugs - probably going to have to fix it again</li><li>Changing map has been moved to a dropdown menu</li><li>New pretty buttons for exiting some menus</li><li>New help menu that could help new users</li><li>Reworked add heroes menu to fix bugs and look better</li><li>(some) bugs have been squashed</ul><br />I'm hoping that the next major update will be a lot larger than this one. This also means that it will take longer than this one, so might not be released until around the middle of the year. It'll definitely be worth the wait though :)", timestamp: '1614921532810' },
    { id: 'version-0.2.3-update', title: 'Version 0.2.3 Update - Legendary Hero Claude', img: 'v023banner.png', text: 'New content includes:<ul><li>New Hero Added (Claude)</li><li>New Skills Added (Atk/Spd Catch, Fallen Star)</li></ul>Larger update is coming somewhat soon :)', timestamp: '1614323188825' },
    { id: 'version-0.2.2-update', title: 'Version 0.2.2 Update - Enduring Legacy', img: 'v022banner.png', text: 'New content includes:<ul><li>New Heroes Added (Azelle, Lex, Annand, Díthorba, Erinys)</li><li>New Skills Added (R Duel Infantry 4, B Duel Flying 4)</li></ul>', timestamp: '1613451897556' },
    { id: 'version-0.2.1-update', title: 'Version 0.2.1 Update - Love of a King', img: 'v021banner.png', text: '<p>Just the banner and refines this time.</p>New content includes:<ul><li>New Heroes Added (Líf & Thrasir, Gustav, Henriette, Veronica, Alfonse)</li><li>New Skills Added (D/R Close Save, A/R Far Save, Def/Res Form, Fatal Smoke)</li><li>New Seals Added (Life & Death, Bracing Stance)</li><li>New Refines Added (Meisterschwert, Spy-song Bow, Giga Excalibur, Audhulma)</li></ul>', timestamp: '1612427881770' },
    { id: 'version-0.2-update', title: 'Version 0.2 Update - Seiros Mythic Banner + QOL Updates', img: 'v02banner.png', text: "<p>Larger update this time. Including a few important requested features.</p>Firstly, new content: <ul><li>New Heroes Added (Seiros)</li><li>New Skills Added (Dragon Wall 3, Wings of Light)</li><li>New Weapons Added (Aurora Breath)</li></ul><p>Large numbers of small changes include:</p><ul><li>Moved to HTTPS</li><li>Added a toggleable grid overlay on AR-D Builder</li><li>Added dragging ranges for heroes/structures</li><li>Added asset/flaw colors to the unit build table</li><li>Added dragonflower icon next to count on table</li><li>Added unit/movement type icons to units on grid (toggleable)</li><li>Added UI Icons to buttons</li><li>Added github issues link in report a bug</li><li>Added drag boundary so you can't drag structures/heroes into the abyss</li><li>This page!</li><li>Settings page (will have more settings in the future)</li><li>Image saving - including adding unit builds to the image</li><li>7 Heroes can now be added provided you have a mythic hero that allows you to (i.e. currently just Seiros)</li><li>Heroes now show visibly as resplendent on the map</li></ul><p>Bug fixes include:</p><ul><li>Fixed being able to place structures on defense tiles</li><li>Fixed the resplendent toggle always being off in the edit build menu (even if the hero was set to repslendent on)</li></ul><p>A lot of features for this update came from ideas suggested to me through <a href='https://discord.gg/z9YSeEqzg4' target='_blank'>discord</a>, if you have any useful feedback or just want to chat feel free to drop by.", timestamp: '1611808388015' },
    { id: 'version-0.1.2-update', title: 'Version 0.1.2 Update - Dark Desert Rituals', img: 'v012banner.png', text: '<p>Small content patch.</p>New content includes:<ul><li>New Heroes Added (Dorothea & Lene, Tharja, Raphael, Katarina, Kris)</li><li>New Skills Added (Def/Res Chill, Swift Impact)</li><li>New Seals Added (Brazen Spd/Def, Air Orders)</ul>', timestamp: '1610952749000' },
    { id: 'version-0.1.1-update', title: 'Version 0.1.1 Update - Shared Purpose', img: 'v011banner.png', text: "<p>Content patch - nothing new website wise.</p>New content includes:<ul><li>New Heroes Added (Sara, Rowan, Asbel, Miranda, Veld)</li><li>New Skills Added (Close Ward, Seal Atk/Res, Spd/Res Oath, Swift Stance 3)</li><li>New Weapons Added (Grafcalibur, Indignant Bow, Kia Staff, Arden's Blade, Springtime Staff)<li>New Refines Added (Arden's Blade, Springtime Staff, Forseti, Warrior Princess)</ul>Small bug fixes:<ul><li>Added skill icons for Atk/Def Snag and Res Cantrip</li><li>Fixed Falchion refine issue</li></ul>", timestamp: '1609991958488' },
  ],
  articleScrollLength: 3,
  rarityGrowths: [86, 93, 100, 107, 114],
  emptyBuild: {
    hero: {
      name: '',
      title: '',
      id_tag: '',
      roman: '',
      face_name: '',
      face_name2: '',
      legendary: null,
      dragonflowers: {
        max_count: 0,
        costs: [
        ],
      },
      timestamp: null,
      id_num: 0,
      sort_value: 0,
      origins: 0,
      weapon_type: 0,
      tome_class: 0,
      move_type: 0,
      series: 0,
      regular_hero: false,
      permanent_hero: false,
      base_vector_id: 0,
      refresher: false,
      base_stats: {
        hp: 0,
        atk: 0,
        spd: 0,
        def: 0,
        res: 0,
      },
      growth_rates: {
        hp: 0,
        atk: 0,
        spd: 0,
        def: 0,
        res: 0,
      },
      skills: [
        [
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
        ],
        [
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
        ],
        [
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
        ],
        [
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
        ],
        [
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
        ],
      ],
    },
    build: {
      rarity: 5,
      merges: 0,
      skills: {
        weapon: undefined,
        assist: undefined,
        special: undefined,
        a: undefined,
        b: undefined,
        c: undefined,
        s: undefined,
      },
      resplendent: false,
      ivs: { boon: 0, bane: 0, floret: 0 },
      dragonflowers: 0,
      blessing: 0,
      summonerSupport: 0,
      allySupport: { targetIdNum: undefined, level: 0 },
    },
  },
  SPRITESHEET_WIDTH: 13,
  SPRITESHEET_HEIGHT: 13,
  SPRITE_HEIGHT: {
    xs: 25,
    sm: 38,
    md: 57,
    lg: 76,
    xl: 158,
  },
  SPRITE_WIDTH: {
    xs: 25,
    sm: 38,
    md: 57,
    lg: 76,
    xl: 158,
  },
  FULL_HEIGHT: {
    xs: 480,
    sm: 960,
    md: 1440,
    lg: 1920,
  },
  FULL_WIDTH: {
    xs: 421,
    sm: 842,
    md: 1263,
    lg: 1684,
  },
  CANVAS: {
    COLORS: {
      WHITE: '#FFFFFF',
      BLACK: '#000000',
      YELLOW: '#FEF995',
      BLUE: '#B1ECFA',
      RED: '#F0A5B3',
      GREEN: '#83F646',
    },
  },
};

export default config;
