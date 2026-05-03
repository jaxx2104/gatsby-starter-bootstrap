import React, { useState } from 'react'

interface NavbarProps {
  brand: React.ReactNode
  ariaLabel?: string
  children?: React.ReactNode
}

export const Navbar: React.FC<NavbarProps> = ({
  brand,
  ariaLabel = 'Main navigation',
  children,
}) => {
  const [open, setOpen] = useState(false)
  const collapseId = 'gatstrap-navbar-collapse'
  return (
    <nav
      className="navbar navbar-expand-md navbar-dark bg-primary"
      aria-label={ariaLabel}
    >
      <div className="container">
        <div className="navbar-brand mb-0">{brand}</div>
        <button
          className="navbar-toggler"
          type="button"
          aria-controls={collapseId}
          aria-expanded={open}
          aria-label="Toggle navigation"
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          id={collapseId}
          className={`collapse navbar-collapse${open ? ' show' : ''}`}
        >
          {children}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
