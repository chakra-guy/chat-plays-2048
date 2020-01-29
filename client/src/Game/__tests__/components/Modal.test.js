import React from "react"
import { render, fireEvent } from "@testing-library/react"
import WinLoseModal from "../../components/Modal"

describe("<WinLoseModal />", () => {
  const restartGame = jest.fn()

  it("renders without crashing", () => {
    const { container } = render(
      <WinLoseModal stage="running" restartGame={restartGame} />,
    )
    expect(container).toBeInTheDocument()
  })

  it("when user clicks on `Restart Game` it should restart the game", () => {
    const { getByText } = render(
      <WinLoseModal stage="game_won" restartGame={restartGame} />,
    )

    fireEvent.click(getByText("Restart Game"))

    expect(restartGame).toHaveBeenCalled()
  })

  it("should display winner's modal when stage is `game_won`", () => {
    const { getByText } = render(
      <WinLoseModal stage="game_won" restartGame={restartGame} />,
    )
    expect(getByText("You won! 🎉")).toBeInTheDocument()
  })

  it("should display loser's modal when stage is `game_lost`", () => {
    const { getByText } = render(
      <WinLoseModal stage="game_lost" restartGame={restartGame} />,
    )
    expect(getByText("You lost 💀")).toBeInTheDocument()
  })
})
