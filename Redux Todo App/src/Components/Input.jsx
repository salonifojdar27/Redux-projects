
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Addtodo } from "../features/TodoSlice"

const Input = () => {

    const [TextInput, setTextInput] = useState()
    const disptach = useDispatch()
    const Todos = useSelector(state => state.Todos)

    function handleAddTodo() {
        if (TextInput.trim()) {
            disptach(Addtodo(TextInput));
            setTextInput("");
        }
    }
    return (
        <div className="container">
            <h1>Todo App</h1>
            <div className="input-container">
                <input type="text" value={TextInput} onChange={(e) => setTextInput(e.target.value)} placeholder="Add todo here..." />
                <button onClick={handleAddTodo}>Add</button>
            </div>
            <ul>
                {Todos.map((todo) => (
                    <li key={todo.id}> {todo.text}
                        <button className="delete-btn">Delete </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Input
