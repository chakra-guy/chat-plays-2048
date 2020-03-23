import React, { FormEvent } from "react"

import { ChatInputContainer, Input, SendButton } from "../styles"

type Props = {
  value: string
  setValue: (value: string) => void
  handleSubmit: (event: FormEvent) => void
}

export default function ChatInput({ value, setValue, handleSubmit }: Props) {
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
