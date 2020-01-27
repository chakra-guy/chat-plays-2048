import React from "react"
import PropTypes from "prop-types"

import GAME_MODE from "../../_common/gameModeContants"
import { PanelContainer } from "../styles"

const { DEMOCRACY } = GAME_MODE

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
      {gameMode === DEMOCRACY && (
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

Panel.defaultProps = {
  gameMode: "",
  voteStartedAt: "",
}

Panel.propTypes = {
  score: PropTypes.number.isRequired,
  gameMode: PropTypes.string,
  voteStartedAt: PropTypes.string,
  votes: PropTypes.shape({
    up: PropTypes.number,
    down: PropTypes.number,
    right: PropTypes.number,
    left: PropTypes.number,
  }).isRequired,
  restartGame: PropTypes.func.isRequired,
  switchGameMode: PropTypes.func.isRequired,
}
