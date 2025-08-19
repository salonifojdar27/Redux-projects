
import { useDispatch } from "react-redux"
import { useState } from "react";
import { addCard } from "../features/idcardSlice";

const IdForm = ({ onClose }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    photo: ""
  })
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.role || !form.photo) {
      return alert("please fill all details");
    }
    dispatch(addCard(form));
    onClose();
  };

  return (

    <div className="fixed inset-0 bg-gray-300 bg-opacity-50 flex justify-center items-center p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Create ID Card</h2>
          <button type="button" onClick={onClose} className="text-gray-500 hover:text-gray-700">  ✕ </button>
        </div>
        <input className="border p-2 w-full rounded" name="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full Name" />
        <input className="border p-2 w-full rounded" name="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" />
        <input className="border p-2 w-full rounded" name="role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="Role" />
        <input className="border p-2 w-full rounded" name="photo" value={form.photo} onChange={(e) => setForm({ ...form, photo: e.target.value })} placeholder="Photo URL" />
        <div className="flex justify-end gap-2 pt-2">
          <button type="button" className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300" onClick={onClose}>Cancel</button>
          <button type="button" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={handleSubmit}>Add</button>
        </div>
      </form>
    </div>
  );
}

export default IdForm
