import { createAction } from "typesafe-actions"
import { Channel } from "../_common/_types/Channel"

export const SETUP_WEBSOCKET = "[Websocket] SETUP_WEBSOCKET"
export const JOIN_CHANNEL = "[Websocket] JOIN_CHANNEL"
export const JOIN_CHANNEL_SUCCESS = "[Websocket] JOIN_CHANNEL_SUCCESS"
export const JOIN_CHANNEL_ERROR = "[Websocket] JOIN_CHANNEL_ERROR"

export const setupWebsocket = createAction(SETUP_WEBSOCKET)<string>()
export const joinChannel = createAction(JOIN_CHANNEL)<Channel>()
export const joinChannelSuccess = createAction(JOIN_CHANNEL_SUCCESS)()
export const joinChannelError = createAction(JOIN_CHANNEL_ERROR)()
