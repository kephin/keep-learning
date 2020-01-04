import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { rhythm, scale } from '../../utils/typography'

export const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: ${rhythm(24)};
  padding: ${rhythm(1.5)} ${rhythm(3 / 4)};
`

const RootTitle = styled.h1`
  ${scale(1.5)};
  margin-bottom: ${rhythm(1.5)};
  margin-top: 0;
`
const NonRootTitle = styled.h3`
  font-family: Montserrat, sans-serif;
  margin-top: 0;
`

export const Title = ({ root, ...props }) => root === true
  ? <RootTitle {...props}/>
  : <NonRootTitle {...props}/>

export const TitleLink = styled(Link)`
  box-shadow: none;
  text-decoration: none;
  color: inherit;
  &:hover {
    text-decoration: none;
  }
`

export const Footer = styled.footer`
  margin-top: 50px;
`
