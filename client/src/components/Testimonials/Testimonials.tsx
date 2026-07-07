import { useState, useEffect, useCallback } from 'react'
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
    color: '#6C63FF',
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
    color: '#00D9FF',
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }, [])

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }, [])

  useEffect(() => {
    if (!isAutoPlaying) return
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [isAutoPlaying, next])

  return (
    <section className="testimonials section" id="testimonials">
      <div className="container">
        <div className="testimonials__header fade-in">
          <span className="section-label">Testimonials</span>
          <h2 className="section-title">
            What Our Clients <span className="gradient-text">Say</span>
          </h2>
          <p className="section-subtitle">
            Don't just take our word for it — hear from the businesses we've helped grow.
          </p>
        </div>

        <div
          className="testimonials__carousel fade-in"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="testimonials__track" style={{ transform: `translateX(-${current * 100}%)` }}>
            {testimonials.map((t, i) => (
              <div className="testimonials__slide" key={i}>
                <div className="testimonials__card glass-card">
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
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="testimonials__nav">
            <button className="testimonials__nav-btn" onClick={prev} aria-label="Previous testimonial">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            </button>

            <div className="testimonials__dots">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`testimonials__dot ${current === i ? 'testimonials__dot--active' : ''}`}
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button className="testimonials__nav-btn" onClick={next} aria-label="Next testimonial">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
