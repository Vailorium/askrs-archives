from Generics import Stats
import json

class Skill:
  id_tag: str
  refine_base: str | None
  name_id: str
  desc_id: str
  refine_id: str | None
  beast_effect_id: str | None
  prerequisites: list[str | None]
  next_skill: str | None
  sprites: list[str | None]
  stats: Stats
  class_params: Stats
  combat_buffs: Stats
  skill_params: Stats
  skill_params2: Stats
  refine_stats: Stats
  id_num: int
  sort_id: int
  icon_id: int
  wep_equip: int
  mov_equip: int
  sp_cost: int
  category: int
  tome_class: int
  exclusive: bool
  enemy_only: bool
  range: int
  might: int
  cooldown_count: int
  assist_cd: bool
  healing: bool
  skill_range: int
  score: int
  promotion_tier: int
  promotion_rarity: int
  refined: bool
  refine_sort_id: int
  wep_effective: int
  mov_effective: int
  wep_shield: int
  mov_shield: int
  wep_weakness: int
  mov_weakness: int
  wep_adaptive: int
  mov_adaptive: int
  timing_id: int
  ability_id: int
  limit1_id: int
  limit1_params: list[int]
  limit2_id: int
  limit2_params: list[int]
  target_wep: int
  target_mov: int
  passive_next: str | None
  timestamp: str | None
  random_allowed: int
  min_lv: int
  max_lv: int
  tt_inherit_base: bool
  random_mode: int
  limit3_id: int
  limit3_params: list[int]
  range_shape: int
  target_either: bool
  distant_counter: bool
  canto_range: int
  pathfinder_range: int
  arcane_weapon: bool

  def __init__(self, skill_data: dict):
    self.__dict__ = skill_data

skill = """
{
    "id_tag": "SID_第67迷宮の覇者1",
    "refine_base": null,
    "name_id": "MSID_第67迷宮の覇者1",
    "desc_id": "MSID_H_第67迷宮の覇者1",
    "refine_id": null,
    "beast_effect_id": null,
    "prerequisites": [
      null,
      null
    ],
    "next_skill": null,
    "sprites": [
      null,
      null,
      null,
      null
    ],
    "stats": {
      "hp": 0,
      "atk": 1,
      "spd": 0,
      "def": 0,
      "res": 1
    },
    "class_params": {
      "hp": 0,
      "atk": 0,
      "spd": 0,
      "def": 0,
      "res": 0
    },
    "combat_buffs": {
      "hp": 0,
      "atk": 0,
      "spd": 0,
      "def": 0,
      "res": 0
    },
    "skill_params": {
      "hp": 0,
      "atk": 0,
      "spd": 0,
      "def": 0,
      "res": 0
    },
    "skill_params2": {
      "hp": 0,
      "atk": 0,
      "spd": 0,
      "def": 0,
      "res": 0
    },
    "refine_stats": {
      "hp": 0,
      "atk": 0,
      "spd": 0,
      "def": 0,
      "res": 0
    },
    "id_num": 3458,
    "sort_id": 50660,
    "icon_id": 1041,
    "wep_equip": 16777215,
    "mov_equip": 15,
    "sp_cost": 80,
    "category": 6,
    "tome_class": 0,
    "exclusive": false,
    "enemy_only": false,
    "range": 0,
    "might": 0,
    "cooldown_count": 0,
    "assist_cd": false,
    "healing": false,
    "skill_range": 0,
    "score": 2,
    "promotion_tier": 0,
    "promotion_rarity": 0,
    "refined": false,
    "refine_sort_id": 0,
    "wep_effective": 0,
    "mov_effective": 0,
    "wep_shield": 0,
    "mov_shield": 0,
    "wep_eff_weakness": 0,
    "mov_eff_weakness": 0,
    "wep_weakness": 0,
    "mov_weakness": 0,
    "wep_adaptive": 0,
    "mov_adaptive": 0,
    "timing_id": 0,
    "ability_id": 0,
    "limit1_id": 0,
    "limit1_params": [
      0,
      0
    ],
    "limit2_id": 0,
    "limit2_params": [
      0,
      0
    ],
    "target_wep": 0,
    "target_mov": 0,
    "passive_next": null,
    "timestamp": null,
    "random_allowed": 0,
    "min_lv": 0,
    "max_lv": 0,
    "tt_inherit_base": false,
    "random_mode": 0,
    "limit3_id": 0,
    "limit3_params": [
      0,
      0
    ],
    "range_shape": 0,
    "target_either": false,
    "distant_counter": false,
    "canto_range": 0,
    "pathfinder_range": 0,
    "arcane_weapon": false
  }
"""

new_skill = Skill(json.loads(skill))

print(new_skill.stats)