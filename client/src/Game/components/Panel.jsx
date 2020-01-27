import React from "react"

import { PanelContainer } from "../styles"

export default function Panel(props) {
  const {
    score,
    gameMode,
    voteStartedAt,
    votes,
    restartGame,
    switchGameMode,
  } = props

  return (
    <PanelContainer>
      <div>score: {score}</div>
      <div>gameMode: {gameMode}</div>
      {/* FIXME add constant for game modes */}
      {gameMode === "democracy" && (
        <>
          <div>voteStartedAt: {voteStartedAt}</div>
          <div>votes: {JSON.stringify(votes)}</div>
        </>
      )}
      <hr />
      <button type="button" onClick={switchGameMode}>
        Switch Game Mode
      </button>
      <button type="button" onClick={restartGame}>
        Restart Game
      </button>
    </PanelContainer>
  )
}
