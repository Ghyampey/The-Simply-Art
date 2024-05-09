import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchArtistBio = createAsyncThunk(
    "fetch-artist-bio",
    async ({ id }) => {
        const apiUri = `http://localhost:5000/api/biography/${id}`;
        const response = await axios.get(apiUri);
        return response.data;
    }
);

const artistBioSlice = createSlice({
    name: "artistBio",
    initialState: {
        data: [],
        fetchStatus: "",
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArtistBio.fulfilled, (state, action) => {
                state.data = action.payload;
                state.fetchStatus = "success";
            })
            .addCase(fetchArtistBio.pending, (state) => {
                state.fetchStatus = "loading";
            })
            .addCase(fetchArtistBio.rejected, (state) => {
                state.fetchStatus = "error";
            });
    },
});

export default artistBioSlice;
