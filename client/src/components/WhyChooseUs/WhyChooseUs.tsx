import './WhyChooseUs.css'

const features = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: 'End-to-End Development',
    description: 'From ideation to deployment, we handle every stage of the development lifecycle.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    title: 'Affordable Pricing',
    description: 'Premium-quality solutions at competitive prices that fit your budget.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: 'Fast Turnaround',
    description: 'We deliver results quickly without compromising on quality or attention to detail.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: '24/7 Support',
    description: 'Round-the-clock support and communication throughout and after your project.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: 'Modern Tech Stack',
    description: 'We use the latest frameworks and tools to build future-proof digital products.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: 'Scalable Solutions',
    description: 'Architecture designed to grow with your business — from startup to enterprise.',
  },
]

export default function WhyChooseUs() {
  return (
    <section className="why section" id="whychooseus">
      <div className="container">
        <div className="why__header fade-in">
          <span className="section-label">Why Us</span>
          <h2 className="section-title">
            Why Choose <span className="gradient-text">Winteg?</span>
          </h2>
          <p className="section-subtitle">
            We don't just build products — we build partnerships that drive long-term success.
          </p>
        </div>

        <div className="why__grid">
          {features.map((feat, i) => (
            <div className="why__card fade-in" key={i} style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="why__card-icon">{feat.icon}</div>
              <div className="why__card-content">
                <h3 className="why__card-title">{feat.title}</h3>
                <p className="why__card-desc">{feat.description}</p>
              </div>
              <div className="why__card-number">{String(i + 1).padStart(2, '0')}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
