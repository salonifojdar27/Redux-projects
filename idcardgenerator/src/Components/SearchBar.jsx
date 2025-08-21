import { useDispatch } from "react-redux";
import { setSearchQuery } from "../features/idcardSlice";

export default function SearchBar() {
    const dispatch = useDispatch();

    return ( 
        <input
            type="text"
            placeholder=" 🔍 Search members..."
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            className="border p-2 rounded w-full md:w-1/2 focus:outline-none focus:ring focus:ring-blue-400 mt-8 ml-55"
        />
    );
}

