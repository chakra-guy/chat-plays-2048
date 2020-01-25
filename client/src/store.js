import { combineReducers, createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"

import gridReducer from "./Grid/reducer"

export default function setupStore() {
  const rootReducer = combineReducers({
    grid: gridReducer,
  })

  const store = createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(),
      // webSocketMiddleWare,
      // thunkWithUID,
      // epicMiddleware,
      // LogRocket.reduxMiddleware(),
    ),
  )

  return store
}
