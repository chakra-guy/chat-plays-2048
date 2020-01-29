import reducer from "../reducer"
import { SETUP_WEBSOCKET } from "../actions"

describe("chatReducer", () => {
  let initialState

  beforeEach(() => {
    initialState = {
      isConnected: false,
    }
  })

  it("returns with existing state when type is unrecognized", () => {
    const state = reducer(initialState, { type: "OTHER_ACTION" })
    expect(state).toEqual(initialState)
  })

  it("returns with an updated state when action is SETUP_WEBSOCKET", () => {
    const action = { type: SETUP_WEBSOCKET }
    const state = reducer(initialState, action)
    expect(state).toEqual({ isConnected: true })
  })
})
