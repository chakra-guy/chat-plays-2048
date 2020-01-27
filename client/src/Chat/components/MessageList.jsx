import React from "react"

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
          <li key={message.timestamp}>
            {message.user} - {message.body} -
            {new Date(message.timestamp).toLocaleTimeString()}
          </li>
        ))}
      </ul>
    </div>
  )
}
