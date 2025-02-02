import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axiosInstance.js";
import toast from "react-hot-toast";

const initialState = {
    loading: false,
    profileData: null,
    history: []
};

export const userChannelProfile = createAsyncThunk("users/channelProfile", async (username) => {
    try {
        const response = await axiosInstance.get(`/users/c/${username}`);
        return response.data;
    } catch (error) {
        toast.error(error.response.data.error);
        throw error
    }
});

export const getWatchHistory = createAsyncThunk("users/watchHistory", async () => {
    try {
        const response = await axiosInstance.get("/users/history");
        return response.data;
    } catch (error) {
        toast.error(error.response.data.error);
        throw error
    }
});

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(userChannelProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(userChannelProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profileData = action.payload;
            })
            .addCase(getWatchHistory.pending, (state) => {
                state.loading = true;
            })
            .addCase(getWatchHistory.fulfilled, (state, action) => {
                state.loading = false;
                state.history = action.payload;
            });
    }
});