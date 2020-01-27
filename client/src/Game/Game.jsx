import React from "react"
import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"

import DIRECTIONS from "../_common/directionsConstants"
import useChannel from "../_hooks/useChannel"
import useKeydown from "../_hooks/useKeydown"
import Panel from "./components/Panel"
import WinLoseModal from "./components/Modal"
import Grid from "./components/Grid"
import { changeGameMode, makeMove, restartGame } from "./actions"

export default function Game({ channel }) {
  const dispatch = useDispatch()
  const { grid, stage, score, gameMode, voteStartedAt, votes } = useSelector(
    state => state.game,
  )

  const move = dir => stage === "running" && dispatch(makeMove(dir))
  const flipGameMode = mode => (mode !== "democracy" ? "democracy" : "anarchy")

  const restart = () => dispatch(restartGame(gameMode))
  const switchGameMode = () => dispatch(changeGameMode(flipGameMode(gameMode)))

  useChannel(channel)

  useKeydown("ArrowUp", () => move(DIRECTIONS.UP))
  useKeydown("ArrowDown", () => move(DIRECTIONS.DOWN))
  useKeydown("ArrowRight", () => move(DIRECTIONS.RIGHT))
  useKeydown("ArrowLeft", () => move(DIRECTIONS.LEFT))

  return (
    <>
      <Panel
        score={score}
        gameMode={gameMode}
        voteStartedAt={voteStartedAt}
        votes={votes}
        restartGame={restart}
        switchGameMode={switchGameMode}
      />
      <WinLoseModal stage={stage} restartGame={restart} />
      <Grid grid={grid} />
    </>
  )
}

Game.propTypes = {
  channel: PropTypes.shape({
    name: PropTypes.string.isRequired,
    topic: PropTypes.string.isRequired,
  }).isRequired,
}
