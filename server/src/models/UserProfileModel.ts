import mongoose, { Schema } from 'mongoose';
import IDBUserProfile from '../interfaces/IDBUserProfile';

const UserProfileSchema: Schema = new Schema({
  uid: { type: String, required: true, index: { unique: true } },
  username: { type: String, required: true, index: { unique: true } },
});
UserProfileSchema.set('timestamps', true);

const UserProfileModel = mongoose.model<IDBUserProfile>('user-profile', UserProfileSchema);
const getUserProfileByUid = async (uid: string): Promise<IDBUserProfile> => {
  const profile = await UserProfileModel.findOne({ uid }).exec();
  if (!profile) {
    throw new Error('User profile not found');
  }
  return profile;
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
  createUserProfile,
  updateUserProfile,
  deleteUserProfile,
};
export default UserProfileModel;
