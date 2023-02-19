import type { Artifact } from './types/artifact';
import type { Character } from './types/character';
import type { Food } from './types/food';
import type { Weapon } from './types/weapon';
import type { CommonMaterial } from './types/common_material';
import type { ElementalStoneMaterial } from './types/elemental_stone_material';
import type { Ingredients } from './types/ingredient';
import type { JewelMaterial } from './types/jewel_material';
import type { LocalMaterial } from './types/local_material';
import type { Potion } from './types/potion';
import type { TalentLvlUpMaterial } from './types/talent_lvl_up_material';
import type { WeaponPrimaryMaterial } from './types/weapon_primary_material';
import type { WeaponSecondaryMaterial } from './types/weapon_secondary_material';
import type { Bait, Fish, FishingRod } from './types/fishing';
import type { ExpMaterial } from './types/exp';
import type { AchievementCategory, Achievement } from './types/achievement';
import type { Furnishing } from './types/furnishing';
import type { Domains } from './types/domain';

export type Material =
  | CommonMaterial
  | ElementalStoneMaterial
  | JewelMaterial
  | LocalMaterial
  | Potion
  | TalentLvlUpMaterial
  | WeaponPrimaryMaterial
  | WeaponSecondaryMaterial;

export type {
  AchievementCategory,
  Achievement,
  Artifact,
  Character,
  Weapon,
  CommonMaterial,
  Domains,
  ElementalStoneMaterial,
  ExpMaterial,
  Food,
  Ingredients,
  JewelMaterial,
  LocalMaterial,
  Potion,
  TalentLvlUpMaterial,
  WeaponPrimaryMaterial,
  WeaponSecondaryMaterial,
  Bait,
  Fish,
  FishingRod,
  Furnishing,
};

export const languages = [
  'english',
  'spanish',
  'japanese',
  'chinese-simplified',
  'chinese-traditional',
  'french',
  'german',
  'indonesian',
  'korean',
  'portuguese',
  'russian',
  'thai',
  'vietnamese',
] as const;

export type Languages = typeof languages[number];

export const days = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
] as const;
