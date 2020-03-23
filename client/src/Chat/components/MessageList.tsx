import React, { useRef, useEffect } from "react"

import { formatTime } from "../../_common/utils"
import {
  MessageListContainer,
  MessageItem,
  MessageUser,
  MessageCreatedAt,
} from "../styles"
import { getColor } from "../utils"
import { Message } from "../_types/Message"

type Props = {
  messages: Message[]
}

export default function MessageList({ messages }: Props) {
  const listBottomRef = useRef<null | HTMLDivElement>(null)

  useEffect(() => {
    if (listBottomRef.current) {
      listBottomRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  return (
    <MessageListContainer data-testid="message-list">
      {messages.map(message => (
        <MessageItem key={message.created_at}>
          <MessageUser color={getColor(message.user)}>
            {message.user}
          </MessageUser>
          <MessageCreatedAt>{formatTime(message.created_at)}</MessageCreatedAt>
          <div>{message.body}</div>
        </MessageItem>
      ))}
      <div ref={listBottomRef} />
    </MessageListContainer>
  )
}
