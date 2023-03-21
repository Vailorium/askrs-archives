/* eslint-disable no-bitwise */
export enum IVS {
  neutral,
  hp,
  atk,
  spd,
  def,
  res,
}

export enum Element{
  none,
  fire,
  water,
  wind,
  earth,
  light,
  dark,
  astra,
  anima,
}

export enum MovementType{
  infantry,
  armor,
  cavalry,
  flying,
}

export enum WeaponType{
  sword,
  lance,
  axe,
  red_bow,
  blue_bow,
  green_bow,
  colorless_bow,
  red_dagger,
  blue_dagger,
  green_dagger,
  colorless_dagger,
  red_tome,
  blue_tome,
  green_tome,
  colorless_tome,
  staff,
  red_breath,
  blue_breath,
  green_breath,
  colorless_breath,
  red_beast,
  blue_beast,
  green_beast,
  colorless_beast,
}

export enum Origin{
  none = 0,
  heroes = 1 << 0,
  shadow_dragon_new_mystery = 1 << 1,
  echoes = 1 << 2,
  genealogy = 1 << 3,
  thracia = 1 << 4,
  binding = 1 << 5,
  blazing = 1 << 6,
  sacred = 1 << 7,
  path = 1 << 8,
  dawn = 1 << 9,
  awakening = 1 << 11,
  fates = 1 << 12,
  houses = 1 << 13,
  mirage = 1 << 14,
}

export enum Buildings{
  aether_amphorae,
  aether_fountain,
  armor_school,
  bolt_tower,
  bright_shrine,
  catapult,
  cavalry_school,
  dark_shrine,
  duos_hindrance,
  flier_school,
  fortress,
  healing_tower,
  infantry_school,
  panic_manor,
  tactics_room,
}

export enum Traps{
  bolt_trap,
  fake_bolt_trap,
  heavy_trap,
  fake_heavy_trap,
}

export enum Decorations{
  dining_hall,
  field,
  hot_spring,
  inn,
}

export enum Maps{
  springwater,
  wintry,
  abandoned_castle,
  snowdust,
  desert,
  spring_breeze,
  leafy_canopy,
  lost_castle,
  bright_grassland,
  lava_floes,
}

export enum Kind{
  none,
  blessed,
  duo,
  harmonic,
  ascended,
  rearmed,
}

export enum SupportLevel {
  none,
  C,
  B,
  A,
  S,
}

export enum SkillCategory {
  Weapon,
  Assist,
  Special,
  A,
  B,
  C,
  S,
  Refine,
  Beast,
}
