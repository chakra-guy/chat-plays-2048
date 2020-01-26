import React, { useEffect } from "react"
import { useDispatch } from "react-redux"

import Grid from "./Grid/component"
import { setupWebsocket, joinChannel } from "./websocket/actions"

export default function App({ username = "tamas" }) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setupWebsocket())
    dispatch(
      joinChannel({
        topic: "game:current",
        username,
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
