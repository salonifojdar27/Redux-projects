import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    collection,
    query,
    orderBy,
    onSnapshot,
    addDoc,
    serverTimestamp,
    doc,
    updateDoc,
    deleteDoc,
} from "firebase/firestore";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { db } from "../Firebase/Firebase";
import Message from "../Components/Message";
import { setActiveChat } from "../Features/chatSlice";

// helper to create stable chatId between current user and other user
function makeChatId(a, b) {
    if (!a || !b) return null;
    return `chat_${[a, b].sort().join("_")}`;
}

export default function ChatWindow() {
    const dispatch = useDispatch();
    const active = useSelector((s) => s.chat.activeChatUser);
    const me = useSelector((s) => s.auth.user);
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    const messagesRef = useRef(null);

    useEffect(() => {
        if (!active || !me) {
            setMessages([]);
            return;
        }
        const chatId = makeChatId(me.uid, active.id);
        const q = query(
            collection(db, "chats", chatId, "messages"),
            orderBy("createdAt")
        );
        const unsub = onSnapshot(q, (snap) => {
            const arr = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
            setMessages(arr);
            setTimeout(() => {
                if (messagesRef.current)
                    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
            }, 50);
        });
        return () => unsub();
    }, [active, me]);

    async function send() {
        if (!active || !text.trim() || !me) return;
        const chatId = makeChatId(me.uid, active.id);
        await addDoc(collection(db, "chats", chatId, "messages"), {
            text: text.trim(),
            from: me.uid,
            fromName: me.displayName || "",
            createdAt: serverTimestamp(),
        });
        setText("");
    }

    async function editMessage(id, newText) {
        if (!me || !active) return;
        const chatId = makeChatId(me.uid, active.id);
        const d = doc(db, "chats", chatId, "messages", id);
        await updateDoc(d, { text: newText, editedAt: serverTimestamp() });
    }

    async function deleteMessage(id) {
        if (!me || !active) return;
        const chatId = makeChatId(me.uid, active.id);
        const d = doc(db, "chats", chatId, "messages", id);
        await deleteDoc(d);
    }

    // ❌ Cancel Chat Function
    function cancelChat() {
        dispatch(setActiveChat(null)); // Remove active chat
    }

    if (!me)
        return (
            <div className="content">
                <h3>Please sign in to start chatting</h3>
            </div>
        );
    if (!active)
        return (
            <div className="content">
                <h3>Select a user to open chat</h3>
            </div>
        );

    return (
        <div className="content flex flex-col h-full bg-blue-50">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 bg-white border-b shadow-sm">
                <h2 className="font-bold">{active.name}</h2>
                <button
                    onClick={cancelChat}
                    className="text-red-500 font-bold text-xl hover:bg-gray-200 rounded-full px-2"
                >
                    ×
                </button>
            </div>

            {/* Messages */}
            <div
                className="flex-1 overflow-y-auto p-4 space-y-3"
                ref={messagesRef}
            >
                {messages.map((m) => (
                    <Message
                        key={m.id}
                        msg={m}
                        me={m.from === me.uid}
                        onEdit={editMessage}
                        onDelete={deleteMessage}
                    />
                ))}
            </div>

            {/* Input */}
            <div className="inputRow flex p-4 border-t">
                <input
                    style={{ flex: 1, padding: 10 }}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type a message"
                    className="border rounded-full px-3"
                />
                <button
                    onClick={send}
                    className="ml-2 bg-blue-500 text-white px-4 rounded-full"
                >
                    Send
                </button>
            </div>
        </div>
    );
}
