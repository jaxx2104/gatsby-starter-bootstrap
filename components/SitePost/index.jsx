import React from 'react'
import moment from 'moment'
import { RouteHandler, Link } from 'react-router'
import DocumentTitle from 'react-document-title'
import { prefixLink } from 'gatsby-helpers'
import access from 'safe-access'
import { config } from 'config'
import SiteNavi from '../SiteNavi'
import ReadNext from '../ReadNext'
import './style.css'
import '../../static/css/highlight.css'

class SitePost extends React.Component {
    render() {
        const {route} = this.props
        const post = route.page.data
        console.log(post)

        const category = []
        for (const i in post.categories) {
            const c = post.categories[i]
            category.push(
                 <span className="tag tag-danger">{ c }</span>
            )
        }


        return (
            <div className='container'>
              <div className='articles col-md-12'>
                <div className='article-wrap'>
                  <div className="page-header">
                    <h1>{ post.title }</h1>
                    <time dateTime={ moment(post.date).format('MMMM D, YYYY') }>
                      { moment(post.date).format('YYYY/MM/DD') }
                    </time>
                    { category }
                  </div>
                  <div className="page-content" dangerouslySetInnerHTML={ { __html: post.body } } />
                  <div className='footer'>
                    <ReadNext post={ post } {...this.props}/>
                    <hr></hr>
                    <p>
                      { config.siteDescr }
                      <a href={ config.siteTwitterUrl }>
                        <br></br> <strong>{ config.siteAuthor }</strong> on Twitter</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

        );
    }
}

SitePost.propTypes = {
    post: React.PropTypes.object.isRequired,
    pages: React.PropTypes.array,
}

export default SitePost
