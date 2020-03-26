import { Reducer } from "redux"

import { SETUP_WEBSOCKET } from "./actions"
import { WebsocketState } from "./_types/WebsocketState"
import { WebsocketActions } from "./_types/WebsocketActions"

const initialState = {
  isConnected: false,
}

const websocketReducer: Reducer<WebsocketState, WebsocketActions> = (
  state = initialState,
  { type },
) => {
  switch (type) {
    case SETUP_WEBSOCKET:
      return { ...state, isConnected: true }

    default:
      return state
  }
}

export default websocketReducer
