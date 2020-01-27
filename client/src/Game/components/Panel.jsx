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
      <div
        style={{
          alignSelf: "center",
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <button
          type="button"
          onClick={switchGameMode}
          style={{
            margin: "12px 0",
            width: "180px",
            background: "#e2e1e1",
            border: "2px solid #a09c9c",
            borderRadius: " 4px",
            padding: "12px",
            fontSize: " 16px",
            fontWeight: " 600",
            color: "#776665",
          }}
        >
          Switch Game Mode
        </button>
        <button
          type="button"
          onClick={restartGame}
          style={{
            margin: "12px 0",
            width: "180px",
            background: "#e2e1e1",
            border: "2px solid #a09c9c",
            borderRadius: " 4px",
            padding: "12px",
            fontSize: " 16px",
            fontWeight: " 600",
            color: "#776665",
          }}
        >
          Restart Game
        </button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          textTransform: "capitalize",
          fontSize: "20px",
          fontWeight: "500",
          marginBottom: "12px",
        }}
      >
        <div>Score: {score}</div>
        <div>Game Mode: {gameMode}</div>
      </div>

      {gameMode === DEMOCRACY && (
        <>
          <div>
            {`Remaining time to vote: `}
            {voteStartedAt || "Not started yet"}
          </div>
          <div
            style={{
              opacity: "0.5",
              marginTop: "2px",
              fontSize: "15px",
            }}
          >
            {`${votes.up} UP ${votes.down} DOWN ${votes.right} RIGHT ${votes.left} LEFT`}
          </div>
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
