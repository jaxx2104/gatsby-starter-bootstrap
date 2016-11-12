import React from 'react'
import { Link } from 'react-router'
import { prune, include as includes } from 'underscore.string'
import find from 'lodash/find'

import './style.css'

class ReadNext extends React.Component {
    render() {
        const {post} = this.props
        const {pages} = this.props.route
        const {readNext} = post

        let nextPost
        if (readNext) {
            nextPost = find(pages, (page) => includes(page.path, readNext)
            )
        }
        if (!nextPost) {
            return React.createElement('noscript', null)
        } else {
            nextPost = find(pages, (page) => includes(page.path, readNext.slice(1, -1))
            )
            const description = nextPost.data.description

            return (
                <div>
                  <h6 style={ {    fontSize: '16px',    margin: '20px 0 0'} }>READ THIS NEXT:</h6>
                  <h3 style={ {    margin: '5px 0 0'} }><Link to={ nextPost.path } query={ {    readNext: true} } > { nextPost.data.title } </Link></h3>
                  <p className='description'>
                    { description }
                  </p>
                </div>
                );
        }
    }
}

ReadNext.propTypes = {
    post: React.PropTypes.object.isRequired,
    pages: React.PropTypes.array,
}

export default ReadNext
