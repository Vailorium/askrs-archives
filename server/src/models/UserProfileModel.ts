import mongoose, { ObjectId, Schema } from 'mongoose';
import IDBUserProfile from '../interfaces/db/IDBUserProfile';

const UserProfileSchema: Schema = new Schema({
  uid: { type: String, required: true, index: { unique: true } },
  username: { type: String, required: true, index: { unique: true } },
  picture: { type: Number, required: true, default: 21 },
  friendCode: { type: String, required: false },
  socials: {
    type: {
      reddit: { type: String, required: false },
      twitter: { type: String, required: false },
      youtube: { type: String, required: false },
      _id: false,
    },
    default: {},
  },
  favoriteHeroes: {
    type: Array<Number>,
    required: true,
    default: [],
  },
  favoriteBuilds: {
    type: Array<ObjectId>,
    required: true,
    default: [],
    ref: 'hero-builds',
  },
  favoriteARD: {
    type: Array<ObjectId>,
    required: true,
    default: [],
    // TODO ref: 'hero-builds',
  },
  favoriteARO: {
    type: Array<ObjectId>,
    required: true,
    default: [],
    // TODO ref: 'hero-builds',
  },
}, { _id: false, timestamps: true });

const UserProfileModel = mongoose.model<IDBUserProfile>('user-profile', UserProfileSchema);

const getUserProfileByUid = async (uid: string): Promise<IDBUserProfile> => {
  const profile = await UserProfileModel.findOne({ uid }).exec();
  if (!profile) {
    throw new Error('User profile not found');
  }
  return profile.toObject();
};

const getUserProfileByUsername = async (username: string): Promise<IDBUserProfile> => {
  const profile = await UserProfileModel.findOne({ username }).exec();
  if (!profile) {
    throw new Error('User profile not found');
  }
  return profile.toObject();
};

const createUserProfile = async (profileData: IDBUserProfile): Promise<IDBUserProfile> => {
  const profile = new UserProfileModel(profileData);
  return profile.save();
};

const updateUserProfile = async (
  uid: string, profileData: IDBUserProfile,
): Promise<IDBUserProfile | null> => {
  const updatedProfile = UserProfileModel.findOneAndUpdate(
    { uid }, profileData, { new: true },
  ).exec();
  return updatedProfile;
};

const deleteUserProfile = async (uid: string): Promise<boolean> => {
  const result = await UserProfileModel.deleteOne({ uid }).exec();
  if (result.deletedCount > 0) {
    return true;
  }
  return false;
};

export {
  getUserProfileByUid,
  getUserProfileByUsername,
  createUserProfile,
  updateUserProfile,
  deleteUserProfile,
};
export default UserProfileModel;
