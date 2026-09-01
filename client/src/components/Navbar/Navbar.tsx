import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { 
  Home, 
  Info, 
  Cpu, 
  Briefcase, 
  ShieldCheck, 
  Star, 
  Code2, 
  Calculator, 
  X, 
  Mail, 
  ArrowRight 
} from 'lucide-react'
import './Navbar.css'

const navLinks = [
  { label: 'Home', href: '#home', icon: Home },
  { label: 'About', href: '#about', icon: Info },
  { label: 'Services', href: '#services', icon: Cpu },
  { label: 'Process', href: '#portfolio', icon: Briefcase },
  { label: 'Benefits', href: '#whychooseus', icon: ShieldCheck },
  { label: 'Testimonials', href: '#testimonials', icon: Star },
  { label: 'Technologies', href: '#tech-stack', icon: Code2 },
  { label: 'Quotation', href: '#quotation', icon: Calculator },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState(window.location.pathname === '/' ? 'home' : '')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)

      if (window.location.pathname !== '/') return;

      // Update active section
      const sections = navLinks.map(l => l.href.replace('#', ''))

      // If we've scrolled to the bottom of the page, activate the last section
      const isBottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight
      if (isBottom) {
        setActiveSection(sections[sections.length - 1])
        return
      }

      // Check which section is in view
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.3) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    // Call once to set initial state correctly on load
    onScroll()

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    const prev = document.body.style.overflow
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      if (mobileOpen) {
        document.body.style.overflow = prev || ''
      }
    }
  }, [mobileOpen])

  const handleNavClick = (href: string) => {
    setMobileOpen(false)

    if (window.location.pathname !== '/') {
      window.location.href = `/${href}`
      return
    }

    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) {
      const rect = el.getBoundingClientRect()
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const offset = (id === 'contact' || id === 'hero-contact') ? 72 + 16 : 72
      const targetY = rect.top + scrollTop - offset
      window.scrollTo({
        top: targetY,
        behavior: 'smooth'
      })
    }
  }

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} id="navbar">
        <div className="navbar__inner container">
          {/* Logo */}
          <div className="navbar__logo">
            <div className="navbar__logo-icon">
              <img src="/favicon.svg" alt="Winteg Technologies Logo" width="40" height="40" loading="eager" fetchPriority="high" style={{ objectFit: 'contain' }} />
            </div>
            <span className="navbar__logo-text">
              Winteg<span className="navbar__logo-accent">Technologies</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <ul className="navbar__links">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`navbar__link ${activeSection === link.href.replace('#', '') ? 'navbar__link--active' : ''}`}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a
            href="#contact"
            className="btn btn-primary navbar__cta"
            onClick={(e) => { e.preventDefault(); handleNavClick('#contact') }}
          >
            Contact Us
          </a>

          {/* Mobile Toggle */}
          <button
            className={`navbar__toggle ${mobileOpen ? 'navbar__toggle--open' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Portal */}
      {mobileOpen && createPortal(
        <div className="navbar__mobile-backdrop" onClick={() => setMobileOpen(false)}>
          <div className="navbar__mobile-drawer" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="navbar__mobile-header">
              <div className="navbar__logo">
                <div className="navbar__logo-icon">
                  <img src="/favicon.svg" alt="Winteg Technologies Logo" width="34" height="34" style={{ objectFit: 'contain' }} />
                </div>
                <span className="navbar__logo-text" style={{ fontSize: '1.15rem' }}>
                  Winteg<span className="navbar__logo-accent">Technologies</span>
                </span>
              </div>
              <button 
                className="navbar__mobile-close"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Nav Links */}
            <div className="navbar__mobile-body">
              <ul className="navbar__mobile-links">
                {navLinks.map((link, i) => {
                  const IconComponent = link.icon
                  const isActive = activeSection === link.href.replace('#', '')
                  return (
                    <li key={link.href} style={{ animationDelay: `${i * 45}ms` }}>
                      <a
                        href={link.href}
                        className={`navbar__mobile-link ${isActive ? 'navbar__mobile-link--active' : ''}`}
                        onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                      >
                        <span className="navbar__mobile-link-icon">
                          <IconComponent size={20} />
                        </span>
                        <span className="navbar__mobile-link-text">{link.label}</span>
                        {isActive && <span className="navbar__mobile-active-dot" />}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* Bottom Actions */}
            <div className="navbar__mobile-footer">
              <a
                href="#contact"
                className="navbar__mobile-cta-btn"
                onClick={(e) => { e.preventDefault(); handleNavClick('#contact') }}
              >
                <span>Contact Us</span>
                <ArrowRight size={18} />
              </a>

              <div className="navbar__mobile-quick-contact">
                <a href="mailto:contact@wintegtechnologies.com">
                  <Mail size={14} /> contact@wintegtechnologies.com
                </a>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}