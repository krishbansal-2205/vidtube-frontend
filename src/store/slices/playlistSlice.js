import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axiosInstance.js";
import toast from "react-hot-toast";

const initialState = {
    playlist: null,
    playlists: [],
};

export const createPlaylist = createAsyncThunk("playlists/createPlaylist", async (data) => {
    try {
        const response = await axiosInstance.post("/playlists/", data);
        toast.success(response.message);
        return response.data;
    } catch (error) {
        toast.error(error.response.data.error);
        throw error
    }
});

export const getUserPlaylists = createAsyncThunk("playlists/getUserPlaylists", async () => {
    try {
        const response = await axiosInstance.get("/playlists/user");
        return response.data;
    } catch (error) {
        toast.error(error.response.data.error);
        throw error
    }
});

export const getPlaylistById = createAsyncThunk("playlists/getPlaylistById", async (playlistId) => {
    try {
        const response = await axiosInstance.get(`/playlists/${playlistId}`);
        return response.data;
    } catch (error) {
        toast.error(error.response.data.error);
        throw error
    }
});

export const addVideoToPlaylist = createAsyncThunk("playlists/addVideoToPlaylist", async ({ playlistId, videoId }) => {
    try {
        const response = await axiosInstance.patch(`/playlists/${videoId}/${playlistId}`);
        toast.success(response.message);
        return response.data;
    } catch (error) {
        toast.error(error.response.data.error);
        throw error
    }
});

export const removeVideoFromPlaylist = createAsyncThunk("playlists/removeVideoFromPlaylist", async ({ playlistId, videoId }) => {
    try {
        const response = await axiosInstance.patch(`/playlists/${videoId}/${playlistId}`);
        toast.success(response.message);
        return response.data;
    } catch (error) {
        toast.error(error.response.data.error);
        throw error
    }
});

export const deletePlaylist = createAsyncThunk("playlists/deletePlaylist", async (playlistId) => {
    try {
        const response = await axiosInstance.delete(`/playlists/${playlistId}`);
        toast.success(response.message);
        return playlistId;
    } catch (error) {
        toast.error(error.response.data.error);
        throw error
    }
});

export const updatePlaylist = createAsyncThunk("playlists/updatePlaylist", async ({ playlistId, data }) => {
    try {
        const response = await axiosInstance.patch(`/playlists/${playlistId}`, data);
        toast.success(response.message);
        return response.data;
    } catch (error) {
        toast.error(error.response.data.error);
    }
});

const playlistSlice = createSlice({
    name: "playlist",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createPlaylist.fulfilled, (state, action) => {
                state.playlist = action.payload;
            })
            .addCase(getUserPlaylists.fulfilled, (state, action) => {
                state.playlists = action.payload;
            })
            .addCase(getPlaylistById.fulfilled, (state, action) => {
                state.playlist = action.payload;
            })
            .addCase(addVideoToPlaylist.fulfilled, (state, action) => {
                state.playlist = action.payload;
            })
            .addCase(removeVideoFromPlaylist.fulfilled, (state, action) => {
                state.playlist = action.payload;
            })
            .addCase(deletePlaylist.fulfilled, (state, action) => {
                state.playlists = state.playlists.filter((playlist) => playlist._id !== action.payload);
            })
            .addCase(updatePlaylist.fulfilled, (state, action) => {
                state.playlist = action.payload;
            })
    }
});

export default playlistSlice.reducer;