import React from "react"

export default function ChatInput({ value, setValue, handleSubmit }) {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={e => e.stopPropagation()}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}
