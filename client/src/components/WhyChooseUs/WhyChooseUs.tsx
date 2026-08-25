import { motion, type Variants } from 'framer-motion'
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
    gradient: 'linear-gradient(135deg, #A855F7, #C084FC)',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    title: 'Affordable Pricing',
    description: 'Premium-quality solutions at competitive prices that fit your budget.',
    gradient: 'linear-gradient(135deg, #10B981, #34D399)',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: 'Fast Turnaround',
    description: 'We deliver results quickly without compromising on quality or attention to detail.',
    gradient: 'linear-gradient(135deg, #F59E0B, #FBBF24)',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: '24/7 Support',
    description: 'Round-the-clock support and communication throughout and after your project.',
    gradient: 'linear-gradient(135deg, #06B6D4, #22D3EE)',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: 'Modern Tech Stack',
    description: 'We use the latest frameworks and tools to build future-proof digital products.',
    gradient: 'linear-gradient(135deg, #EC4899, #F472B6)',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: 'Scalable Solutions',
    description: 'Architecture designed to grow with your business — from startup to enterprise.',
    gradient: 'linear-gradient(135deg, #8B5CF6, #A78BFA)',
  },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, rotateY: -15, x: -30 },
  visible: {
    opacity: 1,
    rotateY: 0,
    x: 0,
    transition: { type: 'spring' as const, stiffness: 80, damping: 15 },
  },
}

export default function WhyChooseUs() {
  return (
    <section className="why section" id="whychooseus">
      <div className="container">
        <motion.div
          className="why__header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Why Us</span>
          <h2 className="section-title">
            Why Choose <span className="gradient-text">Winteg?</span>
          </h2>
          <p className="section-subtitle">
            We don't just build products — we build partnerships that drive long-term success.
          </p>
        </motion.div>

        <motion.div
          className="why__grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {features.map((feat, i) => (
            <motion.div
              className="why__card glass-card"
              key={i}
              variants={cardVariants}
              whileHover={{
                scale: 1.03,
                rotateY: 5,
                transition: { duration: 0.3 },
              }}
              style={{ perspective: 1000 }}
            >
              {/* Big background number */}
              <span className="why__card-bg-number">{String(i + 1).padStart(2, '0')}</span>

              <div className="why__card-icon" style={{ background: feat.gradient }}>
                {feat.icon}
              </div>
              <div className="why__card-content">
                <h3 className="why__card-title">{feat.title}</h3>
                <p className="why__card-desc">{feat.description}</p>
              </div>

              {/* Connecting line decoration */}
              <div className="why__card-line" style={{ background: feat.gradient }}></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
