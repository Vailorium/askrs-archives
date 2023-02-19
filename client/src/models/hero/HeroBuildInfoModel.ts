import { HeroBuildModel } from './HeroBuildModel';
import { HeroDataModel } from './HeroDataModel';

export interface HeroBuildInfoModel {
  hero: HeroDataModel;
  build: HeroBuildModel;
}
