import React from "react"
import { useDispatch, useSelector } from "react-redux"

import DIRECTIONS from "../_common/directionsConstants"
import useChannel from "../_hooks/useChannel"
import useKeydown from "../_hooks/useKeydown"
import Panel from "./components/Panel"
import WinLoseModal from "./components/Modal"
import Grid from "./components/Grid"

import { makeMove } from "../__Grid/actions" // FIXME

export default function Game({ channel }) {
  const dispatch = useDispatch()
  const { grid, stage, score, gameMode, voteStartedAt, votes } = useSelector(
    state => state.game,
  )

  const move = dir => stage === "running" && dispatch(makeMove(dir))

  useChannel(channel)

  useKeydown("ArrowUp", () => move(DIRECTIONS.UP))
  useKeydown("ArrowDown", () => move(DIRECTIONS.DOWN))
  useKeydown("ArrowRight", () => move(DIRECTIONS.RIGHT))
  useKeydown("ArrowLeft", () => move(DIRECTIONS.LEFT))

  return (
    <>
      <button type="button" onClick={() => dispatch({ type: "RESTART_GAME" })}>
        Restart Game
      </button>

      <Panel
        score={score}
        gameMode={gameMode}
        voteStartedAt={voteStartedAt}
        votes={votes}
      />
      <WinLoseModal
        stage={stage}
        restartGame={() => dispatch({ type: "RESTART_GAME" })}
      />
      <Grid grid={grid} />
    </>
  )
}
