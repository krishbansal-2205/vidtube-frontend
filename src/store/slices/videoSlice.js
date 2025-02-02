import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../axios/axiosInstance.js";

const initialState = {
    loading: false,
    videos: [],
    video: null
};

export const getAllVideos = createAsyncThunk("videos/getAllVideos", async ({
    page, limit, query, sortBy, sortType, userId
}) => {
    try {
        const url = new URL("/videos", import.meta.env.VITE_BACKEND_URL);
        if (page) url.searchParams.append("page", page);
        if (limit) url.searchParams.append("limit", limit);
        if (query) url.searchParams.append("query", query);
        if (sortBy) url.searchParams.append("sortBy", sortBy);
        if (sortType) url.searchParams.append("sortType", sortType);
        if (userId) url.searchParams.append("userId", userId);

        const response = await axiosInstance.get(url);
        return response.data;
    } catch (error) {
        toast.error(error.response.data.error);
        throw error
    }
});

export const publishAVideo = createAsyncThunk("videos/publishAVideo", async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("duration", data.duration);
    formData.append("video", data.video[0]);
    formData.append("thumbnail", data.thumbnail[0]);
    const loadingToast = toast.loading("Uploading Video...");
    try {
        const response = await axiosInstance.post("/videos/publish", formData);
        toast.success(response.message, { id: loadingToast });
        return response.data;
    } catch (error) {
        toast.error(error.response.data.error, { id: loadingToast });
        throw error
    }
});

export const getVideoById = createAsyncThunk("videos/getVideoById", async (videoId) => {
    try {
        const response = await axiosInstance.get(`/videos/${videoId}`);
        return response.data;
    } catch (error) {
        toast.error(error.response.data.error);
        throw error
    }
});

export const updateAVideo = createAsyncThunk("videos/updateAVideo", async ({ data, videoId }) => {
    try {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("thumbnail", data.thumbnail[0]);
        const loadingToast = toast.loading("Updating Video...");

        const response = await axiosInstance.patch(`/videos/${videoId}`, formData);
        toast.success(response.message, { id: loadingToast });
        return response.data;
    } catch (error) {
        toast.error(error.response.data.error, { id: loadingToast });
        throw error
    }
});

export const deleteAVideo = createAsyncThunk("videos/deleteAVideo", async (videoId) => {
    try {
        const loadingToast = toast.loading("Deleting Video...");
        const response = await axiosInstance.delete(`/videos/${videoId}`);
        toast.success(response.message, { id: loadingToast });
        return response.data;
    } catch (error) {
        toast.error(error.response.data.error, { id: loadingToast });
        throw error
    }
});

export const togglePublishStatus=createAsyncThunk("videos/togglePublishStatus",async(videoId)=>{
    try {
        const response = await axiosInstance.patch(`/videos/toggle-publish/${videoId}`);
        toast.success(response.message);
        return response.data;
    } catch (error) {
        toast.error(error.response.data.error);
        throw error
    }
});

const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllVideos.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllVideos.fulfilled, (state, action) => {
            state.loading = false;
            state.videos = action.payload.videos;
        });
        builder.addCase(getVideoById.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getVideoById.fulfilled, (state, action) => {
            state.loading = false;
            state.video = action.payload;
        });
        builder.addCase(getVideoById.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(publishAVideo.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(publishAVideo.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(publishAVideo.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(updateAVideo.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateAVideo.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(updateAVideo.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(deleteAVideo.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteAVideo.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(deleteAVideo.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(togglePublishStatus.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(togglePublishStatus.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(togglePublishStatus.rejected, (state) => {
            state.loading = false;
        });
    },
});

export default videoSlice.reducer;