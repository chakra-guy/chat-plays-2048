import React from "react"
import { useDispatch, useSelector } from "react-redux"

import useKeydownListener from "../_hooks/useKeydownListener"
import { moveUp } from "./actions"

export default function Grid() {
  const dispatch = useDispatch()
  const { grid, score } = useSelector(state => state.grid)

  useKeydownListener("ArrowUp", () => {
    console.log("up")
    dispatch(moveUp())
  })

  return (
    <div>
      grid {score}
      <br />
      <div
        style={{
          display: "flex",
          height: "120px",
          width: "120px",
          margin: "auto",
        }}
      >
        {grid.map((row, i) => (
          <div style={{ flex: "1" }}>
            {row.map(cell => (
              <div>{cell}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
