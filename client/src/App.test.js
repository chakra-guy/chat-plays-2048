import React from "react"
import { render } from "@testing-library/react"
import { useDispatch } from "react-redux"

import App from "./App"
import { setupWebsocket } from "./_websocket/actions"

jest.mock("react-redux")
jest.mock("./_websocket/actions")
jest.mock("./Game/Game", () => () => <div data-testid="GameComponent" />)
jest.mock("./Chat/Chat", () => () => <div data-testid="ChatComponent" />)

describe("<App />", () => {
  beforeEach(() => {
    const dispatch = action => action
    useDispatch.mockImplementation(() => dispatch)
  })

  afterEach(jest.resetAllMocks)

  it("renders without crashing", () => {
    const { container } = render(<App username="test-user" />)
    expect(container).toBeInTheDocument()
  })

  it("renders <Game /> and <Chat /> component", () => {
    const { getByTestId } = render(<App username="test-user" />)

    expect(getByTestId("GameComponent")).toBeInTheDocument()
    expect(getByTestId("ChatComponent")).toBeInTheDocument()
  })

  it("it should set up websocket with a username", () => {
    render(<App username="test-user" />)
    expect(setupWebsocket).toHaveBeenCalledWith("test-user")
  })
})
