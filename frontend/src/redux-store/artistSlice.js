import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllArtists = createAsyncThunk(
    "fetch-all-artists",
    async ({ limit, page }) => {
        const apiUri = `http://localhost:5000/api/artists?page=${page}&limit=${limit}`;
        const response = await axios.get(apiUri);
        return response.data;
    }
);

const artistSlice = createSlice({
    name: "artist",
    initialState: {
        data: [],
        fetchStatus: "",
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllArtists.fulfilled, (state, action) => {
                state.data = action.payload;
                state.fetchStatus = "success";
            })
            .addCase(fetchAllArtists.pending, (state) => {
                state.fetchStatus = "loading";
            })
            .addCase(fetchAllArtists.rejected, (state) => {
                state.fetchStatus = "error";
            })

    },
});

export default artistSlice;
