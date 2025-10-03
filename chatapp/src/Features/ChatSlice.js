
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    activeChatUser: null, // { id, name }
    // UI state only; messages are fetched live from Firestore in components
}

const slice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setActiveChat(state, action) {
            state.activeChatUser = action.payload
        },
        clearActiveChat(state) {
            state.activeChatUser = null
        }
    }
})

export const { setActiveChat, clearActiveChat } = slice.actions
export default slice.reducer
