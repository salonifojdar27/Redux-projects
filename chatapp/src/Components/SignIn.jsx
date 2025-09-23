
import React, { useRef } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { signInUsers } from "../Features/UserSlice"


const SignIn = () => {

    const dispatch = useDispatch();
    const { users, } = useSelector((state => state.users))

    const emailRef = useRef("");
    const passwordRef = useRef("");

    const handleSignIn = async () => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        dispatch(signInUsers({ email, password }))
    }

    return (
        <div className="flex justify-center items-center min-h-screen overflow-x-hidden">
            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Sign In
                </h1>

                <div className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        ref={emailRef}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        ref={passwordRef}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <button
                    onClick={handleSignIn}
                    className="w-full mt-6 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
                >
                    Sign In
                </button>

                <p className="text-sm text-gray-500 text-center mt-4">
                    Don’t have an account?{" "}
                    <span className="text-indigo-600 cursor-pointer hover:underline">
                        Sign up
                    </span>
                </p>
            </div>
        </div>
    )
}

export default SignIn
