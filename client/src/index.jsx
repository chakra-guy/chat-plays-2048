import React from "react"
import ReactDOM from "react-dom"
import { Provider as StoreProvider } from "react-redux"

import "./index.css"
import setupStore from "./store"
import App from "./App"

const store = setupStore()

ReactDOM.render(
  <StoreProvider store={store}>
    <App />
  </StoreProvider>,
  document.getElementById("root"),
)
