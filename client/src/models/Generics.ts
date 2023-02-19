// Heroes
export type HeroRarity = 'five_star' | 'five_star_four_star' | 'four_star_three_star' | 'none';
export type HeroAvailability = 'seasonal' | 'legendary' | 'mythic' | 'duo' | 'grail' | 'regular' | 'resonant' | 'permanent';
export type AssetFlaw = 'hp' | 'atk' | 'spd' | 'def' | 'res' | 'neutral';
export type Stats = { hp: number, atk: number, spd: number, def: number, res: number };
export type Blessings = null | 'fire' | 'water' | 'earth' | 'wind' | 'light' | 'dark' | 'astra' | 'anima';

// Aether Raids
export type ARTile = { selected?: boolean, slot?: number, uid?: string, image: string, display: string, folder: 'aether_raids' | 'units', type: 'blank' | 'building' | 'trap' | 'decoration' | 'unit' | 'hero' | 'other', permanent: boolean, isSchool: boolean };

export interface Dictionary<T>{
  [key: string]: T;
}
