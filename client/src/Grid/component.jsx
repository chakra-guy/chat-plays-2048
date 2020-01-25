import React from "react"
import { useDispatch, useSelector } from "react-redux"

import useKeydownListener from "../_hooks/useKeydownListener"
import { fetchTest } from "./actions"

export default function Grid() {
  const dispatch = useDispatch()
  const { count } = useSelector(state => state.grid)

  console.log(" : Grid -> count", count)

  useKeydownListener("ArrowUp", () => {
    console.log("up")
    dispatch(fetchTest())
  })

  const stuff = {
    grid: [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 4, 2, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    score: 0,
  }

  return (
    <div>
      grid
      <br />
      <div
        style={{
          display: "flex",
          height: "120px",
          width: "120px",
          margin: "auto",
        }}
      >
        {stuff.grid.map((row, i) => (
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
