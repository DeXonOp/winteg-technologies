import { useEffect, useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Services from './components/Services/Services'
import Portfolio from './components/Portfolio/Portfolio'
import WhyChooseUs from './components/WhyChooseUs/WhyChooseUs'
import Testimonials from './components/Testimonials/Testimonials'
import TechStack from './components/TechStack/TechStack'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import Chatbot from './components/Chatbot/Chatbot'
import AdminChat from './components/AdminChat/AdminChat'
import PrivacyPolicy from './components/Legal/PrivacyPolicy'
import TermsOfService from './components/Legal/TermsOfService'
import './App.css'

function App() {
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | null>(null);

  useEffect(() => {
    if (legalModal) {
      // Robust scroll lock for all devices including iOS
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
  }, [legalModal]);

  useEffect(() => {
    // Only run observers if not on admin chat
    if (window.location.pathname.startsWith('/admin/chat')) return;

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    const elements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  if (window.location.pathname.startsWith('/admin/chat')) {
    return <AdminChat />
  }

  return (
    <div className="app">
      {/* Skip-to-content link for accessibility — positive SEO signal */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <WhyChooseUs />
        <Testimonials />
        <TechStack />
        <Contact />
      </main>
      <Footer onOpenLegal={setLegalModal} />
      <Chatbot />
      {legalModal === 'privacy' && <PrivacyPolicy onClose={() => setLegalModal(null)} />}
      {legalModal === 'terms' && <TermsOfService onClose={() => setLegalModal(null)} />}
    </div>
  )
}

export default App
