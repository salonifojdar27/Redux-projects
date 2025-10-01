import { useState } from "react";
import { useDispatch } from "react-redux";
import { signUpUser } from "../Features/UserSlice";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();
        dispatch(signUpUser({ email, password }))
            .then(() => navigate("/signin"));
    };

    return (
        <div className="h-screen flex justify-center items-center bg-gray-200">
            <form onSubmit={handleSignup} className="bg-white p-6 rounded shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 border mb-3"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 border mb-3"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="w-full bg-green-500 text-white p-2 rounded">Sign Up</button>
            </form>
        </div>
    );
}
