import React, { useState } from "react"
import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"

import useChannel from "../_hooks/useChannel"
import UsersOnline from "./components/UsersOnline"
import MessageList from "./components/MessageList"
import ChatInput from "./components/ChatInput"
import { sendNewMessage } from "./actions"

export default function Chat({ channel }) {
  const [inputValue, setInputValue] = useState("")
  const dispatch = useDispatch()
  const { onlineUsers, messages } = useSelector(state => state.chat)

  useChannel(channel)

  const handleSubmit = e => {
    e.preventDefault()
    const trimmed = inputValue.trim()
    setInputValue("")
    if (trimmed) {
      dispatch(sendNewMessage(trimmed))
    }
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

Chat.propTypes = {
  channel: PropTypes.shape({
    name: PropTypes.string.isRequired,
    topic: PropTypes.string.isRequired,
  }).isRequired,
}
