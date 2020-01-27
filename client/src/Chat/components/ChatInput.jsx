import React from "react"
import PropTypes from "prop-types"

export default function ChatInput({ value, setValue, handleSubmit }) {
  return (
    <div
      style={{
        height: "50px",
        padding: "12px",
      }}
    >
      <form onSubmit={handleSubmit}>
        <input
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={e => e.stopPropagation()}
          style={{
            width: "220px",
            height: "28px",
            padding: "6px",
            fontSize: "16px",
            border: "none",
            borderRadius: "4px 0 0 4px",
          }}
          placeholder="Send a message..."
        />
        <button
          type="submit"
          style={{
            height: "39px",
            fontSize: "16px",
            border: "0",
            background: "#ff5432",
            color: "#ffffee",
            width: "64px",
            borderRadius: "0 4px 4px 0",
          }}
        >
          Send
        </button>
      </form>
    </div>
  )
}

ChatInput.propTypes = {
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}
