import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ReviewModal from './ReviewModal'
import './Testimonials.css'

interface Testimonial {
  name: string
  role: string
  company: string
  text: string
  rating: number
  initials: string
  color: string
}

const testimonials: Testimonial[] = [
  {
    name: 'Rahul Sharma',
    role: 'CEO',
    company: 'TechVision India',
    text: 'Winteg Technologies delivered our e-commerce platform flawlessly. Their attention to detail and commitment to deadlines is remarkable. Highly recommended!',
    rating: 5,
    initials: 'RS',
    color: '#A855F7',
  },
  {
    name: 'Sarah Mitchell',
    role: 'Founder',
    company: 'GreenLeaf Organics',
    text: 'The mobile app they built for us exceeded our expectations. User feedback has been incredible and downloads grew 200% in the first month.',
    rating: 5,
    initials: 'SM',
    color: '#10B981',
  },
  {
    name: 'Ahmed Khan',
    role: 'CTO',
    company: 'DataPulse Analytics',
    text: 'Their AI solution automated our customer support and reduced response time by 80%. The team is technically brilliant and easy to work with.',
    rating: 5,
    initials: 'AK',
    color: '#F59E0B',
  },
  {
    name: 'Priya Patel',
    role: 'Marketing Director',
    company: 'BrightStar Media',
    text: 'Our social media engagement tripled after Winteg took over our accounts. Their strategy and content creation is top-notch.',
    rating: 5,
    initials: 'PP',
    color: '#8B5CF6',
  },
  {
    name: 'James Wilson',
    role: 'Operations Manager',
    company: 'LogiTrack Systems',
    text: 'The inventory management software they built works perfectly on both Windows and Linux. Incredible cross-platform support!',
    rating: 5,
    initials: 'JW',
    color: '#06B6D4',
  },
]

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.9,
    rotateY: direction > 0 ? 15 : -15,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: { type: 'spring' as const, stiffness: 80, damping: 18 },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
    scale: 0.9,
    rotateY: direction > 0 ? -15 : 15,
    transition: { duration: 0.3 },
  }),
}

export default function Testimonials() {
  const [allTestimonials, setAllTestimonials] = useState<Testimonial[]>(testimonials)
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)

  const fetchReviews = async () => {
    try {
      const apiUrl = import.meta.env.PROD
        ? 'https://api.wintegtechnologies.com/api/reviews'
        : '/api/reviews'
      const res = await fetch(apiUrl)
      if (!res.ok) return
      const data = await res.json()
      const colors = ['#A855F7', '#10B981', '#F59E0B', '#8B5CF6', '#06B6D4']
      const formatted = data.map((d: any, i: number) => ({
        name: d.name,
        role: 'Verified Client',
        company: '',
        text: d.text,
        rating: d.rating,
        initials: d.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase() || 'C',
        color: colors[i % colors.length]
      }))
      setAllTestimonials([...testimonials, ...formatted])
    } catch (err) {
      console.error('Failed to fetch reviews', err)
    }
  }

  useEffect(() => {
    fetchReviews()
  }, [])

  const next = useCallback(() => {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % allTestimonials.length)
  }, [allTestimonials.length])

  const prev = useCallback(() => {
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + allTestimonials.length) % allTestimonials.length)
  }, [allTestimonials.length])

  const goTo = useCallback((index: number) => {
    setDirection(index > current ? 1 : -1)
    setCurrent(index)
  }, [current])

  useEffect(() => {
    if (!isAutoPlaying) return
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [isAutoPlaying, next])

  const t = allTestimonials[current] || allTestimonials[0]

  return (
    <section className="testimonials section" id="testimonials">
      <div className="container">
        <motion.div
          className="testimonials__header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Testimonials</span>
          <h2 className="section-title">
            What Our Clients <span className="gradient-text">Say</span>
          </h2>
          <p className="section-subtitle">
            Don't just take our word for it — hear from the businesses we've helped grow.
          </p>
        </motion.div>

        <div
          className="testimonials__carousel"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Large decorative quote mark */}
          <div className="testimonials__quote-mark">"</div>

          <div className="testimonials__stage" style={{ perspective: '1200px' }}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                className="testimonials__card glass-card"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                {/* Stars */}
                <div className="testimonials__stars">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <svg key={j} width="18" height="18" viewBox="0 0 24 24" fill="var(--clr-accent-orange)" stroke="none">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <p className="testimonials__quote">"{t.text}"</p>

                {/* Author */}
                <div className="testimonials__author">
                  <div className="testimonials__avatar" style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}88)` }}>
                    {t.initials}
                  </div>
                  <div className="testimonials__author-info">
                    <span className="testimonials__name">{t.name}</span>
                    <span className="testimonials__role">{t.role}, {t.company}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="testimonials__nav">
            <button className="testimonials__nav-btn" onClick={prev} aria-label="Previous testimonial">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            </button>

            <div className="testimonials__dots">
              {allTestimonials.map((_, i) => (
                <button
                  key={i}
                  className={`testimonials__dot ${current === i ? 'testimonials__dot--active' : ''}`}
                  onClick={() => goTo(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button className="testimonials__nav-btn" onClick={next} aria-label="Next testimonial">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </button>
          </div>
          
          {/* Leave a Review Button */}
          <div className="testimonials__action">
            <button className="btn btn-outline" onClick={() => setIsReviewModalOpen(true)}>
              Leave a Review
            </button>
          </div>
        </div>
      </div>

      <ReviewModal 
        isOpen={isReviewModalOpen} 
        onClose={() => setIsReviewModalOpen(false)} 
        onSuccess={fetchReviews} 
      />
    </section>
  )
}
