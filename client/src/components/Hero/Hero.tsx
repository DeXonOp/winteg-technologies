import { useEffect, useState, type FormEvent } from 'react'
import CustomSelect from '../CustomSelect/CustomSelect'
import './Hero.css'

const phrases = [
  'Stunning Websites',
  'Powerful Web Apps',
  'AI-Powered Solutions',
  'Mobile Applications',
  'Desktop Software',
  'Social Media Growth',
  'Winteg Technologies',
]

export default function Hero() {
  const [currentPhrase, setCurrentPhrase] = useState(0)
  const [displayText, setDisplayText] = useState(phrases[0])
  const [isDeleting, setIsDeleting] = useState(false)

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    budget: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const phrase = phrases[currentPhrase]
    let timeout: ReturnType<typeof setTimeout>

    if (!isDeleting) {
      if (displayText.length < phrase.length) {
        timeout = setTimeout(() => {
          setDisplayText(phrase.substring(0, displayText.length + 1))
        }, 80)
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000)
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(phrase.substring(0, displayText.length - 1))
        }, 40)
      } else {
        setIsDeleting(false)
        setCurrentPhrase((prev) => (prev + 1) % phrases.length)
      }
    }

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentPhrase])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSubmitted(false)

    try {
      const apiUrl = import.meta.env.PROD
        ? 'https://api.wintegtechnologies.com/api/contact'
        : '/api/contact'

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        let errorMessage = 'Failed to send message'
        if (result.detail) {
          if (Array.isArray(result.detail)) {
            errorMessage = result.detail
              .map((err: any) => {
                const field = err.loc && err.loc.length > 1 ? err.loc[1] : ''
                if (field === 'message') return 'Message too short to send'
                return field ? `${field.charAt(0).toUpperCase() + field.slice(1)}: ${err.msg}` : err.msg
              })
              .join(', ')
          } else if (typeof result.detail === 'string') {
            errorMessage = result.detail
          } else {
            errorMessage = JSON.stringify(result.detail)
          }
        }
        throw new Error(errorMessage)
      }

      setSubmitted(true)
      setFormData({ name: '', email: '', phone: '', service: '', budget: '', message: '' })
      setTimeout(() => setSubmitted(false), 5000)
    } catch (err: any) {
      console.error('Error submitting contact form:', err)
      setError(err.message || 'An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="hero" id="home">
      {/* Animated background */}
      <div className="hero__bg">
        <div className="hero__gradient-orb hero__gradient-orb--1"></div>
        <div className="hero__gradient-orb hero__gradient-orb--2"></div>
        <div className="hero__gradient-orb hero__gradient-orb--3"></div>
        <div className="hero__grid"></div>
      </div>

      <div className="hero__content container">
        <div className="hero__grid-layout">
          {/* Left Column: Headlines, Subtitles, Stats */}
          <div className="hero__left-col">
            <div className="hero__badge fade-in">
              <span className="hero__badge-dot"></span>
              Available for New Projects
            </div>

            <h1 className="hero__title fade-in">
              We Build <br />
              <span className="hero__typed-wrapper">
                <span className="gradient-text hero__typed">{displayText}</span>
                <span className="hero__cursor">|</span>
              </span>
              <br />
              That Drive Results
            </h1>

            <p className="hero__subtitle fade-in">
              Winteg Technologies (wintegtechnologies.com) is a leading web development, software engineering,
              and AI solutions company from India. We build custom websites, web applications, mobile apps,
              AI-powered tools, and provide social media management — all under one roof.
              Whether you search for winteg, winteg technologies, or wintegtechnologies — we are here to serve you.
            </p>

            <div className="hero__actions fade-in">
              {/* This button is only visible on mobile (styled via Hero.css) */}
              <a
                href="#hero-contact"
                className="btn btn-primary btn--lg hero__quote-btn"
                onClick={(e) => {
                  e.preventDefault()
                  const el = document.getElementById('hero-contact')
                  if (el) {
                    const rect = el.getBoundingClientRect()
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
                    const targetY = rect.top + scrollTop - 72 - 16 // 72px navbar height + 16px spacing
                    window.scrollTo({
                      top: targetY,
                      behavior: 'smooth'
                    })
                  }
                }}
              >
                Get a Quote
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="#portfolio"
                className="btn btn-outline btn--lg"
                onClick={(e) => {
                  e.preventDefault()
                  const el = document.getElementById('portfolio')
                  if (el) {
                    const rect = el.getBoundingClientRect()
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
                    const targetY = rect.top + scrollTop - 72
                    window.scrollTo({
                      top: targetY,
                      behavior: 'smooth'
                    })
                  }
                }}
              >
                View Our Works
              </a>
            </div>

            {/* Stats */}
            <div className="hero__stats fade-in">
              <div className="hero__stat">
                <span className="hero__stat-number">50+</span>
                <span className="hero__stat-label">Projects Done</span>
              </div>
              <div className="hero__stat-divider"></div>
              <div className="hero__stat">
                <span className="hero__stat-number">30+</span>
                <span className="hero__stat-label">Happy Clients</span>
              </div>
              <div className="hero__stat-divider"></div>
              <div className="hero__stat">
                <span className="hero__stat-number">3+</span>
                <span className="hero__stat-label">Years Exp</span>
              </div>
              <div className="hero__stat-divider"></div>
              <div className="hero__stat">
                <span className="hero__stat-number">99%</span>
                <span className="hero__stat-label">Satisfaction</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact/Quote Form (with ID for smooth scrolling) */}
          <div className="hero__right-col fade-in-right" id="hero-contact">
            <div className="contact__form-wrapper">
              <form className="contact__form glass-card" onSubmit={handleSubmit}>
                <h3 className="hero__form-title">Get a Free Quote</h3>
                <p className="hero__form-subtitle">Let's discuss your project today.</p>

                {submitted && (
                  <div className="contact__success">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--clr-accent-green)" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                    <span>Message sent! We'll contact you soon.</span>
                  </div>
                )}

                {error && (
                  <div className="contact__error">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                    <span>{error}</span>
                  </div>
                )}

                <div className="contact__form-row">
                  <div className="contact__field">
                    <label htmlFor="hero-name">Full Name</label>
                    <input
                      type="text"
                      id="hero-name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="contact__field">
                    <label htmlFor="hero-email">Email</label>
                    <input
                      type="email"
                      id="hero-email"
                      placeholder="abc@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="contact__form-row">
                  <div className="contact__field">
                    <label htmlFor="hero-phone">Phone (Optional)</label>
                    <input
                      type="tel"
                      id="hero-phone"
                      placeholder="Phone number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="contact__field">
                    <label htmlFor="hero-service">Service Needed</label>
                    <CustomSelect
                      id="hero-service"
                      value={formData.service}
                      onChange={(val) => setFormData({ ...formData, service: val })}
                      placeholder="Select service"
                      required
                      options={[
                        { value: 'web', label: 'Website Development' },
                        { value: 'webapp', label: 'Web Application' },
                        { value: 'software', label: 'Software Development' },
                        { value: 'ai', label: 'AI-Powered Solution' },
                        { value: 'mobile', label: 'Mobile App Development' },
                        { value: 'social', label: 'Social Media Management' },
                        { value: 'other', label: 'Other' },
                      ]}
                    />
                  </div>
                </div>

                <div className="contact__field">
                  <label htmlFor="hero-budget">Budget Range</label>
                  <CustomSelect
                    id="hero-budget"
                    value={formData.budget}
                    onChange={(val) => setFormData({ ...formData, budget: val })}
                    placeholder="Select budget range"
                    options={[
                      { value: '5k-10k', label: '₹5,000 — ₹10,000' },
                      { value: '10k-25k', label: '₹10,000 — ₹25,000' },
                      { value: '25k-50k', label: '₹25,000 — ₹50,000' },
                      { value: '50k-1L', label: '₹50,000 — ₹1,00,000' },
                      { value: '1L+', label: '₹1,00,000+' },
                    ]}
                  />
                </div>

                <div className="contact__field">
                  <label htmlFor="hero-message">Project Details</label>
                  <textarea
                    id="hero-message"
                    rows={3}
                    placeholder="Brief details about your project..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary contact__submit" disabled={loading}>
                  {loading ? 'Sending...' : 'Send Message'}
                  {!loading && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll">
        <div className="hero__scroll-line"></div>
      </div>
    </section>
  )
}