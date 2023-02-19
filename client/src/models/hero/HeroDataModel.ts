import { Stats } from '../Generics';

export interface HeroDataModel{
  name: string;
  title: string;
  id_tag: string;
  roman: string;
  face_name: string;
  face_name2: string;
  legendary: {
    duo_skill_id: string;
    bonus_effect: Stats;
    kind: number;
    element: number;
    bst: number;
    pair_up: boolean;
    ae_extra: boolean;
  } | null,
  dragonflowers: {
    max_count: number;
    costs: number[];
  },
  timestamp: string | null;
  id_num: number;
  sort_value: number;
  origins: number;
  weapon_type: number;
  tome_class: number;
  move_type: number;
  series: number;
  regular_hero: boolean;
  permanent_hero: boolean;
  base_vector_id: number;
  refresher: boolean;
  base_stats: Stats;
  growth_rates: Stats;
  skills: (string | null)[][];
}
