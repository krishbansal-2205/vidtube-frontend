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

// const getUserChannelSubscribers