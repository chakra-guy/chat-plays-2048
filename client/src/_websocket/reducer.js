import { SETUP_WEBSOCKET } from "./actions"

const initialState = {
  isConnected: false,
}

export default function websocketReducer(state = initialState, { type }) {
  switch (type) {
    case SETUP_WEBSOCKET:
      return { ...state, isConnected: true }

    default:
      return state
  }
}
