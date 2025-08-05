

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: 0,
};

const counterSlice = createSlice({
    name: 'counter', // slice name
    initialState,    // default state
    reducers: {
        increment: (state) => { state.value += 1; },
        decrement: (state) => { state.value -= 1; },
    },
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;