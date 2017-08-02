import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import size from 'lodash/size'
import ReadNext from '../ReadNext'

class SitePost extends React.Component {
  more(body, path) {
    if (body.match('<!--more-->')) {
      return (
        <Link className="readmore" to={path}>
          <span className="btn btn-outline-danger btn-block">MORE</span>
        </Link>
      )
    }
    return
  }

  description(body) {
    let test = body.replace(/<blockquote>/g, '<blockquote class="blockquote">')
    if (test.match('<!--more-->')) {
      test = test.split('<!--more-->')
      if (typeof test[0] !== 'undefined') {
        return test[0]
      }
    }
    return test
  }

  categories(data) {
    if (!data) {
      return
    }
    const categories = []
    data.forEach((category, i) => {
      categories.push(
        <span className="badge badge-danger" key={i}>
          {category}
        </span>
      )
    })
    return categories
  }

  render() {
    const { site, data, isIndex } = this.props

    const title = get(data, 'frontmatter.title')
    const path = get(data, 'frontmatter.path')
    const date = get(data, 'frontmatter.date')
    const desc = get(data, 'frontmatter.description') || get(data, 'html')
    const cate =
      get(data, 'frontmatter.category') || get(data, 'frontmatter.categories')

    const categories = cate ? this.categories(cate) : ''
    const description = isIndex ? this.description(desc) : desc
    const more = isIndex ? this.more(desc, path) : ''
    const footer = isIndex ? '' : <ReadNext data={site} />

    return (
      <div className="container">
        <div className="articles col-md-12">
          <div className="article-wrap" key={path}>
            <div className="page-header">
              <Link style={{ boxShadow: 'none' }} to={path}>
                <h1>
                  {title}
                </h1>
                <time dateTime={date}>
                  {date}
                </time>
              </Link>
              {categories}
            </div>
            <div
              className="page-content"
              dangerouslySetInnerHTML={{ __html: description }}
            />
            {more}
            {footer}
          </div>
        </div>
      </div>
    )
  }
}

export default SitePost
