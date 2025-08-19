
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list: [
    ],
    searchQuery: "",
};

const idCardSlice = createSlice({
    name: "idCards",
    initialState,
    reducers: {
        addCard: (state, action) =>
            state.list.push({ id: Date.now(), ...action.payload })
    },
    deleteCard: (state, action) => {
        // return state.filter(card => card.id !== action.payload);
        const index = state.findIndex(card => card.id === action.payload);
        if (index !== -1) {
            state.list.splice(index, 1);
        }
    },
    updateCard: (state, action) => {
        const { id, updatedData } = action.payload;
        const index = state.findIndex(card => card.id === id);
        if (index !== -1) {
            state[index] = { ...state[index], ...updatedData };
        }
    },
    setSearchQuery: (state, action) => {
        state.searchQuery = action.payload;
    },
}
);

export const { addCard, deleteCard, updateCard, setSearchQuery } = idCardSlice.actions;
export default idCardSlice.reducer;
