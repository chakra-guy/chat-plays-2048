import { Dispatch } from "redux"
import { Socket } from "phoenix"

import { joinChannelSuccess, joinChannelError } from "./actions"

const WS_URL = process.env.REACT_APP_WS_URL as string

export function connectToSocket(username: string) {
  const socket = new Socket(WS_URL, { params: { username } })
  socket.connect()

  return socket
}

export function joinChannel(socket: Socket, topic: string, dispatch: Dispatch) {
  const channel = socket.channel(topic)

  channel
    .join()
    .receive("ok", () => dispatch(joinChannelSuccess()))
    .receive("error", () => dispatch(joinChannelError()))

  return channel
}
