import mongoose, { Schema } from 'mongoose';
import IHeroBuild from '../interfaces/IHeroBuild';

const HeroBuildSchema: Schema = new Schema({
  uid: { type: String, required: true, index: true },
  buildName: { type: String, required: true },
  heroIdNum: { type: Number, required: true, index: true },
  rarity: { type: Number, required: false, default: 0 },
  merges: { type: Number, required: false, default: 0 },
  weapon: { type: Number, required: false },
  refine: { type: Number, required: false },
  assist: { type: Number, required: false },
  special: { type: Number, required: false },
  a: { type: Number, required: false },
  b: { type: Number, required: false },
  c: { type: Number, required: false },
  s: { type: Number, required: false },
  resplendent: { type: Boolean, required: false, default: false },
  boon: { type: Number, required: false, default: 0 },
  bane: { type: Number, required: false, default: 0 },
  floret: { type: Number, required: false, default: 0 },
  dragonflowers: { type: Number, required: false, default: 0 },
  blessing: { type: Number, required: false, default: 0 },
  summonerSupport: { type: Number, required: false, default: 0 },
  allySupportTarget: { type: Number, required: false },
  allySupportLevel: { type: Number, required: false, default: 0 },
});
HeroBuildSchema.set('timestamps', true);

const HeroBuildModel = mongoose.model<IHeroBuild>('hero-build', HeroBuildSchema);

const getHeroBuildByBuildId = async (buildId: string): Promise<IHeroBuild> => {
  const build = await HeroBuildModel.findOne({ _id: buildId }).exec();

  if (!build) {
    throw new Error('Build not found');
  }
  return build;
};

const getHeroBuildsByUid = async (uid: string): Promise<IHeroBuild[]> => {
  const builds = await HeroBuildModel.find({ uid }).exec();
  return builds;
};

const getHeroBuildsByHeroIdTag = async (heroIdTag: string): Promise<IHeroBuild[]> => {
  const builds = await HeroBuildModel.find({ heroIdTag }).exec();
  return builds;
};

const createHeroBuild = async (buildData: IHeroBuild): Promise<IHeroBuild> => {
  const build = new HeroBuildModel(buildData);
  return build.save();
};

const updateHeroBuild = async (
  buildId: string, buildData: IHeroBuild,
): Promise<IHeroBuild | null> => {
  const updatedBuild = HeroBuildModel.findOneAndUpdate(
    { _id: buildId }, buildData, { new: true },
  ).exec();
  return updatedBuild;
};

const deleteHeroBuild = async (buildId: string): Promise<boolean> => {
  const result = await HeroBuildModel.deleteOne({ _id: buildId }).exec();
  if (result.deletedCount > 0) {
    return true;
  }
  return false;
};

export {
  getHeroBuildByBuildId,
  getHeroBuildsByHeroIdTag,
  getHeroBuildsByUid,
  createHeroBuild,
  updateHeroBuild,
  deleteHeroBuild,
};
export default HeroBuildModel;
