import React from "react"
import { render } from "@testing-library/react"

import Layout from "../Layout"

describe("<Layout />", () => {
  it("renders with the correct elements", () => {
    const title = "some title"
    const content = <div data-testid="content" />
    const sidebar = <div data-testid="sidebar" />

    const { getByText, getByTestId } = render(
      <Layout title={title} content={content} sidebar={sidebar} />,
    )

    expect(getByText("some title")).toBeInTheDocument()
    expect(getByTestId("content")).toBeInTheDocument()
    expect(getByTestId("sidebar")).toBeInTheDocument()
  })
})
