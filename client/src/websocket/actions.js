export const SETUP_WEBSOCKET = "[WS middleware] SETUP_WEBSOCKET"
export const JOIN_CHANNEL = "[WS middleware] JOIN_CHANNEL"
export const JOIN_CHANNEL_SUCCESS = "[WS middleware] JOIN_CHANNEL_SUCCESS"
export const JOIN_CHANNEL_ERROR = "[WS middleware] JOIN_CHANNEL_ERROR"

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
