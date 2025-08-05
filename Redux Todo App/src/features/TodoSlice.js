import { createSlice } from "@reduxjs/toolkit";


const initialState = []
const todoSlice = createSlice({
    name: "Todos",
    initialState,
    reducers: {
        Addtodo: (state, action) => {
            state.push({ text: action.payload, completed: false })
        },
    },
});

export default todoSlice.reducer
export const { Addtodo } = todoSlice.actions;