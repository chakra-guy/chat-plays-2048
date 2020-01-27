export const SETUP_WEBSOCKET = "[Websocket] SETUP_WEBSOCKET"
export const JOIN_CHANNEL = "[Websocket] JOIN_CHANNEL"
export const JOIN_CHANNEL_SUCCESS = "[Websocket] JOIN_CHANNEL_SUCCESS"
export const JOIN_CHANNEL_ERROR = "[Websocket] JOIN_CHANNEL_ERROR"

export const setupWebsocket = payload => ({
  type: SETUP_WEBSOCKET,
  payload,
})

export const joinChannel = payload => ({
  type: JOIN_CHANNEL,
  payload,
})

export const joinChannelSuccess = () => ({
  type: JOIN_CHANNEL_SUCCESS,
})

export const joinChannelError = () => ({
  type: JOIN_CHANNEL_ERROR,
})
