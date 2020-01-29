import React from "react"
import { render } from "@testing-library/react"
import { useDispatch } from "react-redux"

import App from "./App"
import { setupWebsocket } from "./_websocket/actions"
import Game from "./Game/Game"
import Chat from "./Chat/Chat"

jest.mock("react-redux")
jest.mock("./_websocket/actions")
jest.mock("./Game/Game", () => jest.fn())
jest.mock("./Chat/Chat", () => jest.fn())

describe("<App />", () => {
  // Mock child components
  beforeEach(() => {
    Game.mockReturnValue(<div data-testid="GameComponent" />)
    Chat.mockReturnValue(<div data-testid="ChatComponent" />)
  })

  // Mock redux
  beforeEach(() => {
    useDispatch.mockImplementation(() => a => a)
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
