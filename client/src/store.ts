import { combineReducers, createStore, applyMiddleware, Store } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"

import websocketMiddleware from "./_websocket/redux-middleware"
import websocketReducer from "./_websocket/reducer"
import chatReducer from "./Chat/reducer"
import gameReducer from "./Game/reducer"
import { GameState } from "./Game/_types/GameState"

export type AppState = {
  readonly websocket: any
  readonly chat: any
  readonly game: GameState
}

export default function setupStore(): Store<AppState> {
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
