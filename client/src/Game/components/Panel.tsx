import React from "react"
import moment from "moment"

import GAME_MODE from "../../_common/gameModeConstants"
import {
  PanelContainer,
  ButtonGroup,
  Button,
  PanelText,
  VotesText,
} from "../styles"

const { DEMOCRACY } = GAME_MODE

type Props = {
  score: number
  gameMode: string
  votingEndsAt: string
  votes: { up?: number; down?: number; left?: number; right?: number }
  restartGame: () => void
  switchGameMode: () => void
}

export default function Panel(props: Props) {
  const {
    score,
    gameMode,
    votingEndsAt,
    votes,
    restartGame,
    switchGameMode,
  } = props

  return (
    <PanelContainer data-testid="panel">
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
            {/* TODO do a countdown instead of just displaying the end date */}
            {votingEndsAt ? moment(votingEndsAt).format() : "Not started yet"}
          </div>
          <VotesText>
            {`${votes.up} UP ${votes.down} DOWN ${votes.right} RIGHT ${votes.left} LEFT`}
          </VotesText>
        </>
      )}
    </PanelContainer>
  )
}
