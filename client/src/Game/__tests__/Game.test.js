import React from "react"
import { render, fireEvent } from "@testing-library/react"
import { useDispatch, useSelector } from "react-redux"

import Game from "../Game"
import useChannel from "../../_hooks/useChannel"
import { makeMove, restartGame, changeGameMode } from "../actions"

jest.mock("react-redux")
jest.mock("../actions")
jest.mock("../../_hooks/useChannel")

describe("<Game />", () => {
  let state

  // Mock redux
  beforeEach(() => {
    const emptyGrid = Array(6)
      .fill(0)
      .map(() => Array(6).fill(0))

    state = {
      game: {
        userVoted: false,
        grid: emptyGrid,
        score: 1234,
        stage: "running",
        gameMode: "anarchy",
        votingEndsAt: null,
        votes: { up: 0, down: 1, right: 0, left: 0 },
      },
    }

    const dispatch = action => action
    useDispatch.mockImplementation(() => dispatch)
    useSelector.mockImplementation(s => s(state))
  })

  afterEach(jest.resetAllMocks)

  it("renders without crashing", () => {
    const { container } = render(<Game />)
    expect(container).toBeInTheDocument()
  })

  it("renders with the correct components", () => {
    const { getByTestId } = render(<Game />)

    expect(getByTestId("panel")).toBeInTheDocument()
    expect(getByTestId("modal")).toBeInTheDocument()
    expect(getByTestId("grid")).toBeInTheDocument()
  })

  it("should join the game channel", () => {
    render(<Game />)

    expect(useChannel).toHaveBeenCalledWith({
      name: "game",
      topic: "game:current",
    })
  })

  it("when user tries to move but already voted then it should not dispatch with a make move action", () => {
    state.game.userVoted = true
    const { container } = render(<Game />)

    fireEvent.keyDown(container, { key: "ArrowUp" })

    expect(makeMove).not.toBeCalled()
  })

  it("when user tries to move but game is not running then it should not dispatch with a make move action", () => {
    state.game.stage = "game_won"
    const { container } = render(<Game />)

    fireEvent.keyDown(container, { key: "ArrowUp" })

    expect(makeMove).not.toBeCalled()
  })

  it.each`
    keydown         | direction
    ${"ArrowUp"}    | ${"up"}
    ${"ArrowDown"}  | ${"down"}
    ${"ArrowLeft"}  | ${"left"}
    ${"ArrowRight"} | ${"right"}
  `(
    "when user is allowed to make a move and $keydown key pressed then a make move action is dispatched with $direction direction",
    ({ keydown, direction }) => {
      const { container } = render(<Game />)

      fireEvent.keyDown(container, { key: keydown })

      expect(makeMove).toHaveBeenCalledWith(direction)
    },
  )

  it("when the user restarts the game then it should dispatch a restart action with the current game mode", () => {
    const { getByText } = render(<Game />)
    fireEvent.click(getByText("Restart Game"))
    expect(restartGame).toHaveBeenCalledWith("anarchy")
  })

  it("when the user changes game mode then it should dispatch a change action with the other game mode", () => {
    const { getByText } = render(<Game />)
    fireEvent.click(getByText("Switch Game Mode"))
    expect(changeGameMode).toHaveBeenCalledWith("democracy")
  })
})
