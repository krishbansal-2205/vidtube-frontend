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
}= {}) => {
    try {
        const response = await axiosInstance.get('/videos', {
            params: {
                page,
                limit,
                query,
                sortBy,
                sortType,
                userId
            }
        });
        return response.data.data;
    } catch (error) {
        toast.error(error.response.data.message);
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
        toast.success(response.data.message, { id: loadingToast });
        return response.data.data;
    } catch (error) {
        toast.error(error.response.data.message, { id: loadingToast });
        throw error
    }
});

export const getVideoById = createAsyncThunk("videos/getVideoById", async (videoId) => {
    try {
        const response = await axiosInstance.get(`/videos/${videoId}`);
        return response.data.data;
    } catch (error) {
        toast.error(error.response.data.message);
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
        toast.success(response.data.message, { id: loadingToast });
        return response.data.data;
    } catch (error) {
        toast.error(error.response.data.message, { id: loadingToast });
        throw error
    }
});

export const deleteAVideo = createAsyncThunk("videos/deleteAVideo", async (videoId) => {
    try {
        const loadingToast = toast.loading("Deleting Video...");
        const response = await axiosInstance.delete(`/videos/${videoId}`);
        toast.success(response.data.message, { id: loadingToast });
        return videoId;
    } catch (error) {
        toast.error(error.response.data.message, { id: loadingToast });
        throw error
    }
});

export const togglePublishStatus = createAsyncThunk("videos/togglePublishStatus", async (videoId) => {
    try {
        const response = await axiosInstance.patch(`/videos/toggle-publish/${videoId}`);
        toast.success(response.data.message);
        return { isPublished: response.data.data.isPublished, videoId };
    } catch (error) {
        toast.error(error.response.data.message);
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
        builder.addCase(publishAVideo.fulfilled, (state, action) => {
            state.loading = false;
            state.videos.unshift(action.payload);
        });
        builder.addCase(publishAVideo.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(updateAVideo.fulfilled, (state, action) => {
            state.loading = false;
            state.video = action.payload;
        });
        builder.addCase(updateAVideo.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(deleteAVideo.fulfilled, (state, action) => {
            state.loading = false;
            state.videos = state.videos.filter((video) => video._id !== action.payload);
        });
        builder.addCase(deleteAVideo.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(togglePublishStatus.fulfilled, (state, action) => {
            state.loading = false;
            if (!action.payload.isPublished) state.videos = state.videos.filter((video) => video._id !== action.payload.videoId);
        });
    },
});

export default videoSlice.reducer;