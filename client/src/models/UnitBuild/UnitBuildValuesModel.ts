import { HeroBuildInfoModel } from '..';

interface UnitBuildValuesModel extends HeroBuildInfoModel {
  maxSkills: boolean;
  resplendentCostume: boolean;
  id?: string;
  buildName: string;
}
export default UnitBuildValuesModel;
