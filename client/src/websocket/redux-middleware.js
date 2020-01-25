import { Socket } from "phoenix"
import { MOVE_UP } from "../Grid/actions"
import {
  SETUP_WEBSOCKET,
  JOIN_CHANNEL,
  joinChannelSuccess,
  joinChannelError,
} from "./actions"

function handleChannelJoin(socket, topic, dispatch) {
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
        channel = handleChannelJoin(socket, payload.topic, dispatch)

        channel.on("moved", console.log)
        channel.on("moved", console.log)
        break

      case MOVE_UP:
        channel
          .push("move:up")
          .receive("ok", msg => console.log("created message", msg))
          .receive("error", reasons => console.log("create failed", reasons))
          .receive("timeout", () => console.log("Networking issue..."))
        break

      default:
        break
    }

    return next(action)
  }
}
