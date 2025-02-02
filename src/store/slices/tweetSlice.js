import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axiosInstance.js";
import toast from "react-hot-toast";
import { act } from "react";

const initialState = {
    loading: false,
    tweets: [],
};

export const createTweet = createAsyncThunk("tweets/createTweet", async (content) => {
    try {
        const response = await axiosInstance.post("/tweets", content);
        toast.success(response.message);
        return response.data;
    } catch (error) {
        toast.error(error.response.data.error);
        throw error
    }
});

export const getUserTweets = createAsyncThunk("tweets/getUserTweets", async (userId) => {
    try {
        const response = await axiosInstance.get(`/tweets/user/${userId}`);
        return response.data;
    } catch (error) {
        toast.error(error.response.data.error);
        throw error
    }
});

export const updateTweet = createAsyncThunk("tweets/updateTweet", async ({ content, tweetId }) => {
    try {
        const response = await axiosInstance.patch(`/tweets/${tweetId}`, content);
        toast.success(response.message);
        return response.data;
    } catch (error) {
        toast.error(error.response.data.error);
        throw error
    }
});

export const deleteTweet = createAsyncThunk("tweets/deleteTweet", async (tweetId) => {
    try {
        const response = await axiosInstance.delete(`/tweets/${tweetId}`);
        toast.success(response.message);
        return tweetId;
    } catch (error) {
        toast.error(error.response.data.error);
        throw error
    }
});

const tweetSlice = createSlice({
    name: "tweet",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createTweet.fulfilled, (state, action) => {
                state.loading = false;
                state.tweets.unshift(action.payload);
            })
            .addCase(getUserTweets.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserTweets.fulfilled, (state, action) => {
                state.loading = false;
                state.tweets = action.payload;
            })
            .addCase(updateTweet.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(deleteTweet.fulfilled, (state, action) => {
                state.loading = false;
                state.tweets = state.tweets.filter((tweet) => tweet._id !== action.payload);
            })
    }
});

export default tweetSlice.reducer;