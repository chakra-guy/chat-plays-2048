import { Socket } from "phoenix"
import {
  MAKE_MOVE,
  RESTART_GAME,
  setGameState,
  updateGameState,
  setGameOver,
  setGameWon,
} from "../Grid/actions"
import {
  SETUP_WEBSOCKET,
  JOIN_CHANNEL,
  joinChannelSuccess,
  joinChannelError,
} from "./actions"

function joinChannel(socket, topic, dispatch) {
  const channel = socket.channel(topic, {})

  channel
    .join()
    .receive("ok", () => dispatch(joinChannelSuccess()))
    .receive("error", () => dispatch(joinChannelError()))

  return channel
}

export default function websocketMiddleware({ dispatch }) {
  let socket
  let channel

  return next => async action => {
    const { payload, type } = action

    switch (type) {
      case SETUP_WEBSOCKET:
        socket = new Socket("ws://localhost:4000/socket") // FIXME use .env
        socket.connect()
        break

      case JOIN_CHANNEL:
        channel = joinChannel(socket, payload.topic, dispatch)

        channel.on("game_state", res => dispatch(setGameState(res)))
        channel.on("game_won", res => dispatch(setGameWon(res)))
        channel.on("moved", res => dispatch(updateGameState(res)))
        channel.on("game_over", res => dispatch(setGameOver(res)))
        break

      case MAKE_MOVE:
        channel.push(`move:${payload}`)
        break

      case RESTART_GAME:
        channel.push("restart_game")
        break

      default:
        break
    }

    return next(action)
  }
}
