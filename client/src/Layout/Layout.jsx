import React from "react"
import PropTypes from "prop-types"

import { Container, Main, Header, Title, Sidebar } from "./styles"

export default function Layout({ title, content, sidebar }) {
  return (
    <Container>
      <Main>
        <Header>
          <Title>{title}</Title>
        </Header>
        <div>{content}</div>
      </Main>
      <Sidebar>{sidebar}</Sidebar>
    </Container>
  )
}

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.element.isRequired,
  sidebar: PropTypes.element.isRequired,
}
