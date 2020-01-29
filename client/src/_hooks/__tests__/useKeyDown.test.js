import { fireEvent } from "@testing-library/react"
import { renderHook } from "@testing-library/react-hooks"

import useKeydown from "../useKeydown"

jest.mock("../../_websocket/actions")

describe("useKeydown()", () => {
  const handler = jest.fn()

  afterEach(jest.resetAllMocks)

  it("should add/remove event listeners only once", () => {
    // setting up mocks
    const mockWindow = {}
    const addMock = jest.fn()
    const removeMock = jest.fn()
    mockWindow.addEventListener = addMock
    mockWindow.removeEventListener = removeMock

    const { rerender, unmount } = renderHook(() =>
      useKeydown("ArrowUp", handler, mockWindow),
    )

    rerender()
    rerender()
    rerender()
    unmount()

    expect(addMock).toHaveBeenCalledTimes(1)
    expect(removeMock).toHaveBeenCalledTimes(1)
  })

  it("when random keydown event triggered then nothing should happen", () => {
    renderHook(() => useKeydown("ArrowUp", handler))
    fireEvent.keyDown(window, { key: "random" })
    expect(handler).not.toBeCalled()
  })

  it("when target keydown event triggered then handler is called", () => {
    renderHook(() => useKeydown("ArrowUp", handler))
    fireEvent.keyDown(window, { key: "ArrowUp" })
    expect(handler).toBeCalled()
  })
})
