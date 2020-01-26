import React, { useEffect } from "react"
import { useDispatch } from "react-redux"

import Grid from "./Grid/component"
import { setupWebsocket, joinChannel } from "./websocket/actions"

export default function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setupWebsocket())
    dispatch(
      joinChannel({
        topic: "game:current",
        username: `tomi-${Math.random()}`,
      }),
    )

    // FIXME order
    // TODO use localStorage for usernames
  }, [dispatch])

  return (
    <div>
      <Grid />
    </div>
  )
}
