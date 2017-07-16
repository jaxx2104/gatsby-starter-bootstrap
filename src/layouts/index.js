import React from 'react'
import Link from 'gatsby-link'
import { Container } from 'react-responsive-grid'
import { siteMetadata } from '../../gatsby-config'
import SiteNavi from '../components/SiteNavi'

import '../scss/gatsrap.scss'
import 'prismjs/themes/prism.css'

class Template extends React.Component {
  render() {
    const { location, children } = this.props
    if (location.pathname === '/') {
    } else {
    }
    return (
      <div>
        <SiteNavi title={siteMetadata.title} {...this.props} />
        {children()}
      </div>
    )
  }
}

export default Template
