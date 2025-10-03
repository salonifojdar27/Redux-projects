
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null // { uid, email, displayName }
}

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload
    },
    clearUser(state) {
      state.user = null
    }
  }
})

export const { setUser, clearUser } = slice.actions
export default slice.reducer
