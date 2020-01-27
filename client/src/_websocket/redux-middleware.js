import { Socket, Presence } from "phoenix"

import {
  SETUP_WEBSOCKET,
  JOIN_CHANNEL,
  joinChannelSuccess,
  joinChannelError,
} from "./actions"
import {
  updateMessageList,
  updateOnlineUsers,
  SEND_NEW_MESSAGE,
} from "../Chat/actions"
import {
  initializeGame,
  gameMoved,
  gameVoting,
  gameRestarted,
  gameModeChanged,
  MAKE_MOVE,
  RESTART_GAME,
  CHANGE_GAME_MODE,
} from "../Game/actions"

const WS_URL = process.env.REACT_APP_WS_URL

function joinChannel(socket, topic, dispatch) {
  const channel = socket.channel(topic)

  channel
    .join()
    .receive("ok", () => dispatch(joinChannelSuccess()))
    .receive("error", () => dispatch(joinChannelError()))

  return channel
}

export default function websocketMiddleware({ dispatch, getState }) {
  let socket = null
  let presences = {}
  const channels = {}

  return next => async action => {
    const { payload, type } = action

    switch (type) {
      case SETUP_WEBSOCKET:
        socket = new Socket(WS_URL, { params: { username: payload } })
        socket.connect()
        break

      case JOIN_CHANNEL:
        channels[payload.name] = joinChannel(socket, payload.topic, dispatch)

        if (payload.name === "game") {
          channels.game.on("game:init", response => {
            dispatch(initializeGame(response))
          })
          channels.game.on("game:moved", response => {
            dispatch(gameMoved(response))
          })
          channels.game.on("game:voting", response => {
            dispatch(gameVoting(response))
          })
          channels.game.on("game:restarted", response => {
            dispatch(gameRestarted(response))
          })
          channels.game.on("game:game_mode_changed", response => {
            dispatch(gameModeChanged(response))
          })
        }

        if (payload.name === "chat") {
          channels.chat.on("chat:new_msg", res => {
            dispatch(updateMessageList(res))
          })
          channels.chat.on("presence_state", response => {
            presences = Presence.syncState(presences, response)
            const onlineUsers = Presence.list(presences).map(p => p.metas[0])
            dispatch(updateOnlineUsers(onlineUsers))
          })
          channels.chat.on("presence_diff", res => {
            presences = Presence.syncDiff(presences, res)
            const onlineUsers = Presence.list(presences).map(p => p.metas[0])
            dispatch(updateOnlineUsers(onlineUsers))
          })
        }
        break

      case MAKE_MOVE:
        channels.game.push(`move:${payload}`)
        break

      case RESTART_GAME:
        channels.game.push("restart_game", { game_mode: payload })
        break

      case CHANGE_GAME_MODE:
        channels.game.push("change_game_mode", { game_mode: payload })
        break

      case SEND_NEW_MESSAGE:
        channels.chat.push("chat:new_msg", { body: payload })
        break

      default:
        break
    }

    return next(action)
  }
}
