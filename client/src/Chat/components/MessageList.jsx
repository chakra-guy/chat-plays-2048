import React from "react"
import PropTypes from "prop-types"

export default function MessageList({ messages }) {
  return (
    <div
      style={{
        height: "400px",
        border: "1px solid black",
      }}
    >
      <ul>
        {/* use moment.js for thime */}
        {messages.map(message => (
          <li key={message.created_at}>
            {message.user} - {message.body} -
            {new Date(message.created_at).toLocaleTimeString()}
          </li>
        ))}
      </ul>
    </div>
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
