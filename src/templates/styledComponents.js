import styled from 'styled-components'
import { rhythm, scale } from '../utils/typography'

export const ArticleTitle = styled.h1`
  margin-top: ${rhythm(1)};
  margin-bottom: 0;
`

export const ArticleDate = styled.p`
  ${scale(-1 / 5)};
  display: block;
  marginBottom: ${rhythm(1)};
`

export const Break = styled.hr`
  margin-bottom: ${rhythm(2)};
`

export const Navigator = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;
  padding: 0;
`
