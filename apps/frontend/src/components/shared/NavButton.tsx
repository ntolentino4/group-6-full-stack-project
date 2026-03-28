import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import './NavButton.css'

interface NavButtonProps {
  to: string
  children: ReactNode
  className?: string
}

function NavButton({ to, children, className }: NavButtonProps) {
  return (
    <Link to={to} className={className ? `nav-button ${className}` : 'nav-button'}>
      {children}
    </Link>
  )
}

export default NavButton
