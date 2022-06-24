import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppStoreState {
  loggedIn: boolean;
  token: string;
}

const initialState: AppStoreState = {
  loggedIn: false,
  token: "",
};

export const appStore = createSlice({
  name: "app",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    }
  }
});

export const { setToken } = appStore.actions;
export default appStore.reducer;