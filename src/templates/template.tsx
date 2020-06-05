import { graphql } from 'gatsby'
import React from 'react'

import Post from './post/post'
import Meta from '../components/meta/meta'
import Layout from '../components/layout/layout'
import Page from './page/page'
import { PostByPathQuery } from '../../types/graphql-types'

interface Props {
  data: PostByPathQuery
  location: Location
}

const Template: React.FC<Props> = ({ data, location }: Props) => {
  const isPage = data.post?.frontmatter?.layout != 'page'
  return (
    <div>
      <Layout location={location}>
        <Meta
          title={data.post?.frontmatter?.title || ''}
          site={data.site?.meta}
        />
        {isPage ? (
          <Post
            data={data}
            options={{
              isIndex: false,
              adsense: data.site?.meta?.adsense,
            }}
          />
        ) : (
          <Page data={data} location={location} />
        )}
      </Layout>
    </div>
  )
}

export default Template

export const pageQuery = graphql`
  query PostByPath($path: String!) {
    site {
      meta: siteMetadata {
        title
        description
        siteUrl
        author
        twitter
        adsense
      }
    }
    post: markdownRemark(frontmatter: { path: { eq: $path } }) {
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
            fluid(maxWidth: 500) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
