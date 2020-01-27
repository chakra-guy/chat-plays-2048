import React, { useRef, useEffect } from "react"
import PropTypes from "prop-types"
import {
  MessageListContainer,
  Message,
  MessageUser,
  MessageCreatedAt,
} from "../styles"

export default function MessageList({ messages }) {
  const listBottomRef = useRef(null)

  useEffect(() => {
    listBottomRef.current.scrollIntoView()
  }, [messages])

  return (
    <MessageListContainer>
      {/* FIXME use moment.js for thime */}
      {messages.map(message => (
        <Message key={message.created_at}>
          <MessageUser>{message.user}</MessageUser>
          <MessageCreatedAt>{message.created_at}</MessageCreatedAt>
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
