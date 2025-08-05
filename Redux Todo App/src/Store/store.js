
import { configureStore } from '@reduxjs/toolkit'
import TodoReducer from "../features/TodoSlice.js"

const store = configureStore({
    reducer: {
        Todos: TodoReducer,
    }
})

export default store