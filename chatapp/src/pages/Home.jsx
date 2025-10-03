import React from 'react'
import UserList from '../Components/UserList'
import ChatWindow from "../Components/ChatWindow"
import '../index.css'

export default function Home() {
  return (
    <div className="app">
      <UserList />
      <ChatWindow />
    </div>
  )
}