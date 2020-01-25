import React from "react"
import { useDispatch, useSelector } from "react-redux"

import useKeydown from "../_hooks/useKeydown"
import { makeMove } from "./actions"
import DIRECTIONS from "../_common/directionConstants"

export default function Grid() {
  const dispatch = useDispatch()
  const { grid, score } = useSelector(state => state.game)

  const move = dir => dispatch(makeMove(dir))

  useKeydown("ArrowUp", () => move(DIRECTIONS.UP))
  useKeydown("ArrowDown", () => move(DIRECTIONS.DOWN))
  useKeydown("ArrowRight", () => move(DIRECTIONS.RIGHT))
  useKeydown("ArrowLeft", () => move(DIRECTIONS.LEFT))

  return (
    <div>
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
            <div style={{ display: "inline-block" }}>
              {row.map(cell => (
                <div
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
