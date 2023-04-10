/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import UnitBuildValuesModel from '../models/UnitBuild/UnitBuildValuesModel';

interface UnitBuilderActiveBuildsState {
  builds: UnitBuildValuesModel[];
}

const initialState: UnitBuilderActiveBuildsState = {
  builds: [],
};

export const unitBuilderActiveBuildsSlice = createSlice({
  name: 'unitBuilderActiveBuilds',
  initialState,
  reducers: {
    addBuild: (state, action: PayloadAction<UnitBuildValuesModel>) => {
      const index = state.builds.findIndex((build) => build.id === action.payload.id);
      if (index === -1) {
        state.builds.push(action.payload);
      }
    },
    removeBuild: (state, action: PayloadAction<string>) => {
      state.builds = state.builds.filter((build) => build.id !== action.payload);
    },
    updateBuild: (state, action: PayloadAction<UnitBuildValuesModel>) => {
      const index = state.builds.findIndex((build) => build.id === action.payload.id);
      if (index !== -1) {
        state.builds[index] = action.payload;
      }
    },
    clearBuilds: (state) => {
      state.builds = [];
    },
  },
});

export const {
  addBuild, removeBuild, updateBuild, clearBuilds,
} = unitBuilderActiveBuildsSlice.actions;

export default unitBuilderActiveBuildsSlice.reducer;
