import React from "react"
import PropTypes from "prop-types"

import GAME_MODE from "../../_common/gameModeConstants"
import {
  PanelContainer,
  ButtonGroup,
  Button,
  PanelText,
  VotesText,
} from "../styles"

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
      <ButtonGroup>
        <Button type="button" onClick={switchGameMode}>
          Switch Game Mode
        </Button>
        <Button type="button" onClick={restartGame}>
          Restart Game
        </Button>
      </ButtonGroup>
      <PanelText>
        <div>Score: {score}</div>
        <div>Game Mode: {gameMode}</div>
      </PanelText>

      {gameMode === DEMOCRACY && (
        <>
          <div>
            {`Remaining time to vote: `}
            {voteStartedAt || "Not started yet"}
          </div>
          <VotesText>
            {`${votes.up} UP ${votes.down} DOWN ${votes.right} RIGHT ${votes.left} LEFT`}
          </VotesText>
        </>
      )}
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
