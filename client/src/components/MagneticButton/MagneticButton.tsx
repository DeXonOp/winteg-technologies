import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: (e: React.MouseEvent) => void
  href?: string
  target?: string
  rel?: string
  type?: 'button' | 'submit'
  disabled?: boolean
  style?: React.CSSProperties
  ariaLabel?: string
  strength?: number
}

export default function MagneticButton({
  children,
  className = '',
  onClick,
  href,
  target,
  rel,
  type,
  disabled,
  style,
  ariaLabel,
  strength = 0.3,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouse = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * strength
    const y = (e.clientY - rect.top - rect.height / 2) * strength
    setPosition({ x, y })
  }

  const handleLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  const Tag = href ? 'a' : 'button'

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 15, mass: 0.5 }}
      style={{ display: 'inline-block' }}
    >
      <Tag
        className={className}
        onClick={onClick}
        href={href}
        target={target}
        rel={rel}
        type={href ? undefined : type}
        disabled={href ? undefined : disabled}
        style={style}
        aria-label={ariaLabel}
      >
        {children}
      </Tag>
    </motion.div>
  )
}
