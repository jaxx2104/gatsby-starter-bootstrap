import React from 'react'
import Link from 'gatsby-link'
import './style.scss'

class SiteNavi extends React.Component {
  render() {
    const { location, title } = this.props
    return (
      <nav className="navbar sticky-top navbar-inverse bg-danger">
        <div className="container">
          <Link to="/">
            <h1 className="navbar-brand mb-0">
              {title}
            </h1>
          </Link>
          <ul className="navbar-nav">
            <li
              className={
                location.pathname === '/' ? 'nav-item active' : 'nav-item'
              }
            >
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li
              className={
                location.pathname === '/profile/'
                  ? 'nav-item active'
                  : 'nav-item'
              }
            >
              <Link to="/profile/" className="nav-link">
                Profile
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default SiteNavi
