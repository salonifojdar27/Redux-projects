import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db, auth } from "../Firebase/Firebase";
import { useDispatch, useSelector } from "react-redux";
import { setActiveChat } from "../Features/chatSlice";
import { signOut } from "firebase/auth";

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const active = useSelector((s) => s.chat.activeChatUser);
    const me = useSelector((s) => s.auth.user);
    const dispatch = useDispatch();

    useEffect(() => {
        const q = query(collection(db, "users"), orderBy("name"));
        const unsub = onSnapshot(q, (snap) => {
            const arr = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
            setUsers(arr);
        });
        return () => unsub();
    }, []);

    const filteredUsers = users.filter(
        (u) =>
            u.id !== (me && me.uid) && // ✅ Remove current logged-in user
            u.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log("User logged out successfully");
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <div className="w-80 border-r h-screen flex flex-col bg-white shadow-lg">
            {/* Search Field */}
            <div className="p-4 border-b">
                <input
                    type="text"
                    placeholder="Search People"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-2 border rounded-full focus:outline-none focus:ring focus:ring-blue-200"
                />
            </div>

            {/* User List */}
            <div className="flex-1 overflow-y-auto">
                {filteredUsers.length > 0 ? (
                    filteredUsers.map((u) => (
                        <div
                            key={u.id}
                            className={`flex items-center p-3 border-b cursor-pointer hover:bg-gray-50 ${active?.id === u.id ? "bg-blue-50" : ""
                                }`}
                            onClick={() =>
                                dispatch(setActiveChat({ id: u.id, name: u.name }))
                            }
                        >
                            {/* Profile Picture */}
                            <div className="relative">
                                <img
                                    src={u.photoURL || "https://via.placeholder.com/50"}
                                    alt={u.name}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                {u.isOnline && (
                                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                                )}
                            </div>

                            {/* User Info */}
                            <div className="flex flex-col ml-4 flex-1">
                                <span className="font-semibold text-sm">{u.name}</span>
                                <span className="text-xs text-gray-500">
                                    {u.status || "online"}
                                </span>
                            </div>

                            {/* Unread Badge */}
                            {u.unread && (
                                <div className="ml-auto bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                                    {u.unread}
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="p-4 text-gray-500">No users available</div>
                )}
            </div>

            {/* Current User Profile + Logout */}
            {me && (
                <div className="border-t p-4 flex flex-col items-center bg-gray-50">
                    {/* Current User Mini Profile */}
                    <div className="flex items-center space-x-3 mb-3">
                        <img
                            src={me.photoURL || "https://via.placeholder.com/40"}
                            alt={me.displayName || "User"}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold">
                                {me.displayName || "User"}
                            </span>
                            <span className="text-xs text-gray-500">online</span>
                        </div>
                    </div>

                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}

