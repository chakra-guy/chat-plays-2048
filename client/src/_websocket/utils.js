import { Presence, Socket } from "phoenix"

import {
  initializeGame,
  gameMoved,
  gameVoting,
  gameRestarted,
  gameModeChanged,
} from "../Game/actions"
import { updateMessageList, updateOnlineUsers } from "../Chat/actions"
import { joinChannelSuccess, joinChannelError } from "./actions"

const WS_URL = process.env.REACT_APP_WS_URL

export function connectToSocket(username) {
  const socket = new Socket(WS_URL, { params: { username } })
  socket.connect()

  return socket
}

export function joinChannel(socket, topic, dispatch) {
  const channel = socket.channel(topic)

  channel
    .join()
    .receive("ok", () => dispatch(joinChannelSuccess()))
    .receive("error", () => dispatch(joinChannelError()))

  return channel
}

export function handleGameChannelMessages({ game }, dispatch) {
  game.on("game:init", response => {
    dispatch(initializeGame(response))
  })
  game.on("game:moved", response => {
    dispatch(gameMoved(response))
  })
  game.on("game:voting", response => {
    dispatch(gameVoting(response))
  })
  game.on("game:restarted", response => {
    dispatch(gameRestarted(response))
  })
  game.on("game:game_mode_changed", response => {
    dispatch(gameModeChanged(response))
  })
}

export function handleChatChannelMessages({ chat }, dispatch) {
  let presences = {}

  chat.on("chat:new_msg", response => {
    dispatch(updateMessageList(response))
  })
  chat.on("presence_state", response => {
    presences = Presence.syncState(presences, response)
    const onlineUsers = Presence.list(presences).map(p => p.metas[0])
    dispatch(updateOnlineUsers(onlineUsers))
  })
  chat.on("presence_diff", response => {
    presences = Presence.syncDiff(presences, response)
    const onlineUsers = Presence.list(presences).map(p => p.metas[0])
    dispatch(updateOnlineUsers(onlineUsers))
  })
}
