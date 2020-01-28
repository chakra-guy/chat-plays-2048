import websocketMiddleware from "../redux-middleware"
import { SETUP_WEBSOCKET, JOIN_CHANNEL } from "../actions"
import {
  connectToSocket,
  joinChannel,
  handleGameChannelMessages,
  handleChatChannelMessages,
} from "../utils"
import { MAKE_MOVE, RESTART_GAME, CHANGE_GAME_MODE } from "../../Game/actions"
import { SEND_NEW_MESSAGE } from "../../Chat/actions"

jest.mock("../utils")

describe("websocketMiddleware", () => {
  const channelMock = { push: jest.fn() }
  const store = { dispatch: jest.fn() }
  const next = jest.fn()

  function setupChannel(name, topic) {
    joinChannel.mockImplementation(() => channelMock)
    const middleware = websocketMiddleware(store)
    middleware(next)({ type: JOIN_CHANNEL, payload: { name, topic } })

    return middleware
  }

  afterEach(jest.resetAllMocks)

  it("any action should go through the middleware", () => {
    const action = { type: "SOME_ACTION" }
    websocketMiddleware(store)(next)(action)
    expect(next).toHaveBeenCalledWith(action)
  })

  it("should connect when SETUP_WEBSOCKET action dispatched", () => {
    const action = { type: SETUP_WEBSOCKET, payload: "test-user" }
    websocketMiddleware(store)(next)(action)
    expect(connectToSocket).toHaveBeenCalledWith("test-user")
  })

  it.each`
    name      | topic             | handler
    ${"game"} | ${"game:current"} | ${handleGameChannelMessages}
    ${"chat"} | ${"chat:current"} | ${handleChatChannelMessages}
  `(
    "should join a channel when JOIN_CHANNEL action dispatched and start handling messages",
    ({ name, topic, handler }) => {
      const action = { type: JOIN_CHANNEL, payload: { name, topic } }

      websocketMiddleware(store)(next)(action)

      expect(joinChannel).toHaveBeenCalledWith(null, topic, store.dispatch)
      expect(handler).toHaveBeenCalledWith(
        { [name]: undefined },
        store.dispatch,
      )
    },
  )

  it.each`
    name      | topic             | type                | payload           | message               | expected
    ${"game"} | ${"game:current"} | ${MAKE_MOVE}        | ${"up"}           | ${"move:up"}          | ${["move:up"]}
    ${"game"} | ${"game:current"} | ${RESTART_GAME}     | ${"democracy"}    | ${"restart_game"}     | ${["restart_game", { game_mode: "democracy" }]}
    ${"game"} | ${"game:current"} | ${CHANGE_GAME_MODE} | ${"democracy"}    | ${"change_game_mode"} | ${["change_game_mode", { game_mode: "democracy" }]}
    ${"chat"} | ${"chat:current"} | ${SEND_NEW_MESSAGE} | ${"some message"} | ${"chat:new_msg"}     | ${["chat:new_msg", { body: "some message" }]}
  `(
    "should push `$message` message when $type action dispatched",
    ({ name, topic, type, payload, expected }) => {
      const middleware = setupChannel(name, topic)
      const action = { type, payload }

      middleware(next)(action)

      expect(channelMock.push).toHaveBeenCalledWith(...expected)
    },
  )
})
