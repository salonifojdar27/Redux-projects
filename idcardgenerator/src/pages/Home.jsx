

import SearchBar from '../Components/SearchBar'
import { useState, useMemo } from 'react';
import { useSelector } from "react-redux";
import IdForm from "../Components/IDForm"
import IDCard from '../Components/IDCard';

const Home = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [editingCard, setEditingCard] = useState(null); // 👈 camelCase
    const { list, searchQuery } = useSelector((state) => state.idCards);

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
            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 mb-6">
                <SearchBar />
                <button
                    onClick={() => {
                        setEditingCard(null); // 👈 नया card
                        setIsOpen(true);
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded-2xl shadow hover:bg-green-700 md:w-auto mt-8"
                >
                    +Create
                </button>
            </div>

            {isOpen && (
                <IdForm
                    editingCard={editingCard} // 👈 अब सही से pass किया
                    onClose={() => {
                        setEditingCard(null);
                        setIsOpen(false);
                    }}
                />
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.length > 0 ? (
                    filtered.map((idCard) => (
                        <IDCard
                            key={idCard.id}
                            card={idCard}
                            onEdit={(card) => {
                                setEditingCard(card); // 👈 edit mode activate
                                setIsOpen(true);
                            }}
                        />
                    ))
                ) : (
                    <p className="col-span-3 text-center text-gray-500">
                        No members found
                    </p>
                )}
            </div>
        </div>
    );
};

export default Home;
