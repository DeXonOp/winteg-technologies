import './Services.css'

interface Service {
  icon: React.ReactNode
  title: string
  description: string
  features: string[]
  gradient: string
}

const services: Service[] = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /><line x1="12" y1="2" x2="12" y2="22" opacity="0.3" />
      </svg>
    ),
    title: 'Website Development',
    description: 'Custom responsive websites, landing pages, and e-commerce solutions that captivate visitors and drive conversions.',
    features: ['Custom Design', 'SEO Optimized', 'Fast Loading', 'CMS Integration'],
    gradient: 'linear-gradient(135deg, #6C63FF, #8B7FFF)',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: 'Web Applications',
    description: 'Scalable full-stack web applications built with modern frameworks for complex business workflows.',
    features: ['React / Next.js', 'Real-time Features', 'API Development', 'Cloud Deployment'],
    gradient: 'linear-gradient(135deg, #00D9FF, #0EA5E9)',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" /><line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" /><line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" /><line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" /><line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" />
      </svg>
    ),
    title: 'Software Development',
    description: 'Robust desktop software for Windows and Linux — from utilities to enterprise-grade applications.',
    features: ['Windows Apps', 'Linux Apps', 'Cross-Platform', 'System Integration'],
    gradient: 'linear-gradient(135deg, #10B981, #34D399)',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a4 4 0 0 1 4 4c0 1.95-1.4 3.58-3.25 3.93" /><path d="M8.56 9.93A4.001 4.001 0 0 1 12 2" opacity="0.5" /><path d="M17.5 15.5c1.28.66 2.5 1.8 2.5 3.5v1H4v-1c0-1.7 1.22-2.84 2.5-3.5" /><circle cx="12" cy="13" r="3" />
      </svg>
    ),
    title: 'AI-Powered Solutions',
    description: 'Intelligent automation, chatbots, and machine learning models to supercharge your operations.',
    features: ['Custom Chatbots', 'ML Models', 'Data Analytics', 'Process Automation'],
    gradient: 'linear-gradient(135deg, #F59E0B, #FBBF24)',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
    title: 'Mobile App Development',
    description: 'Beautiful native and cross-platform applications for Android and iOS that users love.',
    features: ['Android Apps', 'iOS Apps', 'Flutter / React Native', 'App Store Launch'],
    gradient: 'linear-gradient(135deg, #F43F5E, #FB7185)',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4l4.5 16.5 3.5-7 7-3.5L4 4z" /><path d="M15 15l6 6" />
      </svg>
    ),
    title: 'Social Media Management',
    description: 'Strategic social media marketing to boost your brand presence, engagement, and business growth.',
    features: ['Content Strategy', 'Brand Growth', 'Paid Campaigns', 'Analytics & Reports'],
    gradient: 'linear-gradient(135deg, #8B5CF6, #A78BFA)',
  },
]

export default function Services() {
  return (
    <section className="services section" id="services">
      <div className="container">
        <div className="services__header fade-in">
          <span className="section-label">What We Do</span>
          <h2 className="section-title">
            Services We <span className="gradient-text">Offer</span>
          </h2>
          <p className="section-subtitle">
            From concept to deployment, we provide comprehensive digital solutions
            to help your business grow and succeed in the digital landscape.
          </p>
        </div>

        <div className="services__grid">
          {services.map((service, i) => (
            <div
              className="services__card glass-card fade-in"
              key={i}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="services__card-icon" style={{ background: service.gradient }}>
                {service.icon}
              </div>
              <h3 className="services__card-title">{service.title}</h3>
              <p className="services__card-desc">{service.description}</p>

              <div className="services__card-features">
                {service.features.map((f, j) => (
                  <span className="services__feature-tag" key={j}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--clr-accent-green)" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                    {f}
                  </span>
                ))}
              </div>

              <div className="services__card-glow" style={{ background: service.gradient }}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
