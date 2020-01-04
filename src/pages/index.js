import React from 'react'
import { Link, graphql } from 'gatsby'
import styled from 'styled-components'
import { rhythm } from '../utils/typography'
import Bio from '../components/bio'
import Layout from '../components/layout'
import SEO from '../components/seo'

const ArticleTitle = styled.h3`
  margin-bottom: ${rhythm(1 / 4)};
`

const ArticleLink = styled(Link)`
  box-shadow: none;
  &:hover {
    text-decoration: none;
  }
`

class BlogIndex extends React.Component {
  render() {
    const { data, location } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={location} title={siteTitle}>
        <SEO title='All posts' />
        <Bio />
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <article key={node.fields.slug}>
              <header>
                <ArticleTitle>
                  <ArticleLink to={node.fields.slug}>
                    {title}
                  </ArticleLink>
                </ArticleTitle>
                <small>{node.frontmatter.date}</small>
              </header>
              <section>
                <p
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || node.excerpt,
                  }}
                />
              </section>
            </article>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
