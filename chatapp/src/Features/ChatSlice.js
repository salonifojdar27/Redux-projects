
import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: "chats",
    initialState: { selectedUser: null },
    reducers: {
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
        },
    },
});

export const { setSelectedUser } = chatSlice.actions;
export default chatSlice.reducer;
