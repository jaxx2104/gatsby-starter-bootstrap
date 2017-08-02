import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import get from 'lodash/get'

import SitePost from '../components/SitePost'
import SitePage from '../components/SitePage'

class BlogPostTemplate extends React.Component {
  render() {
    const post = get(this, 'props.data.post')
    const site = get(this, 'props.data.site')
    const layout = get(post, 'frontmatter.layout')
    const title = get(post, 'frontmatter.title')
    const siteTitle = get(site, 'meta.title')

    let template = ''
    if (layout != 'page') {
      template = <SitePost data={post} site={site} isIndex={false} />
    } else {
      template = <SitePage {...this.props} />
    }
    return (
      <div>
        <Helmet title={`${title} | ${siteTitle}`} />
        {template}
      </div>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    site {
      meta: siteMetadata {
        title
        author
      }
    }
    post: markdownRemark(frontmatter: { path: { eq: $path } }) {
      id
      html
      frontmatter {
        layout
        title
        path
        categories
        date(formatString: "YYYY/MM/DD")
      }
    }
  }
`
