import React from 'react'
import { Link, graphql } from 'gatsby'
import Bio from '../components/bio'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { ArticleTitle, ArticleDate, Footer, NavigatorUl, Navigator } from './styledComponents'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <article>
          <header>
            <ArticleTitle>
              {post.frontmatter.title}
            </ArticleTitle>
            <ArticleDate>
              {post.frontmatter.date}
            </ArticleDate>
          </header>
          <section dangerouslySetInnerHTML={{ __html: post.html }} />
          <Footer>
            <Bio />
          </Footer>
        </article>
        <nav>
          <NavigatorUl>
            <li>
              {previous && (
                <Navigator to={previous.fields.slug} rel='prev'>
                  ← {previous.frontmatter.title}
                </Navigator>
              )}
            </li>
            <li>
              {next && (
                <Navigator to={next.fields.slug} rel='next'>
                  {next.frontmatter.title} →
                </Navigator>
              )}
            </li>
          </NavigatorUl>
        </nav>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "dddd, MMMM DD, YYYY hh:mm A")
        description
      }
    }
  }
`
