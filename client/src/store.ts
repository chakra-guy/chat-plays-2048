import { combineReducers, createStore, applyMiddleware, Store } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"

import websocketMiddleware from "./_websocket/redux-middleware"
import websocketReducer from "./_websocket/reducer"
import { WebsocketState } from "./_websocket/_types/WebsocketState"
import chatReducer from "./Chat/reducer"
import { ChatState } from "./Chat/_types/ChatState"
import gameReducer from "./Game/reducer"
import { GameState } from "./Game/_types/GameState"

export type AppState = {
  readonly websocket: WebsocketState
  readonly chat: ChatState
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
