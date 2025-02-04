import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axiosInstance.js";
import toast from "react-hot-toast";

const initialState = {
    comments: [],
    totalComments: null
};

export const createComment = createAsyncThunk("comments/createComment", async ({ videoId, content }) => {
    try {
        const response = await axiosInstance.post(`/comments/${videoId}`, content);
        toast.success(response.message);
        return response.data;
    } catch (error) {
        toast.error(error.response.data.error);
        throw error
    }
});

export const updateComment = createAsyncThunk("comments/updateComment", async ({ commentId, content }) => {
    try {
        const response = await axiosInstance.patch(`/comments/c/${commentId}`, content);
        toast.success(response.message);
        return response.data;
    } catch (error) {
        toast.error(error.response.data.error);
        throw error
    }
});

export const deleteComment = createAsyncThunk("comments/deleteComment", async (commentId) => {
    try {
        const response = await axiosInstance.delete(`/comments/c/${commentId}`);
        toast.success(response.message);
        return commentId;
    } catch (error) {
        toast.error(error.response.data.error);
        throw error
    }
});

export const getVideoComments = createAsyncThunk("comments/getVideoComments", async ({ videoId, page, limit }) => {
    try {
        const url = new URL(`/comments/${videoId}`, import.meta.env.VITE_BACKEND_URL);
        if (page) url.searchParams.append("page", page);
        if (limit) url.searchParams.append("limit", limit);
        const response = await axiosInstance.get(url);
        return response.data;
    } catch (error) {
        toast.error(error.response.data.error);
        throw error
    }
});

const commentSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createComment.fulfilled, (state, action) => {
            state.comments.unshift(action.payload);
            state.totalComments++;
        });
        builder.addCase(getVideoComments.fulfilled, (state, action) => {
            state.comments = action.payload.comments;
            state.totalComments = action.payload.totalComments;
        });
        builder.addCase(updateComment.fulfilled, (state, action) => {
            const updatedComment = action.payload;
            const commentIndex = state.comments.findIndex((comment) => comment._id === updatedComment._id);
            if (commentIndex !== -1) {
                state.comments[commentIndex] = updatedComment;
            }
        });
        builder.addCase(deleteComment.fulfilled, (state, action) => {
            state.comments = state.comments.filter((comment) => comment._id !== action.payload);
            state.totalComments--;
        });
    }
});

export default commentSlice.reducer;