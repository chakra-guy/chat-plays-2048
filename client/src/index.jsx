import React from "react"
import ReactDOM from "react-dom"
import { Provider as StoreProvider } from "react-redux"

import "./index.css"
import setupStore from "./store"
import App from "./App"
import setupRandomUsername from "./_common/utils"

const store = setupStore()
const username = setupRandomUsername()

ReactDOM.render(
  <StoreProvider store={store}>
    <App username={username} />
  </StoreProvider>,
  document.getElementById("root"),
)
