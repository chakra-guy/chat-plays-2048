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
} from "../Grid/actions"
import {
  SETUP_WEBSOCKET,
  JOIN_CHANNEL,
  joinChannelSuccess,
  joinChannelError,
} from "./actions"

function joinChannel(socket, topic, username, dispatch) {
  const channel = socket.channel(topic, { username })

  channel
    .join()
    .receive("ok", () => dispatch(joinChannelSuccess()))
    .receive("error", () => dispatch(joinChannelError()))

  return channel
}

export default function websocketMiddleware({ dispatch, getState }) {
  let socket = null
  let channel = null
  let presences = {}

  return next => async action => {
    const { payload, type } = action

    switch (type) {
      case SETUP_WEBSOCKET:
        socket = new Socket("ws://localhost:4000/socket") // FIXME use .env
        socket.connect()
        break

      case JOIN_CHANNEL:
        channel = joinChannel(socket, payload.topic, payload.username, dispatch)

        channel.on("game_state", res => dispatch(setGameState(res)))
        channel.on("game_won", res => dispatch(setGameWon(res)))
        channel.on("moved", res => dispatch(updateGameState(res)))
        channel.on("voted", res => console.log("voted", res)) // FIXME
        channel.on("next_turn", res => dispatch(updateGameState(res)))
        channel.on("game_over", res => dispatch(setGameOver(res)))

        channel.on("presence_state", response => {
          presences = Presence.syncState(presences, response)
          const activeUsers = Presence.list(presences).map(p => p.metas[0])
          dispatch(updateActiveUsers(activeUsers))
        })
        channel.on("presence_diff", res => {
          presences = Presence.syncDiff(presences, res)
          const activeUsers = Presence.list(presences).map(p => p.metas[0])
          dispatch(updateActiveUsers(activeUsers))
        })

        break

      case MAKE_MOVE:
        channel.push(`move:${payload}`)
        break

      case RESTART_GAME:
        const { currentGameMode } = getState().game
        channel.push("restart_game", { game_mode: currentGameMode }) // FIXME
        break

      case CHANGE_GAME_MODE:
        channel.push("change_game_mode", { game_mode: payload }) // FIXME
        break

      default:
        break
    }

    return next(action)
  }
}
