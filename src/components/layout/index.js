import React from 'react'
import { Container, Title, TitleLink, Footer } from './styledComponents'

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    const header = (
      <Title root={location.pathname === rootPath}>
        <TitleLink to={`/`}>
          {title}
        </TitleLink>
      </Title>
    )
    return (
      <Container>
        <header>{header}</header>
        <main>{children}</main>
        <Footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href='https://www.gatsbyjs.org'>Gatsby</a>
        </Footer>
      </Container>
    )
  }
}

export default Layout
