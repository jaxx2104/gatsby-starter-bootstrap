import { Link } from 'gatsby'
import React from 'react'
import './style.scss'

interface Props {
  author: string
  title: string
}

const Footer: React.FC<Props> = ({ author, title }: Props) => (
  <div className="footer">
    <div className="container">
      <hr className="border-primary" />
      <p>
        {title}
        <Link to="/profile/">
          <br />
          <strong>{author}</strong> on Profile
        </Link>
      </p>
    </div>
  </div>
)

export default Footer
