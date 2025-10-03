import { configureStore } from '@reduxjs/toolkit'
import chatReducer from '../Features/chatSlice'
import authReducer from "../Features/authSlice"

const store = configureStore({
    reducer: {
        chat: chatReducer,
        auth: authReducer
    }
})

export default store
