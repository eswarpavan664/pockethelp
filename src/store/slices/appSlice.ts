import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState } from '../../types';

const initialState: AppState = {
  isFirstLaunch: true,
  isLoading: true,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setFirstLaunch: (state, action: PayloadAction<boolean>) => {
      state.isFirstLaunch = action.payload;
    },
    setAppLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    initializeApp: (state) => {
      state.isLoading = false;
    },
  },
});

export const { setFirstLaunch, setAppLoading, initializeApp } = appSlice.actions;
export default appSlice.reducer;
