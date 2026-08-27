import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './CostEstimator.css'

const projectTypes = [
  { id: 'website', label: 'Website', icon: '🌐' },
  { id: 'webapp', label: 'Web App', icon: '💻' },
  { id: 'mobile', label: 'Mobile App', icon: '📱' },
  { id: 'software', label: 'Desktop Software', icon: '🖥️' },
  { id: 'ai', label: 'AI Solution', icon: '🤖' },
  { id: 'ecommerce', label: 'E-Commerce', icon: '🛒' },
  { id: 'erp', label: 'ERP / CRM', icon: '🏢' },
  { id: 'iot', label: 'IoT / Telemetrics', icon: '📡' },
]

const featureOptions = [
  { id: 'auth', label: 'User Authentication' },
  { id: 'payment', label: 'Payment Integration' },
  { id: 'admin', label: 'Admin Dashboard' },
  { id: 'api', label: 'API Integration' },
  { id: 'realtime', label: 'Real-time Features' },
  { id: 'analytics', label: 'Analytics & Reports' },
  { id: 'notifications', label: 'Push Notifications' },
  { id: 'multilang', label: 'Multi-language' },
  { id: 'seo', label: 'Advanced SEO' },
  { id: 'chat', label: 'Chat / Messaging' },
]

const timelines = [
  { id: 'rush', label: '2-4 Weeks', tag: 'Rush' },
  { id: 'normal', label: '1-2 Months', tag: 'Standard' },
  { id: 'relaxed', label: '3-4 Months', tag: 'Best Value' },
  { id: 'flexible', label: '5+ Months', tag: 'Most Affordable' },
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

  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const toggleFeature = (id: string) => {
    setFeatures((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const handleSubmit = () => {
    // In a real app, send data to the backend here
    setIsSubmitted(true)
  }

  const canProceed = () => {
    if (step === 0) return !!projectType
    if (step === 1) return true // Features are optional
    if (step === 2) return !!timeline
    if (step === 3) return email.length > 5 && email.includes('@')
    return true
  }

  const steps = ['Project Type', 'Features', 'Timeline', 'Submit']

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
          <span className="section-label">Start a Project</span>
          <h2 className="section-title">
            Build Your <span className="gradient-text">Dream Project</span>
          </h2>
          <p className="section-subtitle">
            Tell us about your requirements and our team will get back to you with a detailed proposal.
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

              {step === 3 && !isSubmitted && (
                <motion.div key="step3" variants={slideVariants} initial="enter" animate="center" exit="exit" className="estimator__step-content estimator__result">
                  <h3 className="estimator__question">Where should we send the proposal?</h3>
                  <div className="estimator__contact-form" style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
                    <input 
                      type="email" 
                      placeholder="Enter your email address" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{
                        padding: '12px 20px',
                        width: '100%',
                        maxWidth: '400px',
                        borderRadius: '8px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: 'white',
                        fontSize: '1rem',
                        outline: 'none'
                      }}
                    />
                    <p className="estimator__disclaimer">
                      We'll review your selections and send a comprehensive project proposal to this email.
                    </p>
                  </div>
                </motion.div>
              )}

              {step === 3 && isSubmitted && (
                <motion.div key="step3-success" variants={slideVariants} initial="enter" animate="center" exit="exit" className="estimator__step-content estimator__result">
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981' }}>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                    </div>
                  </div>
                  <h3 className="estimator__question">Request Received!</h3>
                  <p className="estimator__disclaimer" style={{ fontSize: '1.1rem', marginTop: '1rem' }}>
                    Thank you! We've received your project details and will be in touch shortly at <strong>{email}</strong>.
                  </p>
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
                {step === 2 ? 'Review & Submit' : 'Next'}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
            )}
            {step === 3 && !isSubmitted && (
              <button
                className="btn btn-primary"
                disabled={!canProceed()}
                onClick={handleSubmit}
              >
                Submit Request
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
              </button>
            )}
            {step === 3 && isSubmitted && (
              <button className="btn btn-outline" onClick={() => { setStep(0); setProjectType(null); setFeatures(new Set()); setTimeline(null); setIsSubmitted(false); setEmail(''); }}>
                Start Over
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
