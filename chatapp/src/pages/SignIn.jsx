import { useState } from "react";
import { useDispatch } from "react-redux";
import { signInUser } from "../Features/UserSlice";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignin = (e) => {
        e.preventDefault();
        dispatch(signInUser({ email, password }))
            .then(() => navigate("/home"));
    };

    return (
        <div className="h-screen flex justify-center items-center bg-gray-200">
            <form onSubmit={handleSignin} className="bg-white p-6 rounded shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4">Sign In</h2>
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
                <button className="w-full bg-blue-500 text-white p-2 rounded">Sign In</button>
            </form>
        </div>
    );
};

export default SignIn;
