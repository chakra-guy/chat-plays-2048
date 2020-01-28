import React, { useRef, useEffect } from "react"
import PropTypes from "prop-types"
import convertToStyles from "material-color-hash"
import moment from "moment"

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
      {messages.map(message => (
        <Message key={message.created_at}>
          <MessageUser styles={convertToStyles(message.user)}>
            {message.user}
          </MessageUser>
          <MessageCreatedAt>
            {moment(message.created_at)
              .startOf("minute")
              .fromNow()}
          </MessageCreatedAt>
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
