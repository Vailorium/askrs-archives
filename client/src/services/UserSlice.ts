/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserProfile {
  username: string | null;
}

interface UserState {
  profile: UserProfile;
}

export const initialUserState: UserState = {
  profile: {
    username: null,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    setProfile(state, action: PayloadAction<UserProfile>) {
      console.log('Profile being set', action.payload);
      state.profile = action.payload;
    },
  },
});

export const { setProfile } = userSlice.actions;
export default userSlice.reducer;
