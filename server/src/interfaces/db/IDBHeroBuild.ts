interface IHeroBuild {
  _id?: string;
  buildName: string;
  uid: string;
  heroIdNum: number;
  rarity: number;
  merges: number;
  weapon?: number;
  refine?: number;
  assist?: number;
  special?: number;
  a?: number;
  b?: number;
  c?: number;
  s?: number;
  resplendent?: boolean;
  boon?: number;
  bane?: number;
  floret?: number;
  dragonflowers?: number;
  blessing?: number;
  summonerSupport?: number;
  allySupportTarget?: number;
  allySupportLevel?: number;
  createdAt?: string;
  updatedAt?: string;
  __v?: string;
}
export default IHeroBuild;
