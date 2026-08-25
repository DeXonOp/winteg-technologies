import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './CostEstimator.css'

const projectTypes = [
  { id: 'website', label: 'Website', icon: '🌐', base: 8000 },
  { id: 'webapp', label: 'Web App', icon: '💻', base: 25000 },
  { id: 'mobile', label: 'Mobile App', icon: '📱', base: 30000 },
  { id: 'software', label: 'Desktop Software', icon: '🖥️', base: 35000 },
  { id: 'ai', label: 'AI Solution', icon: '🤖', base: 40000 },
  { id: 'ecommerce', label: 'E-Commerce', icon: '🛒', base: 20000 },
  { id: 'erp', label: 'ERP / CRM', icon: '🏢', base: 50000 },
  { id: 'iot', label: 'IoT / Telemetrics', icon: '📡', base: 45000 },
]

const featureOptions = [
  { id: 'auth', label: 'User Authentication', cost: 3000 },
  { id: 'payment', label: 'Payment Integration', cost: 5000 },
  { id: 'admin', label: 'Admin Dashboard', cost: 8000 },
  { id: 'api', label: 'API Integration', cost: 4000 },
  { id: 'realtime', label: 'Real-time Features', cost: 6000 },
  { id: 'analytics', label: 'Analytics & Reports', cost: 5000 },
  { id: 'notifications', label: 'Push Notifications', cost: 3000 },
  { id: 'multilang', label: 'Multi-language', cost: 4000 },
  { id: 'seo', label: 'Advanced SEO', cost: 3000 },
  { id: 'chat', label: 'Chat / Messaging', cost: 5000 },
]

const timelines = [
  { id: 'rush', label: '2-4 Weeks', multiplier: 1.5, tag: 'Rush' },
  { id: 'normal', label: '1-2 Months', multiplier: 1.0, tag: 'Standard' },
  { id: 'relaxed', label: '3-4 Months', multiplier: 0.85, tag: 'Best Value' },
  { id: 'flexible', label: '5+ Months', multiplier: 0.75, tag: 'Most Affordable' },
]

const slideVariants = {
  enter: { x: 80, opacity: 0 },
  center: { x: 0, opacity: 1, transition: { duration: 0.3 } },
  exit: { x: -80, opacity: 0, transition: { duration: 0.2 } },
}

