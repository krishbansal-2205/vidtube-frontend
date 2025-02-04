import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axiosInstance.js";
import toast from "react-hot-toast";

const initialState = {
    isSubscribed: null,
    mySubscriptions: [],
    mySubscribers: [],
};

export const toggleSubscription = createAsyncThunk("users/toggleSubscription", async (channelId) => {
    try {
        const response = await axiosInstance.post(`/subscriptions/c/${channelId}`);
        toast.success(response.message);
        return Object.keys(response.data).length > 0;
    } catch (error) {
        toast.error(error.response.data.error);
        throw error
    }
});

export const getUserChannelSubscribers = createAsyncThunk("users/getUserChannelSubscribers", async (channelId) => {
    try {
        const response = await axiosInstance.get(`/subscriptions/u/${channelId}`);
        return response.data;
    } catch (error) {
        toast.error(error.response.data.error);
        throw error
    }
});

export const getSubscribedChannels= createAsyncThunk("users/getSubscribedChannels", async () => {
    try {
        const response = await axiosInstance.get("/subscriptions/u");
        return response.data;
    } catch (error) {
        toast.error(error.response.data.error);
        throw error
    }
});

const subscriptionSlice = createSlice({
    name: "subscription",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(toggleSubscription.fulfilled, (state, action) => {
            state.isSubscribed = action.payload;
        });
        builder.addCase(getUserChannelSubscribers.fulfilled, (state, action) => {
            state.mySubscribers = action.payload;
        });
        builder.addCase(getSubscribedChannels.fulfilled, (state, action) => {
            state.mySubscriptions = action.payload;
        });
    }
});

export default subscriptionSlice.reducer;