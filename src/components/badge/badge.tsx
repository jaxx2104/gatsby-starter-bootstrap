import React from 'react'

interface Props {
  label: string
  primary?: boolean
}

const Badge: React.FC<Props> = ({ label, primary = false }) => (
  <span
    className={`badge me-1 ${
      primary ? 'text-bg-primary' : 'text-bg-secondary'
    }`}
  >
    {label}
  </span>
)

export default Badge
