import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { useDispatch } from "react-redux"

import { setupWebsocket } from "./_websocket/actions"
import Layout from "./Layout/Layout"
import Chat from "./Chat/Chat"
import Game from "./Game/Game"

export default function App({ username }) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setupWebsocket(username))
  }, [dispatch, username])

  return (
    <Layout title="Chat Plays 2048" content={<Game />} sidebar={<Chat />} />
  )
}

App.propTypes = {
  username: PropTypes.string.isRequired,
}
