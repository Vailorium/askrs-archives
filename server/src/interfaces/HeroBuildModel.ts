import mongoose, { Schema } from 'mongoose';
import IHeroBuild from './IHeroBuild';

const HeroBuildSchema: Schema = new Schema({
  uid: { type: String, required: true, index: true },
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

export default mongoose.model<IHeroBuild>('hero-build', HeroBuildSchema);
