


export default function Sidebar() {

    return (
        <div className="w-1/4 bg-gray-900 text-white flex flex-col p-4">
            <h2 className="text-xl font-bold mb-4">Chats</h2>
            <div className="flex-1"> {/* User list here */}</div>
            <button
                className="bg-red-500 hover:bg-red-600 p-2 rounded flex items-center gap-2"

            >
                {/* <LogOut size={18} /> Logout */}
            </button>
        </div>
    );
}
