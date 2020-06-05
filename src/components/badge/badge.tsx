import React from 'react'

interface Props {
  label: string
  primary: boolean
}

const Badges: React.FC<Props> = ({ label, primary }: Props) => {
  return (
    <span className={`badge ${primary ? 'badge-primary' : 'badge-secondary'}`}>
      {label}
    </span>
  )
}

export default Badges
