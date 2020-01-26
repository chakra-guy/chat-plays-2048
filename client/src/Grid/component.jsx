import React from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"

import useKeydown from "../_hooks/useKeydown"
import DIRECTIONS from "../_common/directionsConstants"
import { makeMove, restartGame, changeGameMode } from "./actions"

const Tile = styled.div`
  color: grey;
  display: inline-block;
  height: 72px;
  width: 72px;
  margin: 4px;
  background: aquamarine;
`

export default function Grid() {
  const dispatch = useDispatch()
  const { grid, score, isGameWon, isGameOver, activeUsers } = useSelector(
    state => state.game,
  )

  const move = dir => !isGameWon && !isGameOver && dispatch(makeMove(dir))

  useKeydown("ArrowUp", () => move(DIRECTIONS.UP))
  useKeydown("ArrowDown", () => move(DIRECTIONS.DOWN))
  useKeydown("ArrowRight", () => move(DIRECTIONS.RIGHT))
  useKeydown("ArrowLeft", () => move(DIRECTIONS.LEFT))

  return (
    <div>
      <button
        type="button"
        onClick={() => dispatch(changeGameMode("democracy"))}
      >
        Change to Democracy Mode
      </button>
      <button type="button" onClick={() => dispatch(changeGameMode("anarchy"))}>
        Change to Anarchy Mode
      </button>
      <button type="button" onClick={() => dispatch(restartGame())}>
        Restart Game
      </button>
      {isGameWon && `GAME WON! :)`}
      {isGameOver && `game lost :(`}
      grid {score}
      <br />
      <div>
        <ul>
          {activeUsers.map(user => (
            <li>{user.username}</li>
          ))}
        </ul>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "480px",
          width: "480px",
          margin: "auto",
        }}
      >
        {grid.length &&
          grid.map((row, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={i}>
              {row.map((cell, j) => (
                // eslint-disable-next-line react/no-array-index-key
                <Tile key={`${i}-${j}`}>{cell}</Tile>
              ))}
            </div>
          ))}
      </div>
    </div>
  )
}
