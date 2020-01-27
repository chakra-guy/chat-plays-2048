import { Socket, Presence } from "phoenix"
import {
  MAKE_MOVE,
  RESTART_GAME,
  CHANGE_GAME_MODE,
  setGameState,
  updateGameState,
  setGameOver,
  setGameWon,
  updateActiveUsers,
} from "../__Grid/actions"
import {
  SETUP_WEBSOCKET,
  JOIN_CHANNEL,
  joinChannelSuccess,
  joinChannelError,
} from "./actions"

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
  const channels = {}
  let presences = {}

  return next => async action => {
    const { payload, type } = action

    switch (type) {
      case SETUP_WEBSOCKET: {
        socket = new Socket("ws://localhost:4000/socket", {
          params: { username: payload },
        }) // FIXME use .env
        socket.connect()
        break
      }

      case JOIN_CHANNEL: {
        channels[payload.name] = joinChannel(socket, payload.topic, dispatch)

        if (payload.name === "game") {
          channels.game.on("game:init", response => {
            console.log("init", response)
            dispatch({ type: "INIT_GAME", payload: response })
          }) // FIXME
          channels.game.on("game:moved", response => {
            console.log("moved", response)
            dispatch({ type: "GAME_MOVED", payload: response })
          }) // FIXME
          channels.game.on("game:voting", response => {
            console.log("voting", response)
            dispatch({ type: "GAME_VOTING", payload: response })
          }) // FIXME
          channels.game.on("game:restarted", response => {
            console.log("restarted", response)
            dispatch({ type: "GAME_RESTARTED", payload: response })
          }) // FIXME
          channels.game.on("game:game_mode_changed", r =>
            console.log("modechanged", r),
          ) // FIXME
        }

        if (payload.name === "chat") {
          channels.chat.on("chat:new_msg", res => {
            console.log("chat:new_msg", res)
            dispatch({ type: "UPDATE_MESSAGE_LIST", payload: res })
          })
          channels.chat.on("presence_state", response => {
            presences = Presence.syncState(presences, response)
            const onlineUsers = Presence.list(presences).map(p => p.metas[0])
            dispatch({ type: "UPDATE_ONLINE_USERS", payload: onlineUsers })
          })
          channels.chat.on("presence_diff", res => {
            presences = Presence.syncDiff(presences, res)
            const onlineUsers = Presence.list(presences).map(p => p.metas[0])
            dispatch({ type: "UPDATE_ONLINE_USERS", payload: onlineUsers })
          })
        }

        break
      }

      case MAKE_MOVE: {
        channels.game.push(`move:${payload}`)
        break
      }

      case "RESTART_GAME": {
        const { currentGameMode } = getState().game
        channels.game.push("restart_game", { game_mode: "anarchy" }) // FIXME
        // channels.game.push("restart_game", { game_mode: currentGameMode }) // FIXME
        break
      }

      case CHANGE_GAME_MODE: {
        channels.game.push("change_game_mode", { game_mode: payload }) // FIXME
        break
      }

      case "SEND_NEW_MESSAGE": {
        channels.chat.push("chat:new_msg", { body: payload }) // FIXME
        break
      }

      default:
        break
    }

    return next(action)
  }
}
