import mongoose, { Schema } from 'mongoose';
import IHeroBuild from './IHeroBuild';

const HeroBuildSchema: Schema = new Schema({
  uid: { type: String, required: true, index: true },
  heroIdTag: { type: String, required: true, index: true },
  rarity: { type: Number, required: false, default: 0 },
  merges: { type: Number, required: false, default: 0 },
  weapon: { type: String, required: false },
  refine: { type: String, required: false },
  assist: { type: String, required: false },
  special: { type: String, required: false },
  a: { type: String, required: false },
  b: { type: String, required: false },
  c: { type: String, required: false },
  s: { type: String, required: false },
  resplendent: { type: Boolean, required: false },
  boon: { type: Number, required: false, default: 0 },
  bane: { type: Number, required: false, default: 0 },
  floret: { type: Number, required: false, default: 0 },
  dragonflowers: { type: Number, required: false, default: 0 },
  blessing: { type: Number, required: false, default: 0 },
  summonerSupport: { type: Number, required: false, default: 0 },
  allySupportTarget: { type: String, required: false, default: '' },
  allySupportLevel: { type: Number, required: false, default: 0 },
});

HeroBuildSchema.set('timestamps', true);

export default mongoose.model<IHeroBuild>('hero-build', HeroBuildSchema);
