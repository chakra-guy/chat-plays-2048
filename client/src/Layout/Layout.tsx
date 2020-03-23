import React from "react"

import { Container, Main, Header, Title, Sidebar } from "./styles"

type Props = {
  title: string
  content: JSX.Element
  sidebar: JSX.Element
}

export default function Layout({ title, content, sidebar }: Props) {
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
