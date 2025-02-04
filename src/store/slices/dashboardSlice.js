import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axiosInstance.js";
import toast from "react-hot-toast";

const initialState = {
    channelStats: null,
    channelVideos: []
};

export const getChannelStats = createAsyncThunk("dashboard/getChannelStats", async () => {
    try {
        const response = await axiosInstance.get("/dashboard/stats");
        return response.data.data;
    } catch (error) {
        toast.error(error.response.data.message);
        throw error
    }
});

export const getChannelVideos = createAsyncThunk("dashboard/getChannelVideos", async () => {
    try {
        const response = await axiosInstance.get("/dashboard/videos");
        return response.data.data;
    } catch (error) {
        toast.error(error.response.data.message);
        throw error
    }
});

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getChannelStats.fulfilled, (state, action) => {
            state.channelStats = action.payload;
        });
        builder.addCase(getChannelVideos.fulfilled, (state, action) => {
            state.channelVideos = action.payload;
        });
    }
});

export default dashboardSlice.reducer;