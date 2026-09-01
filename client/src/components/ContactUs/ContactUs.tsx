import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import NotificationBanner from '../NotificationBanner/NotificationBanner'
import './ContactUs.css'

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const apiUrl = import.meta.env.PROD
        ? 'https://api.wintegtechnologies.com/api/contact'
        : '/api/contact'

      // Send minimum required fields for the backend (it expects service, timeline, etc from the Quotation form)
      const dataToSend = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        service: 'other',
        timeline: '1-2 months',
        technologies: [],
        phone: ''
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
          }
        }
        throw new Error(errorMessage)
      }

      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => setStatus('idle'), 5000)
    } catch (err: any) {
      console.error(err)
      setErrorMsg(err.message || 'Something went wrong')
      setStatus('error')
    }
  }

  return (
    <section className="contact-us section" id="contact">
      <NotificationBanner
        isVisible={status === 'success'}
        title="Message Sent Successfully!"
        message="Thank you for contacting Winteg Technologies! Our team has received your message and will respond shortly."
        onClose={() => setStatus('idle')}
      />
      <div className="container">
        <div className="contact__grid">
          {/* Left — Info */}
          <motion.div 
            className="contact__info"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="section-label">Contact Us</span>
            <h2 className="section-title">
              Let's <span className="gradient-text">Talk</span>
            </h2>
            <p className="contact__desc">
              Have a general inquiry or just want to say hi? Send us a quick message and we'll get back to you shortly.
            </p>

            <div className="contact__details">
              <div className="contact__detail-item">
                <div className="contact__detail-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                </div>
                <div>
                  <span className="contact__detail-label">Email</span>
                  <a href="mailto:contact@wintegtechnologies.com" className="contact__detail-value">contact@wintegtechnologies.com</a>
                </div>
              </div>

              <div className="contact__detail-item">
                <div className="contact__detail-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                </div>
                <div>
                  <span className="contact__detail-label">Location</span>
                  <span className="contact__detail-value">India — Serving Worldwide</span>
                </div>
              </div>
            </div>


          </motion.div>

          {/* Right — Form */}
          <motion.div 
            className="contact-us__form-wrapper"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <form className="contact-us__form glass-card" onSubmit={handleSubmit}>
            <div className="contact-us__row">
              <div className="contact-us__field">
                <label htmlFor="cu-name">Name</label>
                <input 
                  type="text" 
                  id="cu-name" 
                  required 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  placeholder="Your Name" 
                />
              </div>
              <div className="contact-us__field">
                <label htmlFor="cu-email">Email</label>
                <input 
                  type="email" 
                  id="cu-email" 
                  required 
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  placeholder="you@example.com" 
                />
              </div>
            </div>
            <div className="contact-us__field">
              <label htmlFor="cu-message">Message</label>
              <textarea 
                id="cu-message" 
                required 
                rows={4} 
                value={formData.message}
                onChange={e => setFormData({...formData, message: e.target.value})}
                placeholder="How can we help you?"
              ></textarea>
            </div>
            
            {status === 'success' && <div className="contact-us__success">Message sent successfully! We'll be in touch soon.</div>}
            {status === 'error' && <div className="contact-us__error">{errorMsg}</div>}

            <button type="submit" className="btn btn-primary contact-us__submit" disabled={status === 'loading'}>
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
