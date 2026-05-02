import React from 'react'
import { Link } from 'gatsby'

interface Props {
  path: string
  label: string
  primary?: boolean
}

const Button: React.FC<Props> = ({ path, label, primary = false }) => (
  <Link className="readmore" to={path}>
    <span
      className={`btn w-100 ${
        primary ? 'btn-outline-primary' : 'btn-outline-secondary'
      }`}
    >
      {label}
    </span>
  </Link>
)

export default Button
