
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Addtodo, Removetodo } from "../features/TodoSlice"

const Input = () => {

    const [TextInput, setTextInput] = useState("")
    const disptach = useDispatch()
    const Todos = useSelector(state => state.Todos)

    function handleAddTodo() {
        if (TextInput.trim()) {
            disptach(Addtodo(TextInput));
            setTextInput("");
        }
    }

    function handleRemovetodo() {
        disptach(Removetodo())
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
                        <button onClick={() => handleRemovetodo(todo.id)} className="delete-btn">Delete </button>
                        <button className="Edit-btn">Edit </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Input
