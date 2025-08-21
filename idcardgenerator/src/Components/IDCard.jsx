
import { useDispatch } from "react-redux";
import { deleteCard } from "../features/idcardSlice";


function IDCard({ card = {}, onEdit }) {

  const dispatch = useDispatch();

  return (

    <div className="border rounded-2xl p-6 shadow-md bg-white w-80 mx-auto mt-6">
      <div className="flex flex-col items-center">
        <img
          src={card?.photo}
          alt="Profile"
          className="h-24 w-24 rounded-full object-cover border-2 border-gray-300 shadow-sm"
        />
        <h3 className="mt-3 text-xl font-bold text-gray-800">
          Name:  {card?.name || "No Name"}
        </h3>
        <p className="text-gray-600">Role : {card?.role || "No Role"}</p>
        <p className="text-gray-500 text-sm">Email : {card?.email || "No Email"}</p>
      </div>
      <div className="flex justify-center gap-3 mt-4">
        <button onClick={() => onEdit(card)} className="px-4 py-2 rounded-lg bg-blue-500 text-white font-medium shadow hover:bg-blue-600 transition">Edit</button>
        <button onClick={() => dispatch(deleteCard(card.id))} className="px-4 py-2 rounded-lg bg-blue-500 text-white font-medium shadow hover:bg-red-600 transition">Delete</button>
      </div>
    </div>

  );
}

export default IDCard;