
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { collection, getDocs } from "firebase/firestore";
import { Store } from '../Firebase/Firebase';

//fetch users

const Fetchusers = createAsyncThunk("users/fectchusers", async () => {
    const querySnapshot = await getDocs(collection(Store, "users"));
    const users = querySnapshot.docs.map((doc) => {
        doc.data();
    })
    return users;
})


const initialState = {
    users: [],
    isloading: true,
    error: null,
}

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase()
    }
})

export default userSlice.reducer;