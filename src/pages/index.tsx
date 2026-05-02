import React from 'react'
import { graphql, type HeadFC } from 'gatsby'

import Post from '../templates/post/post'
import Layout from '../components/layout/layout'
import Meta from '../components/meta/meta'

interface Props {
  data: Queries.IndexQueryQuery
  location: Location
}

const BlogIndex: React.FC<Props> = ({ data, location }) => {
  const posts = data.remark?.posts ?? []
  return (
    <Layout location={location}>
      {posts.map((edge, i) =>
        edge?.post ? (
          <Post
            data={{ post: edge.post, site: data.site }}
            options={{ isIndex: true }}
            key={i}
          />
        ) : null
      )}
    </Layout>
  )
}

export default BlogIndex

export const Head: HeadFC<Queries.IndexQueryQuery> = ({ data }) => (
  <Meta
    title={data.site?.siteMetadata?.title ?? ''}
    description={data.site?.siteMetadata?.description ?? undefined}
    siteUrl={data.site?.siteMetadata?.siteUrl ?? undefined}
    twitter={data.site?.siteMetadata?.twitter ?? undefined}
  />
)

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
        description
        siteUrl
        author
        twitter
      }
    }
    remark: allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      posts: edges {
        post: node {
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
    }
  }
`
