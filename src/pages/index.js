import React from "react"
import Link from "gatsby-link"
import get from "lodash/get"
import sortBy from "lodash/sortBy"
import Helmet from "react-helmet"

import SitePost from "../components/SitePost"

class BlogIndex extends React.Component {
  render() {
    // console.log("props", this.props)
    const pageLinks = []
    const site = get(this, "props.data.site.siteMetadata")
    const posts = get(this, "props.data.remark.posts")
    const sortedPosts = sortBy(posts, (post) => get(post, "post.frontmatter.date")).reverse()

    sortedPosts.forEach((data, i) => {
      if (data.post.frontmatter.layout === "post" && data.post.path !== "/404/") {
        pageLinks.push(
          <SitePost
            data={data.post}
            site={site}
            isIndex={true}
            key={i}
          ></SitePost>
        )
      }
    })

    return (
      <div>
        <Helmet title={get(this, "props.data.site.siteMetadata.title")} />
        {pageLinks}
      </div>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
        author
      }
    }
    remark: allMarkdownRemark {
      posts: edges {
        post: node {
          html
          frontmatter {
            layout
            title
            path
            category
            description
            date(formatString: "YYYY/MM/DD")
          }
        }
      }
    }
  }
`
