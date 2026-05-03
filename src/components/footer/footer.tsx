import { Link } from 'gatsby'
import React from 'react'

import './style.scss'

interface Props {
  author: string
  title: string
}

const Footer: React.FC<Props> = ({ author, title }) => (
  <footer className="py-4 mt-5">
    <div className="container">
      <hr className="border-primary" />
      <p className="mb-0">
        {title}
        <Link to="/profile/" className="d-block">
          <strong>{author}</strong> on Profile
        </Link>
      </p>
    </div>
  </footer>
)

export default Footer