export default function CostEstimator() {
  const [step, setStep] = useState(0)
  const [projectType, setProjectType] = useState<string | null>(null)
  const [features, setFeatures] = useState<Set<string>>(new Set())
  const [timeline, setTimeline] = useState<string | null>(null)

  const toggleFeature = (id: string) => {
    setFeatures((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const calculateEstimate = () => {
    const type = projectTypes.find((p) => p.id === projectType)
    if (!type) return { low: 0, high: 0 }

    let base = type.base
    featureOptions.forEach((f) => {
      if (features.has(f.id)) base += f.cost
    })

    const tl = timelines.find((t) => t.id === timeline)
    const multiplier = tl?.multiplier || 1

    const total = Math.round(base * multiplier)
    return { low: Math.round(total * 0.8), high: Math.round(total * 1.2) }
  }

  const canProceed = () => {
    if (step === 0) return !!projectType
    if (step === 1) return true // Features are optional
    if (step === 2) return !!timeline
    return true
  }

  const steps = ['Project Type', 'Features', 'Timeline', 'Estimate']

  return (
    <section className="estimator section" id="estimator">
      <div className="container">
        <motion.div
          className="estimator__header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Cost Calculator</span>
          <h2 className="section-title">
            Estimate Your <span className="gradient-text">Project Cost</span>
          </h2>
          <p className="section-subtitle">
            Configure your dream project and get an instant estimate. No other agency offers this!
          </p>
        </motion.div>

        <motion.div
          className="estimator__wizard glass-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
        >
          {/* Progress Steps */}
          <div className="estimator__progress">
            {steps.map((s, i) => (
              <div
                key={i}
                className={`estimator__step ${i <= step ? 'estimator__step--active' : ''} ${i < step ? 'estimator__step--done' : ''}`}
              >
                <div className="estimator__step-circle">
                  {i < step ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                  ) : (
                    i + 1
                  )}
                </div>
                <span className="estimator__step-label">{s}</span>
                {i < steps.length - 1 && <div className="estimator__step-line"></div>}
              </div>
            ))}
          </div>

          {/* Step Content */}
          <div className="estimator__content">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div key="step0" variants={slideVariants} initial="enter" animate="center" exit="exit" className="estimator__step-content">
                  <h3 className="estimator__question">What type of project do you need?</h3>
                  <div className="estimator__options-grid">
                    {projectTypes.map((p) => (
                      <button
                        key={p.id}
                        className={`estimator__option ${projectType === p.id ? 'estimator__option--selected' : ''}`}
                        onClick={() => setProjectType(p.id)}
                      >
                        <span className="estimator__option-icon">{p.icon}</span>
                        <span className="estimator__option-label">{p.label}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div key="step1" variants={slideVariants} initial="enter" animate="center" exit="exit" className="estimator__step-content">
                  <h3 className="estimator__question">Select the features you need</h3>
                  <div className="estimator__features-grid">
                    {featureOptions.map((f) => (
                      <button
                        key={f.id}
                        className={`estimator__feature ${features.has(f.id) ? 'estimator__feature--selected' : ''}`}
                        onClick={() => toggleFeature(f.id)}
                      >
                        <div className="estimator__feature-check">
                          {features.has(f.id) && (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                          )}
                        </div>
                        <span>{f.label}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step2" variants={slideVariants} initial="enter" animate="center" exit="exit" className="estimator__step-content">
                  <h3 className="estimator__question">What's your preferred timeline?</h3>
                  <div className="estimator__timeline-options">
                    {timelines.map((t) => (
                      <button
                        key={t.id}
                        className={`estimator__timeline ${timeline === t.id ? 'estimator__timeline--selected' : ''}`}
                        onClick={() => setTimeline(t.id)}
                      >
                        <span className="estimator__timeline-label">{t.label}</span>
                        <span className="estimator__timeline-tag">{t.tag}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="step3" variants={slideVariants} initial="enter" animate="center" exit="exit" className="estimator__step-content estimator__result">
                  <h3 className="estimator__question">Your Estimated Cost</h3>
                  <div className="estimator__price">
                    <span className="estimator__price-currency">₹</span>
                    <motion.span
                      className="estimator__price-value"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                    >
                      {calculateEstimate().low.toLocaleString('en-IN')} — {calculateEstimate().high.toLocaleString('en-IN')}
                    </motion.span>
                  </div>
                  <p className="estimator__disclaimer">
                    This is an approximate estimate. Contact us for an exact quote tailored to your needs.
                  </p>
                  <a
                    href="#contact"
                    className="btn btn-primary btn--lg"
                    onClick={(e) => {
                      e.preventDefault()
                      const el = document.getElementById('contact')
                      if (el) {
                        const rect = el.getBoundingClientRect()
                        const scrollTop = window.pageYOffset || document.documentElement.scrollTop
                        window.scrollTo({ top: rect.top + scrollTop - 72, behavior: 'smooth' })
                      }
                    }}
                  >
                    Get Exact Quote
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="estimator__nav">
            {step > 0 && (
              <button className="btn btn-outline" onClick={() => setStep(step - 1)}>
                Back
              </button>
            )}
            {step < 3 && (
              <button
                className="btn btn-primary"
                disabled={!canProceed()}
                onClick={() => setStep(step + 1)}
              >
                {step === 2 ? 'Get Estimate' : 'Next'}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
            )}
            {step === 3 && (
              <button className="btn btn-outline" onClick={() => { setStep(0); setProjectType(null); setFeatures(new Set()); setTimeline(null) }}>
                Start Over
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
