import { useState, type FormEvent } from 'react'
import CustomSelect from '../CustomSelect/CustomSelect'
import './Contact.css'

import { motion } from 'framer-motion'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    countryCode: '+91',
    phone: '',
    website: '',
    project_type: '',
    technologies: [] as string[],
    service: '',
    timeline: '',
    budget: '',
    referral: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSubmitted(false)
    try {
      const apiUrl = import.meta.env.PROD
        ? 'https://api.wintegtechnologies.com/api/contact'
        : '/api/contact'

      const dataToSend = {
        ...formData,
        phone: formData.phone ? `${formData.countryCode} ${formData.phone}`.trim() : ''
      }

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
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
      setFormData({ name: '', email: '', company: '', countryCode: '+91', phone: '', website: '', project_type: '', technologies: [], service: '', timeline: '', budget: '', referral: '', message: '' })
      setTimeout(() => setSubmitted(false), 5000)
    } catch (err: any) {
      console.error('Error submitting contact form:', err)
      setError(err.message || 'An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="contact section" id="quotation">
      {/* Background glow */}
      <div className="contact__glow"></div>

      <div className="container">
        <div className="contact__header" style={{ textAlign: 'center', marginBottom: 'var(--space-4xl)' }}>
          <span className="section-label">Get Quotation</span>
          <h2 className="section-title">
            Let's Estimate Your <span className="gradient-text">Project</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto', maxWidth: '600px' }}>
            Have a project in mind? We'd love to hear about it. Fill out the form
            and our team will get back to you with a comprehensive estimate.
          </p>
        </div>

        <motion.div 
          className="contact__form-wrapper"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ maxWidth: '1000px', margin: '0 auto' }}
        >
          <form className="contact__form glass-card" onSubmit={handleSubmit}>
              {submitted && (
                <div className="contact__success">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--clr-accent-green)" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                  <span>Message sent successfully! We'll get back to you soon.</span>
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
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="contact__field">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="abc@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="contact__form-row">
                <div className="contact__field">
                  <label htmlFor="company">Company Name (Optional)</label>
                  <input
                    type="text"
                    id="company"
                    placeholder="Company or Organization"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>
                <div className="contact__field">
                  <label htmlFor="website">Website URL (Optional)</label>
                  <input
                    type="url"
                    id="website"
                    placeholder="https://example.com"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  />
                </div>
              </div>

              <div className="contact__field contact__field--full">
                <label>Project Type</label>
                <div className="contact__radio-group">
                  {['New Project build from scratch', 'Redesign/Upgrade existing system', 'Ongoing Support & Maintenance'].map((type) => (
                    <label key={type} className="contact__radio">
                      <input 
                        type="radio" 
                        name="project_type"
                        value={type}
                        checked={formData.project_type === type}
                        onChange={(e) => setFormData({ ...formData, project_type: e.target.value })}
                      />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="contact__field contact__field--full">
                <label>Technologies of Interest</label>
                <div className="contact__checkbox-group">
                  {['AI / Machine Learning', 'Web Development', 'Mobile Apps (iOS/Android)', 'IoT & Telemetrics', 'Cloud Infrastructure', 'Custom Software'].map((tech) => (
                    <label key={tech} className="contact__checkbox">
                      <input 
                        type="checkbox" 
                        value={tech}
                        checked={formData.technologies.includes(tech)}
                        onChange={(e) => {
                          const newTechs = e.target.checked 
                            ? [...formData.technologies, tech] 
                            : formData.technologies.filter(t => t !== tech);
                          setFormData({ ...formData, technologies: newTechs });
                        }}
                      />
                      <span>{tech}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="contact__form-row">
                <div className="contact__field">
                  <label htmlFor="service">Service Needed</label>
                  <CustomSelect
                    id="service"
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
                      { value: 'gps', label: 'GPS Integration & Tracking' },
                      { value: 'telemetrics', label: 'Telemetrics & IoT' },
                      { value: 'aicamera', label: 'AI Camera & Vision' },
                      { value: 'erp', label: 'ERP & CRM Systems' },
                      { value: 'healthcare', label: 'Healthcare Systems' },
                      { value: 'fintech', label: 'Fintech & Payments' },
                      { value: 'other', label: 'Other' },
                    ]}
                  />
                </div>
                <div className="contact__field">
                  <label htmlFor="timeline">Timeline</label>
                  <CustomSelect
                    id="timeline"
                    value={formData.timeline}
                    onChange={(val) => setFormData({ ...formData, timeline: val })}
                    placeholder="Expected timeline"
                    required
                    options={[
                      { value: '1-2 months', label: '1 - 2 Months' },
                      { value: '3-6 months', label: '3 - 6 Months' },
                      { value: '6+ months', label: '6+ Months' },
                    ]}
                  />
                </div>
              </div>

              <div className="contact__form-row">
                <div className="contact__field">
                  <label htmlFor="budget">Budget Range</label>
                  <CustomSelect
                    id="budget"
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
                  <label htmlFor="phone">Phone (Optional)</label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <select
                      value={formData.countryCode}
                      onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                      style={{ width: '90px', padding: '0.75rem 0.5rem', backgroundImage: 'none' }}
                      aria-label="Country Code"
                    >
                      <option value="+91">+91</option>
                      <option value="+1">+1</option>
                      <option value="+44">+44</option>
                      <option value="+61">+61</option>
                      <option value="+81">+81</option>
                      <option value="+971">+971</option>
                    </select>
                    <input
                      type="tel"
                      id="phone"
                      placeholder="phone number"
                      style={{ flex: 1 }}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="contact__field contact__field--full">
                <label htmlFor="referral">How did you hear about us?</label>
                <CustomSelect
                  id="referral"
                  value={formData.referral}
                  onChange={(val) => setFormData({ ...formData, referral: val })}
                  placeholder="Select option"
                  options={[
                    { value: 'Google Search', label: 'Google Search' },
                    { value: 'LinkedIn', label: 'LinkedIn' },
                    { value: 'Referral', label: 'Friend or Colleague' },
                    { value: 'Social Media', label: 'Social Media' },
                    { value: 'Other', label: 'Other' },
                  ]}
                />
              </div>

              <div className="contact__field">
                <label htmlFor="message">Project Details</label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Tell us about your project, goals, and timeline..."
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
          </motion.div>
      </div>
    </section>
  )
}