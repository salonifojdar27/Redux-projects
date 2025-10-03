import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import store from "./Store/store"
import './index.css'
import { auth } from './Firebase/Firebase'
import { onAuthStateChanged } from "firebase/auth"
import { setUser, clearUser } from "./Features/authSlice"

// subscribe to auth state and dispatch to redux
onAuthStateChanged(auth, user => {
  if (user) {
    store.dispatch(setUser({ uid: user.uid, email: user.email, displayName: user.displayName }))
  } else {
    store.dispatch(clearUser())
  }
})

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)

