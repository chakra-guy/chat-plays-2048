import React, { useRef, useEffect } from "react"
import PropTypes from "prop-types"
import convertToStyles from "material-color-hash"

import { formatTime } from "../../_common/utils"
import {
  MessageListContainer,
  Message,
  MessageUser,
  MessageCreatedAt,
} from "../styles"

export default function MessageList({ messages }) {
  const listBottomRef = useRef(null)

  useEffect(() => {
    if (listBottomRef.current) {
      listBottomRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  return (
    <MessageListContainer data-testid="message-list">
      {messages.map(message => (
        <Message key={message.created_at}>
          <MessageUser styles={convertToStyles(message.user)}>
            {message.user}
          </MessageUser>
          <MessageCreatedAt>{formatTime(message.created_at)}</MessageCreatedAt>
          <div>{message.body}</div>
        </Message>
      ))}
      <div ref={listBottomRef} />
    </MessageListContainer>
  )
}

MessageList.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      user: PropTypes.string,
      body: PropTypes.string,
      created_at: PropTypes.string,
    }),
  ).isRequired,
}
