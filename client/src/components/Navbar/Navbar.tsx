import { useEffect, useState } from 'react'
import './Navbar.css'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Benefits', href: '#whychooseus' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Technologies', href: '#tech-stack' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 150)

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

    window.addEventListener('scroll', onScroll)
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
          href="#hero-contact"
          className="btn btn-primary navbar__cta"
          onClick={(e) => { e.preventDefault(); handleNavClick('#hero-contact') }}
        >
          Get a Quote
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

      {/* Mobile Menu */}
      <div className={`navbar__mobile ${mobileOpen ? 'navbar__mobile--open' : ''}`}>
        <ul className="navbar__mobile-links">
          {navLinks.map((link, i) => (
            <li key={link.href} style={{ transitionDelay: `${i * 50}ms` }}>
              <a
                href={link.href}
                className={activeSection === link.href.replace('#', '') ? 'navbar__link--active' : ''}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li style={{ transitionDelay: `${navLinks.length * 50}ms` }}>
            <a
              href="#hero-contact"
              className="btn btn-primary"
              onClick={(e) => { e.preventDefault(); handleNavClick('#hero-contact') }}
            >
              Get a Quote
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}