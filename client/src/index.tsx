import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import smoothScroll from "smoothscroll-polyfill"

import { setupRandomUsername } from "./_common/utils"
import setupStore from "./store"
import App from "./App"
import "./index.css"

smoothScroll.polyfill()

const store = setupStore()
const username = setupRandomUsername()

ReactDOM.render(
  <Provider store={store}>
    <App username={username} />
  </Provider>,
  document.getElementById("root"),
)
