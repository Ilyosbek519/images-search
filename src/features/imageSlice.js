import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const ACCESS_KEY = "JwyBQbAcakEEXcBkufus8DlgDfnqfWCUeRBR0XXzEKc";

export const fetchImages = createAsyncThunk(
  'images/fetchImages',
  async (query) => {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${query}&client_id=${ACCESS_KEY}`
    );
    const data = await res.json();
    return data.results.map((item) => item.urls.small);
  }
);

const imageSlice = createSlice({
  name: 'images',
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchImages.pending, (state) => {
        state.loading = true;
        state.list = [];
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      });
  },
});

export default imageSlice.reducer;
