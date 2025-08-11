
import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: "Todos",
    initialState: [],
    reducers: {
        Addtodo: (state, action) => {
            state.push({ id: Date.now(), text: action.payload });
        },
        Removetodo: (state, action) => {
            const index = state.findIndex(todo => todo.id === action.payload);
            if (index !== -1) {
                state.splice(index, 1);
            }
        },
        Updatetodo: (state, action) => {
            const { id, newText } = action.payload;
            const index = state.findIndex(todo => todo.id === id);
            if (index !== -1) {
                state[index].text = newText;
            }
        }
    }
});

export const { Addtodo, Removetodo, Updatetodo } = todoSlice.actions;
export default todoSlice.reducer;


