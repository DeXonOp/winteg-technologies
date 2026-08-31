import { useEffect, useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import CustomSelect from '../CustomSelect/CustomSelect'
import CountUp from '../CountUp/CountUp'
import BackgroundVideo from './BackgroundVideo'
import './Hero.css'

const phrases = [
  'Telemetrics & IoT',
  'AI-Powered Solutions',
  'GPS Integration & Tracking',
  'IoT Management Systems',
  'AI Cameras & Computer Vision',
  'ERP & CRM Architectures',
  'Healthcare IT Solutions',
  'Fintech & Payment Systems',
  'Winteg Technologies',
]

const allServices = [
  { value: 'telemetrics', label: 'Telemetrics & IoT Monitoring' },
  { value: 'ai', label: 'AI-Powered Solutions' },
  { value: 'gps', label: 'GPS Integration & Tracking' },
  { value: 'aicamera', label: 'AI Camera & Computer Vision' },
  { value: 'erp', label: 'ERP & CRM Systems' },
  { value: 'healthcare', label: 'Healthcare Management Systems' },
  { value: 'fintech', label: 'Fintech & Payment Solutions' },
  { value: 'software', label: 'Software Development' },
  { value: 'social', label: 'Social Media Management' },
  { value: 'webapp', label: 'Web Applications' },
  { value: 'mobile', label: 'Mobile App Development' },
  { value: 'web', label: 'Website Development' },
  { value: 'other', label: 'Other' },
]

const titleWords = ['We', 'Build', 'The', 'Future']

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
      <BackgroundVideo />
      
      {/* Animated background */}
      <div className="hero__bg">
        <div className="hero__gradient-orb hero__gradient-orb--1"></div>
        <div className="hero__gradient-orb hero__gradient-orb--2"></div>
        <div className="hero__gradient-orb hero__gradient-orb--3"></div>
        <div className="hero__grid"></div>

        {/* Floating geometric shapes */}
        <div className="hero__shape hero__shape--1"></div>
        <div className="hero__shape hero__shape--2"></div>
        <div className="hero__shape hero__shape--3"></div>
      </div>

      <div className="hero__content container">
        <div className="hero__grid-layout">
          {/* Left Column: Headlines, Subtitles, Stats */}
          <motion.div
            className="hero__left-col"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.div
              className="hero__badge"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            >
              <span className="hero__badge-dot"></span>
              Available for New Projects
            </motion.div>

            <h1 className="hero__title">
              {titleWords.map((word, i) => (
                <motion.span
                  key={i}
                  className="hero__title-word"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.12, duration: 0.6, ease: "easeOut" }}
                >
                  {word}{' '}
                </motion.span>
              ))}
              <br />
              <span className="hero__typed-wrapper">
                <span className="gradient-text hero__typed">{displayText}</span>
                <span className="hero__cursor">|</span>
              </span>
            </h1>

            <motion.p
              className="hero__subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              Winteg Technologies (wintegtechnologies.com) is a leading advanced engineering and AI solutions company from India. We architect enterprise-grade telemetrics systems, custom AI agents, GPS tracking infrastructure, computer vision pipelines, and highly scalable cloud solutions.
            </motion.p>

            <motion.div
              className="hero__actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <a
                href="#hero-contact"
                className="btn btn-primary btn--lg hero__quote-btn"
                onClick={(e) => {
                  e.preventDefault()
                  const el = document.getElementById('hero-contact')
                  if (el) {
                    const rect = el.getBoundingClientRect()
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
                    const targetY = rect.top + scrollTop - 72 - 16
                    window.scrollTo({ top: targetY, behavior: 'smooth' })
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
                    window.scrollTo({ top: targetY, behavior: 'smooth' })
                  }
                }}
              >
                Our Process
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="hero__stats"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              {[
                { target: 50, suffix: '+', label: 'Projects Done' },
                { target: 30, suffix: '+', label: 'Happy Clients' },
                { target: 3, suffix: '+', label: 'Years Exp' },
                { target: 99, suffix: '%', label: 'Satisfaction' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="hero__stat"
                  whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                >
                  <CountUp target={stat.target} suffix={stat.suffix} className="hero__stat-number" />
                  <span className="hero__stat-label">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column: Contact/Quote Form */}
          <motion.div
            className="hero__right-col"
            id="hero-contact"
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, type: 'spring', stiffness: 80 }}
          >
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
                      options={allServices}
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
                      { value: '20k-50k', label: '₹20,000 — ₹50,000' },
                      { value: '50k-1.5L', label: '₹50,000 — ₹1,50,000 (1.5 Lakhs)' },
                      { value: '1.5L-3L', label: '₹1,50,000 — ₹3,00,000 (3 Lakhs)' },
                      { value: '3L-7L', label: '₹3,00,000 — ₹7,00,000 (7 Lakhs)' },
                      { value: '7L-10L', label: '₹7,00,000 — ₹10,00,000 (10 Lakhs)' },
                      { value: '10L+', label: '₹10,00,000+ (Above 10 Lakhs)' },
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
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <div className="hero__scroll-line"></div>
      </motion.div>
    </section>
  )
}