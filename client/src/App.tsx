import { useEffect, useState, lazy, Suspense } from 'react'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Footer from './components/Footer/Footer'
import ParticleBackground from './components/ParticleBackground/ParticleBackground'
import CursorGlow from './components/CursorGlow/CursorGlow'
import LiveVisitors from './components/LiveVisitors/LiveVisitors'
import ActionDock from './components/ActionDock/ActionDock'
import './App.css'

// Lazy loaded below-the-fold components for elite initial load performance
const Services = lazy(() => import('./components/Services/Services'))
const CostEstimator = lazy(() => import('./components/CostEstimator/CostEstimator'))
const Portfolio = lazy(() => import('./components/Portfolio/Portfolio'))
const WhyChooseUs = lazy(() => import('./components/WhyChooseUs/WhyChooseUs'))
const Testimonials = lazy(() => import('./components/Testimonials/Testimonials'))
const TechStack = lazy(() => import('./components/TechStack/TechStack'))
const Contact = lazy(() => import('./components/Contact/Contact'))
const ContactUs = lazy(() => import('./components/ContactUs/ContactUs'))
const Chatbot = lazy(() => import('./components/Chatbot/Chatbot'))
const AdminChat = lazy(() => import('./components/AdminChat/AdminChat'))
const PrivacyPolicy = lazy(() => import('./components/Legal/PrivacyPolicy'))
const TermsOfService = lazy(() => import('./components/Legal/TermsOfService'))
const ScrollProgress = lazy(() => import('./components/ScrollProgress/ScrollProgress'))

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
    return (
      <div className="app">
        <ParticleBackground />
        <CursorGlow />
        <AdminChat />
      </div>
    )
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
        
        <Suspense fallback={<div style={{ height: '50vh' }}></div>}>
          <div className="section-divider"></div>
          <div style={{ contentVisibility: 'auto', containIntrinsicSize: '0 600px' } as React.CSSProperties}>
            <Services />
          </div>
          <div className="section-divider"></div>
          <div style={{ contentVisibility: 'auto', containIntrinsicSize: '0 500px' } as React.CSSProperties}>
            <CostEstimator />
          </div>
          <div className="section-divider"></div>
          <div style={{ contentVisibility: 'auto', containIntrinsicSize: '0 600px' } as React.CSSProperties}>
            <Portfolio />
          </div>
          <div className="section-divider"></div>
          <div style={{ contentVisibility: 'auto', containIntrinsicSize: '0 500px' } as React.CSSProperties}>
            <WhyChooseUs />
          </div>
          <div className="section-divider"></div>
          <div style={{ contentVisibility: 'auto', containIntrinsicSize: '0 400px' } as React.CSSProperties}>
            <Testimonials />
          </div>
          <div className="section-divider"></div>
          <div style={{ contentVisibility: 'auto', containIntrinsicSize: '0 500px' } as React.CSSProperties}>
            <TechStack />
          </div>
          <div className="section-divider"></div>
          <div style={{ contentVisibility: 'auto', containIntrinsicSize: '0 800px' } as React.CSSProperties}>
            <Contact />
          </div>
          <div className="section-divider"></div>
          <div style={{ contentVisibility: 'auto', containIntrinsicSize: '0 500px' } as React.CSSProperties}>
            <ContactUs />
          </div>
        </Suspense>
      </main>
      
      <Footer onOpenLegal={setLegalModal} />

      <Suspense fallback={null}>
        {/* AI Chatbot — controlled by ActionDock */}
        <Chatbot isOpen={chatOpen} onToggle={setChatOpen} />

        {legalModal === 'privacy' && <PrivacyPolicy onClose={() => setLegalModal(null)} />}
        {legalModal === 'terms' && <TermsOfService onClose={() => setLegalModal(null)} />}
      </Suspense>

      {/* macOS-style floating action dock */}
      <ActionDock onOpenChat={() => setChatOpen((prev) => !prev)} />
    </div>
  )
}

export default App
