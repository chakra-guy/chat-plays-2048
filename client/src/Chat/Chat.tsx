import React, { useState, FormEvent } from "react"
import { useDispatch, useSelector } from "react-redux"

import CHANNEL from "../_common/channelConstants"
import useChannel from "../_hooks/useChannel"
import UsersOnline from "./components/UsersOnline"
import MessageList from "./components/MessageList"
import ChatInput from "./components/ChatInput"
import { sendNewMessage } from "./actions"
import { Container } from "./styles"
import { AppState } from "../store"
import { ChatState } from "./_types/ChatState"

const { CHAT } = CHANNEL

export default function Chat() {
  const [inputValue, setInputValue] = useState("")

  const dispatch = useDispatch()
  const { onlineUsers, messages } = useSelector<AppState, ChatState>(
    state => state.chat,
  )

  useChannel(CHAT)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const trimmed = inputValue.trim()
    setInputValue("")
    if (trimmed) {
      dispatch(sendNewMessage(trimmed))
    }
  }

  return (
    <Container>
      <UsersOnline users={onlineUsers} />
      <MessageList messages={messages} />
      <ChatInput
        value={inputValue}
        setValue={setInputValue}
        handleSubmit={handleSubmit}
      />
    </Container>
  )
}
