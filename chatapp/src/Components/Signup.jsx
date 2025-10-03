import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../Firebase/Firebase";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../Firebase/Firebase";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSignup(e) {
    e.preventDefault();
    if (!name || !email || !password) {
      return alert("All fields required");
    }

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);

      // Update user profile with displayName and photoURL
      await updateProfile(cred.user, {
        displayName: name,
        photoURL: photoURL || null,
      });

      // Save user data in Firestore
      await setDoc(doc(db, "users", cred.user.uid), {
        name,
        email,
        photoURL: photoURL || null,
        status: "online",
      });

      alert("Signup successful — please sign in now");
      navigate("/signin");
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  }

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSignup}
        className="bg-white p-8 rounded-2xl shadow-2xl w-96"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Create Account
        </h2>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Create Password"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Profile Photo URL */}
        <input
          type="text"
          placeholder="Profile Picture URL"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
        />

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 transition text-white p-3 rounded-lg font-semibold shadow-md"
        >
          Sign Up
        </button>

        <p className="text-sm text-gray-600 mt-4 text-center">
          Already have an account?{" "}
          <a
            href="/signin"
            className="text-indigo-600 hover:underline font-medium"
          >
            Sign In
          </a>
        </p>
      </form>
    </div>
  );
}

