import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Features/UserSlice";
import chatReducer from "../Features/ChatSlice"


const store = configureStore({
    reducer: {
        users: userReducer,
        chats: chatReducer,
    },
})

export default store;