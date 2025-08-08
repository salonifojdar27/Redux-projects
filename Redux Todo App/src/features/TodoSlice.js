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
        Updatetodo: (state, action) => {
            const { id, newtext } = action.payload;
            const todo = state.find(T => T.id === id);
            if (todo) {
                todo.text = newtext;
            }
        }
    },
});

export default todoSlice.reducer
export const { Addtodo, Removetodo, Updatetodo } = todoSlice.actions;