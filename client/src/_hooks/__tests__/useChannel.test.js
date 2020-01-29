import { cleanup } from "@testing-library/react"
import { renderHook } from "@testing-library/react-hooks"
import { useDispatch, useSelector } from "react-redux"

import useChannel from "../useChannel"
import { joinChannel } from "../../_websocket/actions"

jest.mock("react-redux")
jest.mock("../../_websocket/actions")

describe("useChannel()", () => {
  let state

  beforeEach(() => {
    state = {
      websocket: {
        isConnected: false,
      },
    }

    useDispatch.mockImplementation(() => a => a)
    useSelector.mockImplementation(s => s(state))
  })

  afterEach(cleanup)

  it("given websocket is not connected it should not dispatch with anything", () => {
    renderHook(() => useChannel("channel options"))
    expect(joinChannel).not.toBeCalled()
  })

  it("given websocket is connected it should dispatch with join-channel action", () => {
    state.websocket.isConnected = true
    renderHook(() => useChannel("channel options"))
    expect(joinChannel).toHaveBeenCalledWith("channel options")
  })
})
