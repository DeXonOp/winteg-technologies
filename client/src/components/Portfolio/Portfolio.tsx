import { useEffect, useState } from 'react'
import './Portfolio.css'

type Category = 'All' | 'Web' | 'Software' | 'AI' | 'Mobile' | 'Social Media'

interface Project {
  title: string
  description: string
  category: Category | Category[]
  tags: string[]
  color: string
  link?: string
}

const categories: Category[] = ['All', 'Web', 'Software', 'AI', 'Mobile', 'Social Media']

const projects: Project[] = [
  {
    title: 'TempGenPro',
    description: 'Instant temp emails and temporary email generators for privacy. Secure, fast, and anonymous.',
    category: ['Web', 'AI'],
    tags: ['React', 'Node.js', 'Privacy'],
    color: '#AA3BFF',
    link: 'https://tempgenpro.com/'
  },
  {
    title: 'Madhyamgram Rabindra Academy',
    description: 'Official portal for Madhyamgram Rabindra Academy. Manage attendance, homework, and results with our high-performance school management system.',
    category: ['Web', 'Software'],
    tags: ['React', 'School Management', 'Portal'],
    color: '#1A4D2E',
    link: 'https://madhyamgramrabindraacademy.in/'
  },
  {
    title: 'Family Bookstore',
    description: 'Discover professional book collections at Family Bookstore. Wide range of categories including Manga, Fiction, and more.',
    category: ['Web'],
    tags: ['E-Commerce', 'Books', 'React'],
    color: '#00D9FF',
    link: 'https://familybookstore.in/'
  },
  {
    title: '99Bookstore',
    description: 'Online bookstore with a wide selection of books, fast shipping, and secure checkout. Built on a modern commerce platform.',
    category: ['Web'],
    tags: ['E-Commerce', 'Shopify', 'Store'],
    color: '#CD004B',
    link: 'https://99bookstores.com/'
  },
  {
    title: 'EduVibe',
    description: 'A premium education platform providing interactive learning experiences and comprehensive educational resources.',
    category: ['Web'],
    tags: ['Education', 'React', 'Firebase'],
    color: '#38BDF8',
    link: 'https://eduvibe-b1cc9.web.app/'
  },
]

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<Category>('All')

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter(p => Array.isArray(p.category) ? p.category.includes(activeCategory) : p.category === activeCategory)

  useEffect(() => {
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

    const cards = document.querySelectorAll('.portfolio__grid .fade-in')
    cards.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [filtered])

  return (
    <section className="portfolio section" id="portfolio">
      <div className="container">
        <div className="portfolio__header fade-in">
          <span className="section-label">Our Work</span>
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle">
            A showcase of our recent work across different domains and technologies.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="portfolio__filters fade-in">
          {categories.map(cat => (
            <button
              key={cat}
              className={`portfolio__filter-btn ${activeCategory === cat ? 'portfolio__filter-btn--active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="portfolio__grid">
          {filtered.map((project, i) => (
            <div className="portfolio__card glass-card fade-in" key={`${project.title}-${i}`}>
              {/* Project Visual */}
              <div className="portfolio__card-visual" style={{ background: `linear-gradient(135deg, ${project.color}15, ${project.color}05)` }}>
                <div className="portfolio__card-icon" style={{ color: project.color }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="3" />
                    <path d="M9 9h6v6H9z" opacity="0.5" />
                    <circle cx="7.5" cy="7.5" r="1" fill="currentColor" />
                    <circle cx="16.5" cy="7.5" r="1" fill="currentColor" />
                  </svg>
                </div>
                <span className="portfolio__card-category" style={{ color: project.color, borderColor: `${project.color}30` }}>
                  {Array.isArray(project.category) ? project.category.join(', ') : project.category}
                </span>
              </div>

              {/* Project Info */}
              <div className="portfolio__card-body">
                <h3 className="portfolio__card-title">{project.title}</h3>
                <p className="portfolio__card-desc">{project.description}</p>

                <div className="portfolio__card-tags">
                  {project.tags.map((tag, j) => (
                    <span className="portfolio__tag" key={j}>{tag}</span>
                  ))}
                </div>
              </div>

              {/* Hover overlay */}
              <div className="portfolio__card-overlay">
                {project.link ? (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ borderColor: 'white', color: 'white' }}>
                    Visit Website
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </a>
                ) : (
                  <span className="btn btn-outline" style={{ borderColor: 'white', color: 'white' }}>
                    View Details
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
