import React from "react"
import { render } from "@testing-library/react"

import UsersOnline from "../../components/UsersOnline"
import { formatTime } from "../../../_common/utils"

jest.mock("../../../_common/utils")

describe("<UsersOnline />", () => {
  beforeEach(() => {
    formatTime.mockImplementation(time => time)
  })

  it("renders without crashing", () => {
    const { container } = render(<UsersOnline users={[]} />)
    expect(container).toBeInTheDocument()
  })

  it("renders with usernames and online-since info", () => {
    const users = [
      {
        username: "test_user_1",
        online_at: "an hour ago",
      },
      {
        username: "test_user_2",
        online_at: "2 hours ago",
      },
    ]

    const { getByText } = render(<UsersOnline users={users} />)

    expect(getByText("Users Online")).toBeInTheDocument()

    expect(getByText("test_user_1")).toBeInTheDocument()
    expect(getByText("an hour ago")).toBeInTheDocument()

    expect(getByText("test_user_2")).toBeInTheDocument()
    expect(getByText("2 hours ago")).toBeInTheDocument()
  })
})
