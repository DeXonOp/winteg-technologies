import { useEffect, useRef } from 'react'
import './CursorGlow.css'

export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only show on devices with a pointer (not touch)
    const mql = window.matchMedia('(pointer: fine)')
    if (!mql.matches) return

    const el = ref.current
    if (!el) return

    const move = (e: MouseEvent) => {
      el.style.left = e.clientX + 'px'
      el.style.top = e.clientY + 'px'
      el.style.opacity = '1'
    }

    const hide = () => {
      el.style.opacity = '0'
    }

    window.addEventListener('mousemove', move, { passive: true })
    window.addEventListener('mouseleave', hide)

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseleave', hide)
    }
  }, [])

  return <div ref={ref} className="cursor-glow" />
}
