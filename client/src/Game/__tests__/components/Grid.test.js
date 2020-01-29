import React from "react"
import { render } from "@testing-library/react"

import Grid from "../../components/Grid"

describe("<Grid />", () => {
  it("renders without crashing", () => {
    const { container } = render(<Grid grid={[[]]} />)
    expect(container).toBeInTheDocument()
  })

  it("renders a 6 by 6 grid", () => {
    const grid = [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ]
    const { getAllByText } = render(<Grid grid={grid} />)
    expect(getAllByText("0").length).toBe(36)
  })
})
