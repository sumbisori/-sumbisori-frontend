import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserInfo {
  userId: number;
}

export interface UserState {
  userId: number | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  userId: null,
  isAuthenticated: false,
};

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<UserInfo>) => {
      const { userId } = action.payload;
      state.isAuthenticated = true;
      state.userId = userId;
    },
  },
});

export const { setUserId } = user.actions;
export default user.reducer;
