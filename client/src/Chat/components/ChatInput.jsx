import React from "react"
import PropTypes from "prop-types"
import { ChatInputContainer, Input, SendButton } from "../styles"

export default function ChatInput({ value, setValue, handleSubmit }) {
  return (
    <ChatInputContainer data-testid="chat-input">
      <form onSubmit={handleSubmit}>
        <Input
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={e => e.stopPropagation()}
          placeholder="Send a message..."
        />
        <SendButton type="submit">Send</SendButton>
      </form>
    </ChatInputContainer>
  )
}

ChatInput.propTypes = {
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}
