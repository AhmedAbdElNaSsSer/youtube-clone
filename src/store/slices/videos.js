import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const pendingHandler = (state) => {
  state.loader = true
}
const rejectedHandler = (state, action) => {
  state.loader = false
  state.error = action.payload
}

const initialState = {
  record: [],
  singleRecord: null,
  videoComments: null,
  trendingVideos:[],
  loader: false,
  error: null,
}

const videos = {
  method: "GET",
  url: "https://youtube-v31.p.rapidapi.com/search",
  params: {
    relatedToVideoId: "TB5ugckuxrs",
    part: "id,snippet",
    type: "video",
    maxResults: "50",
  },
  headers: {
    "X-RapidAPI-Key": "5decdd8fd8mshf8c5298bce4b536p1629c4jsn3c6007da7a59",
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
}

const trendings = {
  method: 'GET',
  url: 'https://yt-api.p.rapidapi.com/trending',
  params: {geo: 'EG'},
  headers: {
    'X-RapidAPI-Key': '5decdd8fd8mshf8c5298bce4b536p1629c4jsn3c6007da7a59',
    'X-RapidAPI-Host': 'yt-api.p.rapidapi.com'
  }
}

export const getVideos = createAsyncThunk(
  "videos/getVideos",
  async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi
    try {
      const response = await axios.request(videos)
      return response.data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const getSingleVideo = createAsyncThunk(
  "videos/getSingleVideo",
  async (id, thunkApi) => {
    const { rejectWithValue } = thunkApi
    const singleVideo = {
      method: "GET",
      url: "https://yt-api.p.rapidapi.com/video/info",
      params: { id: `${id}`, extend: "1" },
      headers: {
        "X-RapidAPI-Key": "9c2eb668cbmsh819f1f5857f2938p19b7a2jsn7933ca98d5ae",
        "X-RapidAPI-Host": "yt-api.p.rapidapi.com",
      },
    }
    try {
      const response = await axios.request(singleVideo)
      return response.data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const getVideoComments = createAsyncThunk(
  "videos/getVideoComments",
  async (id, thunkApi) => {
    const { rejectWithValue } = thunkApi
    const comments = {
      method: "GET",
      url: "https://yt-api.p.rapidapi.com/comments",
      params: { id: `${id}` },
      headers: {
        "X-RapidAPI-Key": "9c2eb668cbmsh819f1f5857f2938p19b7a2jsn7933ca98d5ae",
        "X-RapidAPI-Host": "yt-api.p.rapidapi.com",
      },
    }
    try {
      const response = await axios.request(comments)
      return response.data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const getTrendingVideos = createAsyncThunk(
  "videos/getTrendingVideos",
  async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi
    try {
      const response = await axios.request(trendings)
      return response.data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const videoSlice = createSlice({
  name: "videos",
  initialState,
  reducers: [],
  extraReducers: (builder) => {
    // Videos
    builder
    .addCase(getVideos.pending, pendingHandler)
    .addCase(getVideos.fulfilled, (state, action) => {
      state.loader = false
      state.record = action.payload.items
    })
    .addCase(getVideos.rejected, rejectedHandler)
    // Single Video
    .addCase(getSingleVideo.pending, pendingHandler)
    .addCase(getSingleVideo.fulfilled, (state, action) => {
      state.loader = false
      state.singleRecord = action.payload
    })
    .addCase(getSingleVideo.rejected, rejectedHandler)
    // Video Comments
    .addCase(getVideoComments.pending, pendingHandler)
    .addCase(getVideoComments.fulfilled, (state, action) => {
      state.loader = false
      state.videoComments = action.payload
    })
    .addCase(getVideoComments.rejected, rejectedHandler)
    // Trendings Comments
    .addCase(getTrendingVideos.pending, pendingHandler)
    .addCase(getTrendingVideos.fulfilled, (state, action) => {
      state.loader = false
      state.trendingVideos = action.payload
    })
    .addCase(getTrendingVideos.rejected, rejectedHandler)
  },
})

export default videoSlice.reducer
