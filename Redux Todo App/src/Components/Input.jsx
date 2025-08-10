
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Addtodo, Removetodo, Updatetodo } from "../features/TodoSlice";

const Input = () => {
    const [TextInput, setTextInput] = useState("");
    const [editId, setEditId] = useState(null);
    const dispatch = useDispatch();
    const Todos = useSelector(state => state.Todos);

    const handleAddOrEdit = () => {
        if (!TextInput.trim()) return;

        if (editId) {
            dispatch(Updatetodo({ id: editId, newText: TextInput }));
            setEditId(null);
        } else {
            dispatch(Addtodo(TextInput));
        }
        setTextInput("");
    };

    return (
        <div className="container">
            <h1>Todo App</h1>
            <div className="input-container">
                <input type="text" value={TextInput} onChange={(e) => setTextInput(e.target.value)} placeholder="Add todo here..." />
                <button onClick={handleAddOrEdit}> {editId ? "Update" : "Add"}</button>
            </div>
            <ul>
                {Todos.map((todo) => (
                    <li key={todo.id}>{todo.text}
                        <div className="btn-group">
                            <button onClick={() => dispatch(Removetodo(todo.id))} className="delete-btn">❌ </button>
                            <button className="Edit-btn" onClick={() => {
                                setTextInput(todo.text);
                                setEditId(todo.id);
                            }}>✎ </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div >
    );
}

export default Input;
