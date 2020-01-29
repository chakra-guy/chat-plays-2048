import React from "react"
import { render, fireEvent } from "@testing-library/react"
import { useDispatch, useSelector } from "react-redux"

import Chat from "../Chat"
import useChannel from "../../_hooks/useChannel"
import { sendNewMessage } from "../actions"

jest.mock("react-redux")

jest.mock("../actions")
jest.mock("../../_hooks/useChannel")

describe("<Chat />", () => {
  // Mock redux
  beforeEach(() => {
    const state = {
      chat: {
        onlineUsers: [],
        messages: [],
      },
    }

    useDispatch.mockImplementation(() => a => a)
    useSelector.mockImplementation(s => s(state))
  })

  afterEach(jest.resetAllMocks)

  it("renders without crashing", () => {
    const { container } = render(<Chat />)
    expect(container).toBeInTheDocument()
  })

  it("renders with the correct components", () => {
    const { getByTestId } = render(<Chat />)

    expect(getByTestId("users-online")).toBeInTheDocument()
    expect(getByTestId("message-list")).toBeInTheDocument()
    expect(getByTestId("chat-input")).toBeInTheDocument()
  })

  it("should join the chat channel", () => {
    render(<Chat />)

    expect(useChannel).toHaveBeenCalledWith({
      name: "chat",
      topic: "chat:current",
    })
  })

  it("when chat input is submitted then it dispatches a send message action", () => {
    const { container, getByText } = render(<Chat />)
    const inputEl = container.querySelector("input")

    // submit without value
    fireEvent.submit(getByText("Send"))

    expect(sendNewMessage).not.toBeCalled()

    // submit with value
    fireEvent.change(inputEl, { target: { value: "   trimmed value   " } })
    fireEvent.submit(getByText("Send"))

    expect(sendNewMessage).toHaveBeenCalledWith("trimmed value")
  })
})
