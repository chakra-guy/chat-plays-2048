import React from "react"

import { Container, Main, Header, Content, Sidebar } from "./styles"

export default function Layout({ content, sidebar }) {
  return (
    <Container>
      <Main>
        <Header>header</Header>
        <Content>{content}</Content>
      </Main>
      <Sidebar>{sidebar}</Sidebar>
    </Container>
  )
}
