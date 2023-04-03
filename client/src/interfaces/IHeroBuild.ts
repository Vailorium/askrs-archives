interface IHeroBuild {
  uid: string;
  hero_id_tag: string;
  rarity: number;
  merges: number;
  weapon?: string;
  refine?: string;
  assist?: string;
  special?: string;
  a?: string;
  b?: string;
  c?: string;
  s?: string;
  resplendent?: boolean;
  boon?: number;
  bane?: number;
  floret?: number;
  dragonflowers?: number;
  blessing?: number;
  summoner_support?: number;
  ally_support_target?: string;
  ally_support_level?: number;
}
export default IHeroBuild;
