import { combineReducers, createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"

import websocketMiddleware from "./_websocket/redux-middleware"
import websocketReducer from "./_websocket/reducer"
import chatReducer from "./Chat/reducer"
import gameReducer from "./Game/reducer"

export default function setupStore() {
  const rootReducer = combineReducers({
    websocket: websocketReducer,
    chat: chatReducer,
    game: gameReducer,
  })

  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(websocketMiddleware)),
  )

  return store
}
