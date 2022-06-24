import { configureStore } from "@reduxjs/toolkit";

import appReducer from "./app"

const store = configureStore({
  reducer: {
    // insert reducers here
    app: appReducer,
  }
})

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;