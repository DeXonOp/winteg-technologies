import { useEffect, useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Services from './components/Services/Services'
import CostEstimator from './components/CostEstimator/CostEstimator'
import About from './components/About/About'
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
import ScrollProgress from './components/ScrollProgress/ScrollProgress'
import ParticleBackground from './components/ParticleBackground/ParticleBackground'
import CursorGlow from './components/CursorGlow/CursorGlow'
import LiveVisitors from './components/LiveVisitors/LiveVisitors'
import ActionDock from './components/ActionDock/ActionDock'
import './App.css'

function App() {
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | null>(null);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    if (legalModal) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
  }, [legalModal]);

  useEffect(() => {
    if (window.location.pathname.startsWith('/admin/chat')) return;

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
      {/* Skip-to-content link for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Ambient effects */}
      <ParticleBackground />
      <CursorGlow />
      <ScrollProgress />

      {/* Live visitor count badge */}
      <LiveVisitors />

      <Navbar />
      <main id="main-content">
        <Hero />
        <div className="section-divider"></div>
        <About />
        <div className="section-divider"></div>
        <Services />
        <div className="section-divider"></div>
        <CostEstimator />
        <div className="section-divider"></div>
        <Portfolio />
        <div className="section-divider"></div>
        <WhyChooseUs />
        <div className="section-divider"></div>
        <Testimonials />
        <div className="section-divider"></div>
        <TechStack />
        <div className="section-divider"></div>
        <Contact />
      </main>
      <Footer onOpenLegal={setLegalModal} />

      {/* AI Chatbot — controlled by ActionDock */}
      <Chatbot isOpen={chatOpen} onToggle={setChatOpen} />

      {/* macOS-style floating action dock */}
      <ActionDock onOpenChat={() => setChatOpen((prev) => !prev)} />

      {legalModal === 'privacy' && <PrivacyPolicy onClose={() => setLegalModal(null)} />}
      {legalModal === 'terms' && <TermsOfService onClose={() => setLegalModal(null)} />}
    </div>
  )
}

export default App
