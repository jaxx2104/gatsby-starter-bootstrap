import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import { config } from 'config'
import SiteNavi from '../components/SiteNavi'

import '../static/css/reset.css'
import '../static/css/highlight.css'
import '../static/scss/bootstrap.scss'
import '../static/css/font-awesome.css'

import '../static/css/animate.css'
import '../static/scss/devicons.scss'
import '../static/scss/test.scss'

//import WOW from 'wowjs';
//var wow = new WOW.WOW()

class Template extends React.Component {
    render() {
        const {location, children} = this.props
        return (
            <div>
              <SiteNavi title={ config.siteTitle } {...this.props}/>
              { children }
            </div>
        );

    }

    componentDidMount() {
        const WOW = require('wowjs');
        this.wow = new WOW.WOW()
        this.wow.init()
    }

    componentDidUpdate() {
        this.wow.sync()
    }

}

Template.propTypes = {
    children: React.PropTypes.any,
    location: React.PropTypes.object,
    route: React.PropTypes.object,
}

export default Template
