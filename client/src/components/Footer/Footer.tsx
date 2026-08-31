import { useState, type FormEvent } from 'react'
import './Footer.css'

const quickLinks = [
  { label: 'Winteg Technologies Home', href: '#home' },
  { label: 'About Winteg Technologies', href: '#about' },
  { label: 'Winteg Services', href: '#services' },
  { label: 'Winteg Process', href: '#portfolio' },
  { label: 'Contact Winteg Technologies', href: '#contact' },
]

const serviceLinks = [
  'Website Development',
  'Web Applications',
  'Software Development',
  'AI Solutions',
  'Mobile Apps',
  'Social Media',
  'GPS & Tracking',
  'Telemetrics & IoT',
  'AI Camera & Vision',
  'ERP & CRM',
  'Healthcare Systems',
  'Fintech & Payments',
]

interface FooterProps {
  onOpenLegal?: (type: 'privacy' | 'terms') => void;
}

export default function Footer({ onOpenLegal }: FooterProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubscribe = async (e: FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    setMessage('')

    try {
      const apiUrl = import.meta.env.PROD
        ? 'https://api.wintegtechnologies.com/api/newsletter'
        : '/api/newsletter'

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const result = await response.json()

      if (!response.ok) {
        let errorMessage = 'Subscription failed. Please try again.'
        if (result.detail) {
          if (Array.isArray(result.detail)) {
            errorMessage = result.detail
              .map((err: any) => {
                const field = err.loc && err.loc.length > 1 ? err.loc[1] : ''
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

      setStatus('success')
      setMessage(result.message || 'Successfully subscribed!')
      setEmail('')
      setTimeout(() => {
        setStatus('idle')
        setMessage('')
      }, 5000)
    } catch (err: any) {
      console.error('Newsletter error:', err)
      setStatus('error')
      setMessage(err.message || 'Something went wrong. Please try again.')
    }
  }

  return (
    <footer className="footer" id="footer">
      {/* Top Divider with gradient */}
      <div className="footer__divider"></div>

      <div className="container">
        <div className="footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <div className="footer__logo">
              <img src="/favicon.svg" alt="Winteg Technologies Logo" width="32" height="32" loading="lazy" style={{ objectFit: 'contain' }} />
              <span className="footer__logo-text">
                Winteg<span className="gradient-text">Tech</span>
              </span>
            </div>
            <p className="footer__tagline">
              Winteg Technologies (wintegtechnologies.com) — transforming ideas into powerful digital solutions.
              Web development, software engineering, AI solutions, mobile apps & social media — all under one roof.
              Search for winteg, winteg technologies, or wintegtechnologies and find your tech partner.
            </p>
            <div className="footer__socials">
              <a href="https://www.linkedin.com/company/wintegtechnologies/" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </a>
              <a href="https://www.facebook.com/share/1BYUc8LesP/" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
              </a>
              <a href="https://www.fiverr.com/s/wkRk1ww" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Fiverr">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.004 15.588a.995.995 0 1 0 .002-1.99.995.995 0 0 0-.002 1.99zm-.996-3.705h-.85c-.546 0-.84.41-.84 1.092v2.466h-1.61v-3.558h-.684c-.547 0-.84.41-.84 1.092v2.466h-1.61v-4.874h1.61v.74c.264-.574.626-.74 1.163-.74h1.972v.74c.264-.574.625-.74 1.162-.74h.527v1.316zm-6.786 1.501h-3.359c.088.546.43.858 1.006.858.43 0 .732-.175.83-.487l1.425.4c-.351.848-1.22 1.364-2.255 1.364-1.748 0-2.549-1.355-2.549-2.515 0-1.14.703-2.505 2.45-2.505 1.856 0 2.471 1.384 2.471 2.408 0 .224-.01.37-.02.477zm-1.562-.945c-.04-.42-.342-.81-.889-.81-.508 0-.81.225-.908.81h1.797zM7.508 15.44h1.416l1.767-4.874h-1.62l-.86 2.837-.878-2.837H5.72l1.787 4.874zm-6.6 0H2.51v-3.558h1.524v3.558h1.591v-4.874H2.51v-.302c0-.332.235-.536.606-.536h.918V8.412H2.85c-1.162 0-1.943.712-1.943 1.755v.4H0v1.316h.908v3.558z" /></svg>
              </a>
              <a href="https://www.instagram.com/wintegtechnologies/" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" /></svg>
              </a>
              <a href="https://www.upwork.com/freelancers/~01d17b4059d10bc6dd" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Upwork">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z" /></svg>
              </a>
              <a href="https://wa.me/918100474669" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="WhatsApp">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer__col">
            <h4 className="footer__col-title">Quick Links</h4>
            <ul className="footer__links">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="footer__link">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer__col">
            <h4 className="footer__col-title">Services</h4>
            <ul className="footer__links">
              {serviceLinks.map((s) => (
                <li key={s}>
                  <a href="#services" className="footer__link">{s}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer__col">
            <h4 className="footer__col-title">Stay Updated</h4>
            <p className="footer__newsletter-text">
              Subscribe for the latest tech insights and company updates.
            </p>
            <form className="footer__newsletter" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={status === 'loading'}
              />
              <button type="submit" className="btn btn-primary" disabled={status === 'loading'}>
                {status === 'loading' ? '...' : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                )}
              </button>
            </form>
            {message && (
              <p className={`footer__newsletter-status ${status === 'success' ? 'footer__newsletter-status--success' : 'footer__newsletter-status--error'}`}>
                {message}
              </p>
            )}
          </div>
        </div>

        {/* Bottom */}
        <div className="footer__bottom">
          <p className="footer__copyright">
            © {new Date().getFullYear()} Winteg Technologies (wintegtechnologies.com). All rights reserved.
          </p>
          <div className="footer__bottom-links">
            <a href="https://wintegtechnologies.com/">Winteg Technologies</a>
            <a href="#privacy" onClick={(e) => { e.preventDefault(); if (onOpenLegal) onOpenLegal('privacy'); }}>Privacy Policy</a>
            <a href="#terms" onClick={(e) => { e.preventDefault(); if (onOpenLegal) onOpenLegal('terms'); }}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}