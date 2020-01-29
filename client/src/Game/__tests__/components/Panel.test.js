import React from "react"
import { render, fireEvent } from "@testing-library/react"

import Panel from "../../components/Panel"

describe("<Panel />", () => {
  const restartGame = jest.fn()
  const switchGameMode = jest.fn()
  let initialProps

  beforeEach(() => {
    initialProps = {
      score: 1234,
      gameMode: "anarchy",
      votingEndsAt: null,
      votes: { up: 0, down: 0, left: 0, right: 0 },
      restartGame,
      switchGameMode,
    }
  })

  it("renders without crashing", () => {
    const { container } = render(<Panel {...initialProps} />)
    expect(container).toBeInTheDocument()
  })

  it("when it's anarchy mode then it renders with score and mode text", () => {
    const { getByText } = render(<Panel {...initialProps} />)
    expect(getByText("Score: 1234")).toBeInTheDocument()
    expect(getByText("Game Mode: anarchy")).toBeInTheDocument()
  })

  it("when it's democracy mode mode then it renders with score, mode text and vote info", () => {
    const newProps = { ...initialProps, gameMode: "democracy" }
    const { getByText } = render(<Panel {...newProps} />)

    expect(getByText("Score: 1234")).toBeInTheDocument()
    expect(getByText("Game Mode: democracy")).toBeInTheDocument()
    expect(
      getByText("Remaining time to vote: Not started yet"),
    ).toBeInTheDocument()
    expect(getByText("0 UP 0 DOWN 0 RIGHT 0 LEFT")).toBeInTheDocument()
  })

  it("when user clicks `Switch Game Mode` then it switches the game mode", () => {
    const { getByText } = render(<Panel {...initialProps} />)
    fireEvent.click(getByText("Switch Game Mode"))
    expect(switchGameMode).toHaveBeenCalled()
  })

  it("when user clicks `Restart Game` then it restart the game", () => {
    const { getByText } = render(<Panel {...initialProps} />)
    fireEvent.click(getByText("Restart Game"))
    expect(restartGame).toHaveBeenCalled()
  })
})
