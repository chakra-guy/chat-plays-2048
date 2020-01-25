import React from "react"
import { useDispatch, useSelector } from "react-redux"

import useKeydown from "../_hooks/useKeydown"
import DIRECTIONS from "../_common/directionsConstants"
import { makeMove, restartGame } from "./actions"

export default function Grid() {
  const dispatch = useDispatch()
  const { grid, score, isGameWon, isGameOver } = useSelector(
    state => state.game,
  )

  const move = dir => !isGameWon && !isGameOver && dispatch(makeMove(dir))

  useKeydown("ArrowUp", () => move(DIRECTIONS.UP))
  useKeydown("ArrowDown", () => move(DIRECTIONS.DOWN))
  useKeydown("ArrowRight", () => move(DIRECTIONS.RIGHT))
  useKeydown("ArrowLeft", () => move(DIRECTIONS.LEFT))

  return (
    <div>
      <button type="button" onClick={() => dispatch(restartGame())}>
        Restart Game
      </button>
      {isGameWon && `GAME WON! :)`}
      {isGameOver && `game lost :(`}
      grid {score}
      <br />
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
                <div
                  // eslint-disable-next-line react/no-array-index-key
                  key={`${i}-${j}`}
                  style={{
                    display: "inline-block",
                    height: "72px",
                    width: "72px",
                    margin: "4px",
                    background: "aliceblue",
                  }}
                >
                  {cell}
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  )
}
