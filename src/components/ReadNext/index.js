import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import './style.scss'

class ReadNext extends React.Component {
  render() {
    const data = this.props.data
    const title = get(data, 'meta.title')
    const author = get(data, 'meta.author')

    return (
      <div className="footer">
        <hr className="border-primary" />
        <p>
          {title}
          <Link to="/profile/">
            <br />
            <strong>{author}</strong> on Profile
          </Link>
        </p>
      </div>
    )
  }
}

export default ReadNext
