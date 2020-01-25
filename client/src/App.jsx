import React, { useEffect } from "react"
import { useDispatch } from "react-redux"

import Grid from "./Grid/component"
import { setGrid } from "./Grid/actions"
import { setupWebsocket, joinChannel } from "./websocket/actions"

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

export default function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setupWebsocket())
    dispatch(joinChannel({ topic: "game:current" })) // FIXME
    dispatch(setGrid(stuff))
  }, [dispatch])

  return (
    <div>
      <Grid />
    </div>
  )
}
