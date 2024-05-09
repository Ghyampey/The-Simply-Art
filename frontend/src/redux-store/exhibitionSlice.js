import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchExhibition = createAsyncThunk("fetch-all-exhibition", async ({id}) => {
    const apiUri = `http://localhost:5000/api/artist-exhibitions/${id}`;
    const response = await axios.get(apiUri);
    return response.data;
});

const exhibitionSlice = createSlice({
    name: "exhibition",
    initialState: {
        data: [],
        fetchStatus: "",
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchExhibition.fulfilled, (state, action) => {
                state.data = action.payload;
                state.fetchStatus = "success";
            })
            .addCase(fetchExhibition.pending, (state) => {
                state.fetchStatus = "loading";
            })
            .addCase(fetchExhibition.rejected, (state) => {
                state.fetchStatus = "error";
            });
    },
});

export default exhibitionSlice;
