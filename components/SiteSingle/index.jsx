import React from 'react'
import moment from 'moment'
import { RouteHandler, Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import access from 'safe-access'
import { config } from 'config'
import './style.css';

class SiteSingle extends React.Component {
    render() {
        const {route} = this.props
        const post = route.page.data
        console.log(route)
        return (
            <div className='article-wrap'>
              <div className="page-header">
                <Link style={ { textDecoration: 'none',} } to={ prefixLink(post.path) } >
                  <h1>{ post.title }</h1>
                  <time dateTime={ moment(post.date).format('MMMM D, YYYY') }>
                    { moment(post.date).format('YYYY/MM/DD') }
                  </time>
                </Link>
                <span className="tag tag-danger">{ post.category }</span>
              </div>
              <p dangerouslySetInnerHTML={ {__html: post.body} } />
            </div>
        );
    }
}

SiteSingle.propTypes = {
    post: React.PropTypes.object.isRequired,
    pages: React.PropTypes.array,
}

export default SiteSingle
