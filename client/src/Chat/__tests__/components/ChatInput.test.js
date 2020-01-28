import React from "react"
import { render, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import ChatInput from "../../components/ChatInput"

describe("<ChatInput />", () => {
  const value = ""
  const setValue = jest.fn()
  const handleSubmit = jest.fn()

  it("renders without crashing", () => {
    const { container } = render(
      <ChatInput
        value={value}
        setValue={setValue}
        handleSubmit={handleSubmit}
      />,
    )
    expect(container).toBeInTheDocument()
  })

  it("should display value in the input box and on change it should update the componet", () => {
    const { container } = render(
      <ChatInput
        value="some value"
        setValue={setValue}
        handleSubmit={handleSubmit}
      />,
    )

    const inputEl = container.querySelector("input")

    expect(inputEl.value).toBe("some value")

    userEvent.type(inputEl, "new")

    expect(setValue).toHaveBeenCalledWith("new")
  })

  it("should display with 'Send' button and on submit/click it should submit the form", () => {
    const { getByText } = render(
      <ChatInput
        value="another value"
        setValue={setValue}
        handleSubmit={handleSubmit}
      />,
    )

    fireEvent.submit(getByText("Send"))

    expect(handleSubmit).toHaveBeenCalled()
  })
})
