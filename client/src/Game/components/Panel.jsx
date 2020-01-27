import React from "react"

import { PanelContainer } from "../styles"

export default function Panel({ score, gameMode, voteStartedAt, votes }) {
  return (
    <PanelContainer>
      <div>score: {score}</div>
      <div>gameMode: {gameMode}</div>
      {gameMode === "democracy" && (
        <>
          <div>voteStartedAt: {voteStartedAt}</div>
          <div>votes: {JSON.stringify(votes)}</div>
        </>
      )}
    </PanelContainer>
  )
}
