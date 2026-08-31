import { useState } from 'react'
import { motion } from 'framer-motion'
import './Portfolio.css'

interface Project {
  title: string
  description: string
  tags: string[]
  color: string
  link?: string
  number: string
}

const projects: Project[] = [
  {
    title: 'Discovery & Architecture',
    description: 'We begin by thoroughly analyzing your business requirements, existing infrastructure, and data flow. We then design a scalable cloud architecture and create detailed engineering blueprints.',
    tags: ['System Design', 'Cloud Architecture', 'Requirements'],
    color: '#A855F7',
    number: '01',
  },
  {
    title: 'Prototyping & AI Modeling',
    description: 'Before committing to full-scale development, we build functional prototypes. For AI projects, this involves initial model selection, data sanitization, and proof-of-concept training.',
    tags: ['Rapid Prototyping', 'Data Engineering', 'Feasibility'],
    color: '#10B981',
    number: '02',
  },
  {
    title: 'Core System Engineering',
    description: 'Our senior engineers write clean, highly optimized code. We build your telemetrics pipelines, train computer vision models, or develop your enterprise ERP system utilizing strict CI/CD pipelines.',
    tags: ['Full-stack Dev', 'IoT Integration', 'Machine Learning'],
    color: '#06B6D4',
    number: '03',
  },
  {
    title: 'Security & Stress Testing',
    description: 'Enterprise systems demand extreme reliability. We perform rigorous penetration testing, load simulation, and edge-case QA to ensure your infrastructure handles massive traffic spikes securely.',
    tags: ['Pen-testing', 'Load Balancing', 'QA Automation'],
    color: '#F43F5E',
    number: '04',
  },
  {
    title: 'Deployment & Scale',
    description: 'We containerize applications using Docker/Kubernetes and deploy them to highly scalable cloud clusters. Post-launch, we provide continuous monitoring and 99.99% SLA-backed maintenance.',
    tags: ['Kubernetes', 'Cloud Deployment', '24/7 Monitoring'],
    color: '#0EA5E9',
    number: '05',
  },
]

const pages = [
  { front: 'cover', back: projects[0] },
  { front: projects[1], back: projects[2] },
  { front: projects[3], back: projects[4] },
  { front: 'back_cover', back: null },
]

export default function Portfolio() {
  const [currentPage, setCurrentPage] = useState(0)

  const nextPage = () => {
    if (currentPage < pages.length - 1) setCurrentPage(p => p + 1)
  }

  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(p => p - 1)
  }

  const renderContent = (content: any) => {
    if (content === 'cover') {
      return (
        <div className="notebook-cover front-cover">
          <div className="cover-design">
            <h2>Winteg</h2>
            <h1>Engineering</h1>
            <div className="cover-line"></div>
            <p>Our Development Methodology</p>
          </div>
        </div>
      )
    }
    if (content === 'back_cover') {
      return (
        <div className="notebook-cover back-cover">
          <div className="cover-design">
            <div className="brand-mark">W</div>
            <p>wintegtechnologies.com</p>
          </div>
        </div>
      )
    }
    if (!content) {
      return <div className="notebook-blank"></div>
    }

    const project = content as Project
    return (
      <div className="notebook-project">
        <div className="project-visual" style={{ background: `linear-gradient(135deg, ${project.color}20, ${project.color}05)` }}>
          <span className="project-number" style={{ color: `${project.color}20` }}>{project.number}</span>
          <div className="project-icon" style={{ color: project.color }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="3" />
              <path d="M9 9h6v6H9z" opacity="0.5" />
              <circle cx="7.5" cy="7.5" r="1" fill="currentColor" />
              <circle cx="16.5" cy="7.5" r="1" fill="currentColor" />
            </svg>
          </div>
        </div>
        <div className="project-body">
          <h3 style={{ color: project.color }}>{project.title}</h3>
          <p>{project.description}</p>
          <div className="project-tags">
            {project.tags.map((t, i) => (
              <span key={i} style={{ borderColor: `${project.color}40`, color: project.color }}>{t}</span>
            ))}
          </div>
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link" style={{ background: project.color }}>
              Visit Project <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </a>
          )}
        </div>
      </div>
    )
  }

  return (
    <section className="portfolio section" id="portfolio">
      <div className="container">
        <motion.div
          className="portfolio__header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          onViewportEnter={() => {
            setTimeout(() => {
              setCurrentPage(p => p === 0 ? 1 : p)
            }, 800)
          }}
        >
          <span className="section-label">Methodology</span>
          <h2 className="section-title">
            How We <span className="gradient-text">Work</span>
          </h2>
          <p className="section-subtitle">
            Flip through our digital playbook to explore our engineering process.
          </p>
        </motion.div>

        <div className="notebook-container">
          <div className="notebook-wrapper">
            <div className="notebook">
              {pages.map((page, index) => {
                const isFlipped = index < currentPage
                const zIndex = isFlipped ? index : pages.length - index

                return (
                  <motion.div
                    key={index}
                    className={`notebook-page ${isFlipped ? 'flipped' : ''}`}
                    initial={false}
                    animate={{ rotateY: isFlipped ? -180 : 0 }}
                    transition={{ type: 'spring', stiffness: 45, damping: 14, mass: 1 }}
                    style={{ zIndex, transformOrigin: 'left center' }}
                    onClick={() => {
                      // Clicking the right page turns forward, clicking left page turns backward
                      if (!isFlipped && index === currentPage) nextPage()
                      if (isFlipped && index === currentPage - 1) prevPage()
                    }}
                  >
                    <div className="page-face page-front">
                      <div className="page-content">{renderContent(page.front)}</div>
                      <div className="page-lighting lighting-front"></div>
                    </div>
                    <div className="page-face page-back">
                      <div className="page-content">{renderContent(page.back)}</div>
                      <div className="page-lighting lighting-back"></div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="notebook-nav">
            <button className="nav-btn prev" onClick={prevPage} disabled={currentPage === 0}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg>
              Prev
            </button>
            <div className="page-indicator">
              Page {currentPage + 1} of {pages.length}
            </div>
            <button className="nav-btn next" onClick={nextPage} disabled={currentPage === pages.length - 1}>
              Next
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
