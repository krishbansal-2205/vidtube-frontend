import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axiosInstance.js";
import toast from "react-hot-toast";

const initialState = {
    likedVideos: [],
};

export const toggleVideoLike = createAsyncThunk("likes/toggleVideoLike", async (videoId) => {
    try {
        const response = await axiosInstance.post(`/likes/toggle/v/${videoId}`);
        toast.success(response.data.message);
        return response.data.data;
    } catch (error) {
        toast.error(error.response.data.message);
        throw error
    }
});

export const toggleCommentLike = createAsyncThunk("likes/toggleCommentLike", async (commentId) => {
    try {
        const response = await axiosInstance.post(`/likes/toggle/c/${commentId}`);
        toast.success(response.data.message);
        return response.data.data;
    } catch (error) {
        toast.error(error.response.data.message);
        throw error
    }
});

export const toggleTweetLike = createAsyncThunk("likes/toggleTweetLike", async (tweetId) => {
    try {
        const response = await axiosInstance.post(`/likes/toggle/t/${tweetId}`);
        toast.success(response.data.message);
        return response.data.data;
    } catch (error) {
        toast.error(error.response.data.message);
        throw error
    }
});

export const getLikedVideos = createAsyncThunk("likes/getLikedVideos", async () => {
    try {
        const response = await axiosInstance.get(`/likes/videos`);
        return response.data.data;
    } catch (error) {
        toast.error(error.response.data.message);
        throw error
    }
});

const likeSlice = createSlice({
    name: "like",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getLikedVideos.fulfilled, (state, action) => {
            state.likedVideos = action.payload;
        });
    }
});

export default likeSlice.reducer;