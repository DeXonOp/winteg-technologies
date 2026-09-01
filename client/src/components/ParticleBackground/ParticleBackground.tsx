import { useEffect, useRef, useMemo } from 'react'
import './ParticleBackground.css'

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  // Reduced to 25 particles for smoother performance on VPS
  const particleSeeds = useMemo(() => 
    Array.from({ length: 25 }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: Math.random() * 1.5 + 0.5,
      speedX: (Math.random() - 0.5) * 0.15,
      speedY: (Math.random() - 0.5) * 0.15,
      opacity: Math.random() * 0.4 + 0.1,
    })), []
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let animationId: number
    let width = window.innerWidth
    let height = window.innerHeight
    let lastFrameTime = 0
    const TARGET_FPS = 30
    const FRAME_INTERVAL = 1000 / TARGET_FPS

    canvas.width = width
    canvas.height = height

    const particles: Particle[] = particleSeeds.map(seed => ({
      x: seed.x * width,
      y: seed.y * height,
      size: seed.size,
      speedX: seed.speedX,
      speedY: seed.speedY,
      opacity: seed.opacity,
    }))

    function animate(timestamp: number) {
      // Throttle to 30fps — saves 50% GPU compared to 60fps
      const elapsed = timestamp - lastFrameTime
      if (elapsed < FRAME_INTERVAL) {
        animationId = requestAnimationFrame(animate)
        return
      }
      lastFrameTime = timestamp - (elapsed % FRAME_INTERVAL)

      ctx!.clearRect(0, 0, width, height)

      particles.forEach((p) => {
        p.x += p.speedX
        p.y += p.speedY

        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0

        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(168, 85, 247, ${p.opacity})`
        ctx!.fill()
      })

      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    // Debounced resize handler — prevents layout thrashing
    let resizeTimer: ReturnType<typeof setTimeout>
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        width = window.innerWidth
        height = window.innerHeight
        canvas.width = width
        canvas.height = height
      }, 150)
    }

    window.addEventListener('resize', handleResize, { passive: true })

    return () => {
      cancelAnimationFrame(animationId)
      clearTimeout(resizeTimer)
      window.removeEventListener('resize', handleResize)
    }
  }, [particleSeeds])

  return <canvas ref={canvasRef} className="particle-background" />
}
