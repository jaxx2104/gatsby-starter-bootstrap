import React from 'react'
import { Link } from 'gatsby'

import { Navbar } from '../../bootstrap'

interface Props {
  title: string
  location: Location
}

const navItem = (label: string, path: string, current: string) => (
  <li className={`nav-item${current === path ? ' active' : ''}`} key={path}>
    <Link
      to={path}
      className="nav-link"
      aria-current={current === path ? 'page' : undefined}
    >
      {label}
    </Link>
  </li>
)

const Navibar: React.FC<Props> = ({ location, title }) => (
  <Navbar
    brand={
      <Link to="/" className="text-white text-decoration-none">
        <h1 className="h5 mb-0">{title}</h1>
      </Link>
    }
  >
    <ul className="navbar-nav me-auto">
      {navItem('Home', '/', location.pathname)}
      {navItem('Profile', '/profile/', location.pathname)}
    </ul>
  </Navbar>
)

export default Navibar
