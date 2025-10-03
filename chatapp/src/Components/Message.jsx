import React, { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'

export default function Message({ msg, me, onEdit, onDelete }) {
    const [editing, setEditing] = useState(false)
    const [text, setText] = useState(msg.text)

    function save() {
        onEdit(msg.id, text)
        setEditing(false)
    }

    const ts = msg.createdAt && msg.createdAt.seconds ? new Date(msg.createdAt.seconds * 1000) : null

    return (
        <div className={`message ${me ? 'me' : 'them'}`}>
            <div style={{ fontSize: 12, color: '#374151' }}>
                {editing ? (
                    <>
                        <input value={text} onChange={e => setText(e.target.value)} />
                        <button onClick={save}>Save</button>
                        <button onClick={() => { setEditing(false); setText(msg.text) }}>Cancel</button>
                    </>
                ) : (
                    <>
                        <div style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</div>
                        <div style={{ fontSize: 11, color: '#6b7280', marginTop: 6 }}>
                            <span style={{ marginRight: 8 }}>{ts ? formatDistanceToNow(ts, { addSuffix: true }) : ''}{msg.editedAt ? ' • edited' : ''}</span>
                            {me && <>
                                <button onClick={() => setEditing(true)}>Edit</button>
                                <button onClick={() => onDelete(msg.id)} style={{ marginLeft: 8 }}>Delete</button>
                            </>}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
