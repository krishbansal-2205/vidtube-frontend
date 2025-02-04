import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice.js";
import userSlice from "./slices/userSlice.js";
import videoSlice from "./slices/videoSlice.js";
import tweetSlice from "./slices/tweetSlice.js";
import subscriptionSlice from "./slices/subscriptionSlice.js";
import playlistSlice from "./slices/playlistSlice.js";
import likeSlice from "./slices/likeSlice.js";
import dashboardSlice from "./slices/dashboardSlice.js";
import commentSlice from "./slices/commentSlice.js";

const store = configureStore({
    reducer: {
        auth: authSlice,
        user: userSlice,
        video: videoSlice,
        tweet: tweetSlice,
        subscription: subscriptionSlice,
        playlist: playlistSlice,
        like: likeSlice,
        dashboard: dashboardSlice,
        comment: commentSlice
    }
})

export default store