import React, { useEffect, useRef, useState } from 'react'

interface DropdownProps {
  label: React.ReactNode
  ariaLabel?: string
  children: React.ReactNode
}

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  ariaLabel,
  children,
}) => {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (!open) return
    const onDocumentClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    document.addEventListener('mousedown', onDocumentClick)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onDocumentClick)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div className="dropdown" ref={ref}>
      <button
        ref={buttonRef}
        className="btn btn-outline-light dropdown-toggle"
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={ariaLabel}
        onClick={() => setOpen((prev) => !prev)}
      >
        {label}
      </button>
      <ul className={`dropdown-menu${open ? ' show' : ''}`}>{children}</ul>
    </div>
  )
}

export default Dropdown
