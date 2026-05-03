import { graphql, type HeadFC } from 'gatsby'
import React from 'react'
import Layout from '../components/layout/layout'
import Meta from '../components/meta/meta'
import Page from './page/page'
import Post from './post/post'

interface Props {
  data: Queries.PostByPathQuery
  location: Location
}

const Template: React.FC<Props> = ({ data, location }) => {
  const isPage = data.post?.frontmatter?.layout === 'page'
  return (
    <Layout location={location}>
      {isPage ? (
        <Page data={data} location={location} />
      ) : (
        <Post data={data} options={{ isIndex: false }} />
      )}
    </Layout>
  )
}

export default Template

export const Head: HeadFC<Queries.PostByPathQuery> = ({ data }) => (
  <Meta
    title={data.post?.frontmatter?.title ?? ''}
    description={data.site?.siteMetadata?.description ?? undefined}
    siteUrl={data.site?.siteMetadata?.siteUrl ?? undefined}
    twitter={data.site?.siteMetadata?.twitter ?? undefined}
  />
)

export const pageQuery = graphql`
  query PostByPath($pagePath: String!) {
    site {
      siteMetadata {
        title
        description
        siteUrl
        author
        twitter
      }
    }
    post: markdownRemark(frontmatter: { path: { eq: $pagePath } }) {
      id
      html
      frontmatter {
        layout
        title
        path
        category
        tags
        description
        date(formatString: "YYYY/MM/DD")
        image {
          childImageSharp {
            gatsbyImageData(width: 750, layout: CONSTRAINED)
          }
        }
      }
    }
  }
`
