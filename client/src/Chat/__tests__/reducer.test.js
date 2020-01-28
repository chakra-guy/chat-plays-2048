import reducer from "../reducer"
import { UPDATE_ONLINE_USERS, UPDATE_MESSAGE_LIST } from "../actions"

describe("chatReducer", () => {
  let existingState

  beforeEach(() => {
    existingState = {
      onlineUsers: [{ username: 1 }],
      messages: [{ message: "first message" }],
    }
  })

  it("returns with existing state when type is unrecognized", () => {
    const state = reducer(existingState, { type: "OTHER_ACTION" })
    expect(state).toEqual(existingState)
  })

  it("returns with a new list of online users when action is UPDATE_ONLINE_USERS", () => {
    const action = {
      type: UPDATE_ONLINE_USERS,
      payload: [{ username: 2 }, { username: 3 }],
    }

    const state = reducer(existingState, action)

    expect(state).toEqual({
      messages: [{ message: "first message" }],
      onlineUsers: [{ username: 2 }, { username: 3 }],
    })
  })

  it("returns with an appended list of messages when action is UPDATE_MESSAGE_LIST", () => {
    const action = {
      type: UPDATE_MESSAGE_LIST,
      payload: { message: "new message" },
    }

    const state = reducer(existingState, action)

    expect(state).toEqual({
      messages: [{ message: "first message" }, { message: "new message" }],
      onlineUsers: [{ username: 1 }],
    })
  })
})
