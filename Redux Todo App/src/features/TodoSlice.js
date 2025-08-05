import { createSlice } from "@reduxjs/toolkit";


const initialState = [{ title: "hello", status: true }]
const todoSlice = createSlice({
    name: "Todos",
    initialState,
    reducers: {
        Addtodo: (state) => {
            state.push()
        },
        RemoveTodo: (state) => {
            state.splice()
        }
    },
});

export default initialState.reducer
export const { Addtodo, RemoveTodo, toggleTodo } = todoSlice.actions;