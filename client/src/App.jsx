import React, { useEffect } from "react"
import { useDispatch } from "react-redux"

import { setupWebsocket, joinChannel } from "./websocket/actions"
import Layout from "./Layout/Layout"
import Chat from "./Chat/Chat"
import Game from "./Game/Game"

export default function App({ username }) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setupWebsocket(username))
  }, [dispatch])

  return (
    <Layout
      content={<Game channel={{ name: "game", topic: "game:current" }} />}
      sidebar={<Chat channel={{ name: "chat", topic: "chat:current" }} />}
    />
  )
}
