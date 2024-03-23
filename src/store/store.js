import { configureStore } from "@reduxjs/toolkit";
import videoSlice from "./slices/videos";
import channelSlice from './slices/channel'
export const store = configureStore({
  reducer: {
    videoSlice,
    channelSlice
  },
});
