import { createSlice } from "@reduxjs/toolkit";


const initialState = []
const todoSlice = createSlice({
    name: "Todos",
    initialState,
    reducers: {
        Addtodo: (state, action) => {
            state.push({ text: action.payload, completed: false })
        },
        Removetodo: (state, action) => {
            const index = state.findIndex((todo) => todo.id === action.payload);
            if (index !== -1) {
                state.splice(index, 1);
            }
        },
    },
});

export default todoSlice.reducer
export const { Addtodo, Removetodo } = todoSlice.actions;