interface IHeroBuild {
  _id?: string;
  uid: string;
  heroIdTag: string;
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
  summonerSupport?: number;
  allySupportTarget?: string;
  allySupportLevel?: number;
  createdAt?: string;
  updatedAt?: string;
  __v?: string;
}
export default IHeroBuild;
