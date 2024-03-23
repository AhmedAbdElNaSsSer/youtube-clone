import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const pendingHandler = (state) => {
  state.loader = true;
};
const rejectedHandler = (state, action) => {
  state.loader = false;
  state.error = action.payload;
};

const initialState = {
  channelHome: [],
  channelVideos: [],
  channelShorts: [],
  channelLivestreams: [],
  channelPlaylist: [],
  channelCommunity: [],
  channelFeatured: [],
  channelAbout: [],
  loader: false,
  error: null,
};

export const getChannelHome = createAsyncThunk(
  "channel/getChannelHome",
  async (id, thunkApi) => {
    console.log("id: ", id);
    const { rejectWithValue } = thunkApi;
    const channelHomeOptions = {
      method: "GET",
      url: "https://yt-api.p.rapidapi.com/channel/home",
      params: {
        id: id,
      },
      headers: {
        "X-RapidAPI-Key": "9c2eb668cbmsh819f1f5857f2938p19b7a2jsn7933ca98d5ae",
        "X-RapidAPI-Host": "yt-api.p.rapidapi.com",
      },
    };
    try {
      const response = await axios.request(channelHomeOptions);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const getChannelVideos = createAsyncThunk(
  "channel/getChannelVideos",
  async (id, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    const channelVideosOptions = {
      method: "GET",
      url: "https://yt-api.p.rapidapi.com/channel/videos",
      params: {
        id: id,
      },
      headers: {
        "X-RapidAPI-Key": "9c2eb668cbmsh819f1f5857f2938p19b7a2jsn7933ca98d5ae",
        "X-RapidAPI-Host": "yt-api.p.rapidapi.com",
      },
    };
    try {
      const response = await axios.request(channelVideosOptions);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const getChannelShorts = createAsyncThunk(
  "channel/getChannelShorts",
  async (id, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    const channelShortsOptions = {
      method: "GET",
      url: "https://yt-api.p.rapidapi.com/channel/shorts",
      params: {
        id: id,
      },
      headers: {
        "X-RapidAPI-Key": "9c2eb668cbmsh819f1f5857f2938p19b7a2jsn7933ca98d5ae",
        "X-RapidAPI-Host": "yt-api.p.rapidapi.com",
      },
    };
    try {
      const response = await axios.request(channelShortsOptions);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const getChannelPlaylist = createAsyncThunk(
  "channel/getChannelPlaylist",
  async (id, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    const channelPlaylistOptions = {
      method: "GET",
      url: "https://yt-api.p.rapidapi.com/channel/playlists",
      params: {
        id: id,
      },
      headers: {
        "X-RapidAPI-Key": "9c2eb668cbmsh819f1f5857f2938p19b7a2jsn7933ca98d5ae",
        "X-RapidAPI-Host": "yt-api.p.rapidapi.com",
      },
    };
    try {
      const response = await axios.request(channelPlaylistOptions);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const getChannelCommunity = createAsyncThunk(
  "channel/getChannelCommunity",
  async (id, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    const channelCommunityOptions = {
      method: "GET",
      url: "https://yt-api.p.rapidapi.com/channel/community",
      params: {
        id: id,
      },
      headers: {
        "X-RapidAPI-Key": "9c2eb668cbmsh819f1f5857f2938p19b7a2jsn7933ca98d5ae",
        "X-RapidAPI-Host": "yt-api.p.rapidapi.com",
      },
    };
    try {
      const response = await axios.request(channelCommunityOptions);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const channelSlice = createSlice({
  name: "channel",
  initialState,
  extraReducers: (builder) => {
    builder
      // Home
      .addCase(getChannelHome.pending, pendingHandler)
      .addCase(getChannelHome.fulfilled, (state, action) => {
        state.loader = false;
        state.channelHome = action.payload;
      })
      .addCase(getChannelHome.rejected, rejectedHandler)
      // Videos
      .addCase(getChannelVideos.pending, pendingHandler)
      .addCase(getChannelVideos.fulfilled, (state, action) => {
        state.loader = false;
        state.channelVideos = action.payload;
      })
      .addCase(getChannelVideos.rejected, rejectedHandler)
      // Shorts
      .addCase(getChannelShorts.pending, pendingHandler)
      .addCase(getChannelShorts.fulfilled, (state, action) => {
        state.loader = false;
        state.channelShorts = action.payload;
      })
      .addCase(getChannelShorts.rejected, rejectedHandler)
      // Playlist
      .addCase(getChannelPlaylist.pending, pendingHandler)
      .addCase(getChannelPlaylist.fulfilled, (state, action) => {
        state.loader = false;
        state.channelPlaylist = action.payload;
      })
      .addCase(getChannelPlaylist.rejected, rejectedHandler)
      // Community
      .addCase(getChannelCommunity.pending, pendingHandler)
      .addCase(getChannelCommunity.fulfilled, (state, action) => {
        state.loader = false;
        state.channelCommunity = action.payload;
      })
      .addCase(getChannelCommunity.rejected, rejectedHandler);
  },
});

export default channelSlice.reducer;
