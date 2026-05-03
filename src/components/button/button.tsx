import { Link } from 'gatsby'
import React from 'react'

interface Props {
  path: string
  label: string
  primary?: boolean
  visuallyHiddenSuffix?: string
}

const Button: React.FC<Props> = ({
  path,
  label,
  primary = false,
  visuallyHiddenSuffix,
}) => (
  <Link className="readmore" to={path}>
    <span
      className={`btn w-100 ${
        primary ? 'btn-outline-primary' : 'btn-outline-secondary'
      }`}
    >
      {label}
      {visuallyHiddenSuffix && (
        <span className="visually-hidden"> {visuallyHiddenSuffix}</span>
      )}
    </span>
  </Link>
)

export default Button
