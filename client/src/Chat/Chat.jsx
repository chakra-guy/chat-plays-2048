import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import useChannel from "../_hooks/useChannel"
import UsersOnline from "./components/UsersOnline"
import MessageList from "./components/MessageList"
import ChatInput from "./components/ChatInput"

export default function Chat({ channel }) {
  const [inputValue, setInputValue] = useState("")
  const dispatch = useDispatch()
  const { onlineUsers, messages } = useSelector(state => state.chat)

  useChannel(channel)

  const handleSubmit = e => {
    e.preventDefault()
    const trimed = inputValue.trim()
    if (trimed) {
      dispatch({ type: "SEND_NEW_MESSAGE", payload: trimed })
    }
    setInputValue("")
  }

  return (
    <>
      <UsersOnline users={onlineUsers} />
      <MessageList messages={messages} />
      <ChatInput
        value={inputValue}
        setValue={setInputValue}
        handleSubmit={handleSubmit}
      />
    </>
  )
}
