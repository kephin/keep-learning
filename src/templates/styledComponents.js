import styled from 'styled-components'
import { Link } from 'gatsby'
import { rhythm, scale } from '../utils/typography'

export const ArticleTitle = styled.h1`
  color: rgb(196, 167, 94);
  margin-top: ${rhythm(1)};
  margin-bottom: 0;
`

export const ArticleDate = styled.p`
  color: rgb(136, 108, 59);
  ${scale(-1 / 5)};
  display: block;
  marginBottom: ${rhythm(1)};
`

export const NavigatorUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;
  padding: 0;
`

export const Navigator = styled(Link)`
  color: rgb(196, 167, 94);
  font-weight: bold;
`

export const Footer = styled.footer`
  margin-top: 50px;
`
