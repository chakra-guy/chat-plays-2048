import React from "react"
import PropTypes from "prop-types"

import { Container, Main, Header, Title, Sidebar } from "./styles"

export default function Layout({ content, sidebar }) {
  return (
    <Container>
      <Main>
        <Header>
          <Title>Chat Plays 2048</Title>
        </Header>
        <div>{content}</div>
      </Main>
      <Sidebar>{sidebar}</Sidebar>
    </Container>
  )
}

Layout.propTypes = {
  content: PropTypes.element.isRequired,
  sidebar: PropTypes.element.isRequired,
}
