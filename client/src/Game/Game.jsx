import React from "react"
import { useDispatch, useSelector } from "react-redux"

import DIRECTIONS from "../_common/directionsConstants"
import useChannel from "../_hooks/useChannel"
import useKeydown from "../_hooks/useKeydown"
import Panel from "./components/Panel"
import WinLoseModal from "./components/Modal"
import Grid from "./components/Grid"

export default function Game({ channel }) {
  const dispatch = useDispatch()
  const { grid, stage, score, gameMode, voteStartedAt, votes } = useSelector(
    state => state.game,
  )

  const flipGameMode = mode => (mode !== "democracy" ? "democracy" : "anarchy")
  const move = dir =>
    stage === "running" && dispatch({ type: "MAKE_MOVE", payload: dir })

  const restartGame = () =>
    dispatch({ type: "RESTART_GAME", payload: gameMode })
  const switchGameMode = () =>
    dispatch({ type: "CHANGE_GAME_MODE", payload: flipGameMode(gameMode) })

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
        restartGame={restartGame}
        switchGameMode={switchGameMode}
      />
      <WinLoseModal stage={stage} restartGame={restartGame} />
      <Grid grid={grid} />
    </>
  )
}
