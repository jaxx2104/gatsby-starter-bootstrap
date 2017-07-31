import React from 'react'
import Link from 'gatsby-link'

class SiteNavi extends React.Component {
  render() {
    const { location, title } = this.props
    return (
      <nav className="navbar sticky-top navbar-toggleable-sm navbar-inverse bg-danger">
        <button
          className="navbar-toggler navbar-toggler-right collapsed"
          type="button"
          data-toggle="collapse"
          data-target="#navbarColor02"
          aria-controls="navbarColor02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="container">
          <Link className="text-center" style={{ boxShadow: 'none' }} to="/">
            <h1 className="navbar-brand mb-0">
              {title}
            </h1>
          </Link>
          <div
            className="navbar-collapse collapse"
            id="navbarColor02"
            aria-expanded="false"
          >
            <ul className="navbar-nav mr-auto">
              <li
                className={
                  location.pathname === '/' ? 'nav-item active' : 'nav-item'
                }
              >
                <Link to="/" style={{ boxShadow: 'none' }} className="nav-link">
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
                <Link
                  to="/profile/"
                  style={{ boxShadow: 'none' }}
                  className="nav-link"
                >
                  Profile
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  style={{ boxShadow: 'none' }}
                  id="navbarDropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Link
                </a>
                <div
                  className="dropdown-menu bg-danger"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <a
                    className="dropdown-item"
                    href="https://github.com/jaxx2104/"
                  >
                    Github
                  </a>
                  <a
                    className="dropdown-item"
                    href="https://twitter.com/jaxx2104"
                  >
                    Twitter
                  </a>
                  <a
                    className="dropdown-item"
                    href="https://www.facebook.com/futoshi.iwashita"
                  >
                    Facebook
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default SiteNavi
