import React from "react"
import { useDispatch, useSelector } from "react-redux"

import DIRECTIONS from "../_common/directionsConstants"
import GAME_MODE from "../_common/gameModeConstants"
import CHANNEL from "../_common/channelConstants"
import useChannel from "../_hooks/useChannel"
import useKeydown from "../_hooks/useKeydown"
import Panel from "./components/Panel"
import WinLoseModal from "./components/Modal"
import Grid from "./components/Grid"
import { changeGameMode, makeMove, restartGame } from "./actions"

const { UP, DOWN, RIGHT, LEFT } = DIRECTIONS
const { DEMOCRACY, ANARCHY } = GAME_MODE
const { GAME } = CHANNEL

export default function Game() {
  const {
    grid,
    stage,
    score,
    gameMode,
    votingEndsAt,
    votes,
    userVoted,
  } = useSelector(state => state.game)
  const dispatch = useDispatch()

  const canUserMakeMove = !userVoted && stage === "running"

  const move = dir => canUserMakeMove && dispatch(makeMove(dir))
  const flipGameMode = mode => (mode === DEMOCRACY ? ANARCHY : DEMOCRACY)

  const restart = () => dispatch(restartGame(gameMode))
  const switchGameMode = () => dispatch(changeGameMode(flipGameMode(gameMode)))

  useChannel(GAME)

  useKeydown("ArrowUp", () => move(UP))
  useKeydown("ArrowDown", () => move(DOWN))
  useKeydown("ArrowRight", () => move(RIGHT))
  useKeydown("ArrowLeft", () => move(LEFT))

  return (
    <>
      <Panel
        score={score}
        gameMode={gameMode}
        votingEndsAt={votingEndsAt}
        votes={votes}
        restartGame={restart}
        switchGameMode={switchGameMode}
      />
      <WinLoseModal stage={stage} restartGame={restart} />
      <Grid grid={grid} />
    </>
  )
}
