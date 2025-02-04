import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axiosInstance.js";
import toast from "react-hot-toast";

const initialState = {
    loading: false,
    status: false,
    userData: null
};

export const createAccount = createAsyncThunk("users/register", async (data) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("fullName", data.fullName);
    formData.append("avatar", data.avatar[0]);
    if (data.coverImage) {
        formData.append("coverImage", data.coverImage[0]);
    }
    const loadingToast=toast.loading("Creating Account...");

    try {
        const response = await axiosInstance.post("/users/register", formData);
        toast.success(response.data.message,{id:loadingToast});
        return response.data.data;
    } catch (error) {
        toast.error(error.response.data.message,{id:loadingToast});
        throw error
    }
});

export const login = createAsyncThunk("users/login", async (data) => {
    try {
        const response = await axiosInstance.post("/users/login", data);
        toast.success(response.data.message);
        return response.data.data;
    } catch (error) {
        toast.error(error.response.data.message);
        throw error
    }
});

export const logout = createAsyncThunk("users/logout", async () => {
    try {
        const response = await axiosInstance.post("/users/logout");
        toast.success(response.data.message);
        return response.data.data;
    } catch (error) {
        toast.error(error.response.data.message);
        throw error
    }
});

export const refreshAccessToken = createAsyncThunk("users/refreshAccessToken", async (data) => {
    try {
        const response = await axiosInstance.post("/users/refresh-token", data);
        return response.data.data;
    } catch (error) {
        toast.error(error.response.data.message);
        throw error
    }
});

export const changePassword = createAsyncThunk("users/changePassword", async (data) => {
    try {
        const response = await axiosInstance.post("/users/change-password", data);
        toast.success(response.data.message);
        return response.data.data;
    } catch (error) {
        toast.error(error.response.data.message);
        throw error
    }
});

export const getCurrentUser = createAsyncThunk("users/getCurrentUser", async () => {
    const response = await axiosInstance.get("/users/current-user");
    return response.data.data;
});

export const updateAccountDetails = createAsyncThunk("users/updateAccountDetails", async (data) => {
    try {
        const response = await axiosInstance.patch("/users/update-account", data);
        toast.success(response.data.message);
        return response.data.data;
    } catch (error) {
        toast.error(error.response.data.message);
        throw error
    }
});

export const updateAvatar = createAsyncThunk("users/updateAvatar", async (data) => {
    const formData = new FormData();
    formData.append("avatar", data.avatar[0]);
    const loadingToast=toast.loading("Updating Avatar...");
    try {
        const response = await axiosInstance.patch("/users/update-avatar", formData);
        toast.success(response.data.message,{id:loadingToast});
        return response.data.data;
    } catch (error) {
        toast.error(error.response.data.message,{id:loadingToast});
        throw error
    }
});

export const updateCoverImage = createAsyncThunk("users/updateCoverImage", async (data) => {
    const formData = new FormData();
    formData.append("coverImage", data.coverImage[0]);
    const loadingToast=toast.loading("Updating Cover Image...");
    try {
        const response = await axiosInstance.patch("/users/update-cover-image", formData);
        toast.success(response.data.message,{id:loadingToast});
        return response.data.data;
    } catch (error) {
        toast.error(error.response.data.message,{id:loadingToast});
        throw error
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createAccount.pending, (state) => {
                state.loading = true;
            })
            .addCase(createAccount.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.status = true;
                state.userData = action.payload;
            })
            .addCase(logout.pending, (state) => {
                state.loading = true;
            })
            .addCase(logout.fulfilled, (state) => {
                state.loading = false;
                state.status = false;
                state.userData = null;
            })
            .addCase(getCurrentUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.loading = false;
                state.status = true;
                state.userData = action.payload;
            })
            .addCase(getCurrentUser.rejected, (state) => {
                state.loading = false;
                state.status = false;
                state.userData = null;
            })
            .addCase(updateAccountDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateAccountDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.userData = action.payload;
            })
            .addCase(updateAccountDetails.rejected, (state) => {
                state.loading = false;
            })
            .addCase(updateAvatar.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateAvatar.fulfilled, (state, action) => {
                state.loading = false;
                state.userData = action.payload;
            })
            .addCase(updateAvatar.rejected, (state) => {
                state.loading = false;
            })
            .addCase(updateCoverImage.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateCoverImage.fulfilled, (state, action) => {
                state.loading = false;
                state.userData = action.payload;
            })
            .addCase(updateCoverImage.rejected, (state) => {
                state.loading = false;
            });
    },
});

export default authSlice.reducer;