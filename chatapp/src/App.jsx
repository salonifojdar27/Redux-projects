import { Routes, Route } from "react-router"
import './App.css'
import SignIn from "./Components/SignIn"
import SignUp from "./Components/SignUp"

function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  )
}

export default App
