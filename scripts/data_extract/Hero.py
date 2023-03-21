from Generics import Stats
import json

class Legendary:
  duo_skill_id: str | None
  bonus_effect: Stats
  kind: int
  element: int
  bst: int
  pair_up: bool
  ae_extra: bool

class Dragonflowers:
  max_count: int
  costs: list[int]

class Hero:
  id_tag: str
  roman: str
  face_name: str
  face_name2: str
  legendary: Legendary | None
  dragonflowers: Dragonflowers
  timestamp: str | None
  id_num: int
  sort_value: int
  origins: int
  weapon_type: int
  tome_class: int
  move_type: int
  series: int
  regular_hero: bool
  permanent_hero: bool
  base_vector_id: int
  refresher: bool
  base_stats: Stats
  growth_rates: Stats
  skills: list[list[str | None]]

  def __init__(self, hero_data: dict):
    self.__dict__ = hero_data