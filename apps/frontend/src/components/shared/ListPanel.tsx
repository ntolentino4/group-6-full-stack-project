import type { ReactNode } from 'react'
import './ListPanel.css'

interface ListPanelProps {
  title: string
  children: ReactNode
  headerContent?: ReactNode
  footerContent?: ReactNode
}

function ListPanel({ title, children, headerContent, footerContent }: ListPanelProps) {
  return (
    <section className="list-panel">
      <h2>{title}</h2>
      
      {headerContent && (
        <div className="list-panel__header">{headerContent}</div>
      )}
      
      <div className="list-panel__content">{children}</div>
      
      {footerContent && (
        <div className="list-panel__footer">{footerContent}</div>
      )}
    </section>
  )
}

export default ListPanel