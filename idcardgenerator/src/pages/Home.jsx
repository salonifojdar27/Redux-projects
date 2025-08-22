
// import SearchBar from '../Components/SearchBar'
// import { useState, useMemo } from 'react';
// import { useSelector } from "react-redux";
// import IdForm from "../Components/IDForm"
// import IDCard from '../Components/IDCard';
// import { useDispatch } from "react-redux";
// import { deleteCard } from "../features/idcardSlice";

// const Home = ({ card }, onEdit) => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [editingCard, setEditingCard] = useState(null);
//     const { list, searchQuery } = useSelector((state) => state.idCards);
//     const dispatch = useDispatch();

//     const filtered = useMemo(() => {
//         const q = (searchQuery || "").toLowerCase();
//         return list.filter((card) =>
//             [card.name, card.role, card.email].some((v) =>
//                 (v || "").toLowerCase().includes(q)
//             )
//         );
//     }, [list, searchQuery]);

//     return (
//         <div className="p-6 max-w-6xl mx-auto">
//             <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 mb-6">
//                 <SearchBar />
//                 <button onClick={() => { setEditingCard(null); setIsOpen(true); }} className="px-4 py-2 bg-green-600 text-white rounded-2xl shadow hover:bg-green-700 md:w-auto mt-8"> +Create </button>
//             </div>

//             {isOpen && (
//                 <IdForm editingCard={editingCard} onClose={() => { setEditingCard(null); setIsOpen(false); }} />)}

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {filtered.length > 0 ? (
//                     filtered.map((idCard) => (
//                         <IDCard key={idCard.id} card={idCard} onEdit={(card) => { setEditingCard(card); setIsOpen(true); }} />)))
//                     : (<p className="col-span-3 text-center text-gray-500"> No members found  </p>)}
//             </div>
//              <div className="flex justify-center gap-3 mt-4">
//                 <button onClick={() => onEdit(card)} className="px-4 py-2 rounded-lg bg-blue-500 text-white font-medium shadow hover:bg-blue-600 transition">Edit</button>
//                 <button onClick={() => dispatch(deleteCard(card.id))} className="px-4 py-2 rounded-lg bg-blue-500 text-white font-medium shadow hover:bg-red-600 transition">Delete</button>
//             </div>
//         </div>
//     );
// };

// export default Home;


import SearchBar from '../Components/SearchBar'
import { useState, useMemo } from 'react';
import { useSelector, useDispatch } from "react-redux";
import IdForm from "../Components/IDForm"
import IDCard from '../Components/IDCard';
import { deleteCard } from "../features/idcardSlice";

const Home = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [editingCard, setEditingCard] = useState(null);
    const [selectedCard, setSelectedCard] = useState(null); // 🔹 selected card state

    const { list, searchQuery } = useSelector((state) => state.idCards);
    const dispatch = useDispatch();

    const filtered = useMemo(() => {
        const q = (searchQuery || "").toLowerCase();
        return list.filter((card) =>
            [card.name, card.role, card.email].some((v) =>
                (v || "").toLowerCase().includes(q)
            )
        );
    }, [list, searchQuery]);

    return (
        <div className="p-6 max-w-6xl mx-auto">
            {/* Top bar */}
            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 mb-6">
                <SearchBar />
                <button 
                    onClick={() => { setEditingCard(null); setIsOpen(true); }} 
                    className="px-4 py-2 bg-green-600 text-white rounded-2xl shadow hover:bg-green-700 md:w-auto mt-8">
                    +Create
                </button>
            </div>

            {/* Form Modal */}
            {isOpen && (
                <IdForm 
                    editingCard={editingCard} 
                    onClose={() => { setEditingCard(null); setIsOpen(false); }} 
                />
            )}

            {/* Card Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.length > 0 ? (
                    filtered.map((idCard) => (
                        <div 
                            key={idCard.id} 
                            onClick={() => 
                                setSelectedCard(
                                    selectedCard?.id === idCard.id ? null : idCard // 🔹 toggle select/deselect
                                )
                            }
                            className={`cursor-pointer ${selectedCard?.id === idCard.id ? "ring-2 ring-blue-500" : ""}`}
                        >
                            <IDCard card={idCard} />
                        </div>
                    ))
                ) : (
                    <p className="col-span-3 text-center text-gray-500"> No members found  </p>
                )}
            </div>

            {/* Fixed Action Buttons */}
            {selectedCard && (
                <div className="flex justify-center gap-3 mt-6">
                    <button 
                        onClick={() => { setEditingCard(selectedCard); setIsOpen(true); }} 
                        className="px-4 py-2 rounded-lg bg-blue-500 text-white font-medium shadow hover:bg-blue-600 transition">
                        Edit
                    </button>
                    <button 
                        onClick={() => dispatch(deleteCard(selectedCard.id))} 
                        className="px-4 py-2 rounded-lg bg-red-500 text-white font-medium shadow hover:bg-red-600 transition">
                        Delete
                    </button>
                    {/* 🔹 Deselect button */}
                    <button 
                        onClick={() => setSelectedCard(null)} 
                        className="px-4 py-2 rounded-lg bg-gray-400 text-white font-medium shadow hover:bg-gray-500 transition">
                        Cancel
                    </button>
                </div>
            )}
        </div>
    );
};

export default Home;


