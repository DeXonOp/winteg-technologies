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

interface ActionDockProps {
  onOpenChat?: () => void
}

export default function ActionDock({ onOpenChat }: ActionDockProps) {
  const [expanded, setExpanded] = useState(false)

  const items: DockItem[] = [
    {
      label: 'AI Assistant',
      color: '#7C3AED',
      onClick: () => {
        if (onOpenChat) onOpenChat()
      },
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      ),
    },
    {
      label: 'Contact Us',
      color: '#2563EB',
      href: '#contact',
      onClick: (e?: any) => {
        if (e && e.preventDefault) e.preventDefault()
        const el = document.getElementById('contact') || document.getElementById('hero-contact')
        if (el) {
          const rect = el.getBoundingClientRect()
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop
          window.scrollTo({ top: rect.top + scrollTop - 72, behavior: 'smooth' })
        }
      },
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
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
