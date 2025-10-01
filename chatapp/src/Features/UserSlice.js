
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { auth, Store } from '../Firebase/Firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';


//SignIn users using Auth //
export const signInUser = createAsyncThunk(
    "users/signInUser",
    async ({ email, password }) => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = {
            email: userCredential.user.email,
            displayName: userCredential.user.displayName,
            image: userCredential.user.photoURL,
        };
        return user;
    }
);

// signUp users with Auth //
export const signUpUser = createAsyncThunk(
    "users/signUpUser",
    async ({ email, password }) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = {
            email: userCredential.user.email,
            displayName: userCredential.user.displayName,
            image: userCredential.user.photoURL,
        };
        return user;
    }
);



// Logout
export const logoutUser = createAsyncThunk("users/logoutUser", async () => {
    await signOut(auth);
    return null;
});

// //fetch users //

export const Fetchusers = createAsyncThunk("users/fectchusers", async () => {
    const querySnapshot = await getDocs(collection(Store, "users"));
    const users = querySnapshot.docs.map((doc) => {
        return {
            ...doc.data(),
            id: doc.id
        }
    })
    return users;
})

// Add users //

export const addUsers = createAsyncThunk("users/addUsers", async ({ email, password, name }) => {
    const user = signUpUser(email, password);
    if (user) {
        const docRef = await addDoc(collection(Store, "users"), {
            email: email,
            password: password,
            name: name,
        });
        return { id: docRef.id, name: name, email: email, password: password };
    }
    return null;
}
);

// Delete users //

export const deleteUsers = createAsyncThunk("users/deleteUsers", async (id) => {
    await deleteDoc(doc(Store, "users", id));
    return id;
})

const initialState = {
    users: [],
    currentUsers: {},
    isloading: true,
    error: null,
}

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(Fetchusers.pending, (state) => {
            state.isloading = true;
        });
        builder.addCase(Fetchusers.fulfilled, (state, action) => {
            state.users = action.payload;
            state.isloading = false;
        });
        builder.addCase(Fetchusers.rejected, (state) => {
            state.error = "Error in fetching users !!";
            state.isloading = true;
        });
        builder.addCase(addUsers.pending, (state) => {
            state.isloading = true;
        });
        builder.addCase(addUsers.fulfilled, (state, action) => {
            const user = action.payload;
            state.currentUsers = user;
            state.users.push(user)
            state.isloading = false;
        });
        builder.addCase(addUsers.rejected, (state) => {
            state.error = "Error in adding users !!";
            state.isloading = true;
        });
        builder.addCase(deleteUsers.pending, (state) => {
            state.isloading = true;
        });
        builder.addCase(deleteUsers.fulfilled, (state, action) => {
            const id = action.payload;
            state.users = state.users.filter((user) => user.id !== id)
            state.isloading = false;
        });
        builder.addCase(deleteUsers.rejected, (state) => {
            state.error = "Error in Deleting users !!";
            state.isloading = true;
        });
        builder.addCase(signInUser.pending, (state) => {
            state.isloading = true;
        });
        builder.addCase(signInUser.fulfilled, (state, action) => {
            state.currentUsers = action.payload;
            state.isloading = false;
        });
        builder.addCase(signInUser.rejected, (state) => {
            state.error = "Error in signIn !!";
            state.isloading = false;
        });
        builder.addCase(signUpUser.fulfilled, (state, action) => {
            state.currentUsers = action.payload;
            state.isloading = false;
        });
        builder.addCase(logoutUser.fulfilled, (state) => {
            state.currentUsers = null;
        });
    }
})

export default userSlice.reducer;


