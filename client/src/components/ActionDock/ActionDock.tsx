import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './ActionDock.css'

interface DockItem {
  label: string
  icon: React.ReactNode
  href?: string
  onClick?: () => void
  color: string
}

export default function ActionDock() {
  const [expanded, setExpanded] = useState(false)

  const items: DockItem[] = [
    {
      label: 'Email',
      color: '#A855F7',
      href: 'mailto:wintegtechnologies@gmail.com',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
    },
    {
      label: 'Call',
      color: '#06B6D4',
      href: 'tel:+918100474669',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
    },
  ]

  return (
    <div
      className="action-dock"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <AnimatePresence>
        {expanded && (
          <motion.div
            className="action-dock__items"
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            {items.map((item, i) => {
              const Tag = item.href ? 'a' : 'button'
              return (
                <motion.div
                  key={i}
                  className="action-dock__item-wrapper"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <Tag
                    className="action-dock__item"
                    href={item.href}
                    target={item.href?.startsWith('http') ? '_blank' : undefined}
                    rel={item.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                    onClick={item.onClick}
                    style={{ '--dock-color': item.color } as React.CSSProperties}
                    aria-label={item.label}
                  >
                    {item.icon}
                  </Tag>
                  <span className="action-dock__tooltip">{item.label}</span>
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main trigger button */}
      <motion.button
        className="action-dock__trigger"
        onClick={() => setExpanded(!expanded)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Quick Actions"
      >
        <motion.div
          animate={{ rotate: expanded ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </motion.div>
      </motion.button>
    </div>
  )
}
