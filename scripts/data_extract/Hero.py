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

hero = """
{
  "id_tag": "PID_神階フォデス",
  "roman": "FODES_GOD01",
  "face_name": "ch08_31_Fodes_M_God01",
  "face_name2": "ch08_31_Fodes_M_God01",
  "legendary": {
    "duo_skill_id": null,
    "bonus_effect": {
      "hp": 5,
      "atk": 0,
      "spd": 4,
      "def": 0,
      "res": 0
    },
    "kind": 1,
    "element": 8,
    "bst": 0,
    "pair_up": false,
    "ae_extra": true
  },
  "dragonflowers": {
    "max_count": 5,
    "costs": [
      40,
      80,
      120,
      160,
      200
    ]
  },
  "timestamp": null,
  "id_num": 910,
  "version_num": 701,
  "sort_value": 900900,
  "origins": 128,
  "weapon_type": 23,
  "tome_class": 0,
  "move_type": 1,
  "series": 7,
  "random_pool": 0,
  "permanent_hero": false,
  "base_vector_id": 74,
  "refresher": false,
  "base_stats": {
    "hp": 21,
    "atk": 13,
    "spd": 4,
    "def": 8,
    "res": 8
  },
  "growth_rates": {
    "hp": 55,
    "atk": 70,
    "spd": 25,
    "def": 85,
    "res": 80
  },
  "skills": [
    [
      "SID_幼獣の化身・重装",
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
      "SID_鎧の護り手・遠間1",
      null,
      null
    ],
    [
      "SID_若獣の化身・重装",
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
      "SID_鎧の護り手・遠間2",
      null,
      null
    ],
    [
      "SID_若獣の化身・重装",
      null,
      null,
      null,
      null,
      null,
      "SID_成獣の化身・重装",
      null,
      "SID_蛍火",
      null,
      "SID_絶対化身・追撃1",
      null,
      null,
      null
    ],
    [
      "SID_成獣の化身・重装",
      null,
      "SID_蛍火",
      null,
      null,
      null,
      null,
      null,
      "SID_緋炎",
      null,
      "SID_絶対化身・追撃2",
      "SID_鎧の護り手・遠間3",
      null,
      null
    ],
    [
      "SID_滅びの魔拳",
      null,
      "SID_蛍火",
      null,
      null,
      null,
      null,
      null,
      null,
      "SID_漆黒の悪夢",
      "SID_絶対化身・追撃3",
      null,
      null,
      null
    ]
  ]
}
"""
new_hero = Hero(json.loads(hero))

print(new_hero.id_tag)