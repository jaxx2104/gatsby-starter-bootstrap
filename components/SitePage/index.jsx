import React from 'react'
import moment from 'moment'
import { RouteHandler, Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import DocumentTitle from 'react-document-title'
import access from 'safe-access'
import { config } from 'config'
import './style.css';

class SitePage extends React.Component {
    render() {
        const {route} = this.props
        const post = route.page.data
        return (
            <div dangerouslySetInnerHTML={ {__html: post.body} }/>
        );
    }
}

SitePage.propTypes = {
    post: React.PropTypes.object,
    pages: React.PropTypes.array,
}

export default SitePage
