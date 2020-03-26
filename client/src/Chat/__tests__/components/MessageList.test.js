import React from "react"
import { render } from "@testing-library/react"

import MessageList from "../../components/MessageList"
import { formatTime } from "../../../_common/utils"

jest.mock("../../../_common/utils")

describe("<MessageList />", () => {
  const scrollIntoViewMock = jest.fn()

  beforeEach(() => {
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock
  })

  beforeEach(() => {
    formatTime.mockImplementation(time => time)
  })

  afterEach(jest.resetAllMocks)

  it("renders without crashing", () => {
    const { container } = render(<MessageList messages={[]} />)
    expect(container).toBeInTheDocument()
  })

  it("renders with a list of messages", () => {
    const messages = [
      {
        user: "test_user_1",
        created_at: "an hour ago",
        body: "some message",
      },
      {
        user: "test_user_2",
        created_at: "2 hours ago",
        body: "another message",
      },
    ]

    const { getByText } = render(<MessageList messages={messages} />)

    expect(getByText("test_user_1")).toBeInTheDocument()
    expect(getByText("an hour ago")).toBeInTheDocument()
    expect(getByText("some message")).toBeInTheDocument()

    expect(getByText("test_user_2")).toBeInTheDocument()
    expect(getByText("2 hours ago")).toBeInTheDocument()
    expect(getByText("another message")).toBeInTheDocument()
  })

  it("scrolls to bottom of the message list when new message arrives", () => {
    const newMessageList = [
      {
        user: "test_user_1",
        created_at: "some UTC date",
        body: "some message",
      },
    ]

    const { rerender } = render(<MessageList messages={[]} />)

    rerender(<MessageList messages={newMessageList} />)

    expect(scrollIntoViewMock).toHaveBeenCalledTimes(2)
  })
})
