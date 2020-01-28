import React from "react"
import ReactDOM from "react-dom"
import { Provider as StoreProvider } from "react-redux"
import smoothScroll from "smoothscroll-polyfill"

import { setupRandomUsername } from "./_common/utils"
import setupStore from "./store"
import App from "./App"
import "./index.css"

smoothScroll.polyfill()

const store = setupStore()
const username = setupRandomUsername()

ReactDOM.render(
  <StoreProvider store={store}>
    <App username={username} />
  </StoreProvider>,
  document.getElementById("root"),
)
