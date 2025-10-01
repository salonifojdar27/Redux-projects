import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function Chat() {
    const { id } = useParams();
    const selectedUser = useSelector((state) => state.chat.selectedUser);

    return (
        <div className="h-screen flex flex-col">
            <div className="p-4 bg-gray-200 font-bold">
                Chat with {selectedUser ? selectedUser.email : id}
            </div>
            <div className="flex-1 p-4 overflow-y-auto">Messages will appear here...</div>
            <div className="p-4 flex">
                <input
                    type="text"
                    placeholder="Type a message"
                    className="flex-1 p-2 border rounded"
                />
                <button className="ml-2 bg-green-500 text-white p-2 rounded">
                    Send
                </button>
            </div>
        </div>
    );
}
