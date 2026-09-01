import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './CostEstimator.css'

export default function CostEstimator() {
  const [type, setType] = useState('web') // web, mobile, both
  const [complexity, setComplexity] = useState(2) // 1-4
  const [design, setDesign] = useState(2) // 1-3
  const [pages, setPages] = useState(5) // 1-20

  const [estimate, setEstimate] = useState({ min: 0, max: 0 })

  useEffect(() => {
    let base = 3000;
    if (type === 'mobile') base = 5000;
    if (type === 'both') base = 8000;

    const complexityMult = [1, 1.4, 2.2, 3.5][complexity - 1];
    const designMult = [1, 1.3, 1.8][design - 1];
    const pagesMult = 1 + (pages * 0.04);

    const total = base * complexityMult * designMult * pagesMult;

    setEstimate({
      min: Math.floor(total * 0.85 / 100) * 100,
      max: Math.ceil(total * 1.15 / 100) * 100
    })
  }, [type, complexity, design, pages])

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(num)
  }

  const complexityLabels = ['Basic MVP', 'Standard', 'Complex', 'Enterprise']
  const designLabels = ['Clean & Simple', 'Premium Custom', 'World-Class UI/UX']

  return (
    <section className="estimator section" id="estimator">
      <div className="container">
        <motion.div
          className="estimator__header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Instant Estimate</span>
          <h2 className="section-title">
            Calculate Your <span className="gradient-text">Investment</span>
          </h2>
          <p className="section-subtitle">
            Play with the sliders below to get a real-time estimate of how much your dream project might cost.
          </p>
        </motion.div>

        <motion.div
          className="estimator__dashboard glass-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
        >
          <div className="estimator__controls">
            
            {/* Type Selection */}
            <div className="estimator__group">
              <label>Project Type</label>
              <div className="estimator__type-btns">
                <button className={type === 'web' ? 'active' : ''} onClick={() => setType('web')}>
                  <span className="icon">💻</span> Web App
                </button>
                <button className={type === 'mobile' ? 'active' : ''} onClick={() => setType('mobile')}>
                  <span className="icon">📱</span> Mobile App
                </button>
                <button className={type === 'both' ? 'active' : ''} onClick={() => setType('both')}>
                  <span className="icon">🚀</span> Both
                </button>
              </div>
            </div>

            {/* Complexity Slider */}
            <div className="estimator__group">
              <div className="estimator__group-header">
                <label>App Complexity</label>
                <span className="estimator__badge">{complexityLabels[complexity - 1]}</span>
              </div>
              <input 
                type="range" 
                min="1" max="4" 
                value={complexity} 
                onChange={e => setComplexity(Number(e.target.value))} 
                className="estimator__slider" 
              />
              <div className="estimator__slider-labels">
                <span>Simple</span>
                <span>Advanced</span>
              </div>
            </div>

            {/* Design Slider */}
            <div className="estimator__group">
              <div className="estimator__group-header">
                <label>Design Quality</label>
                <span className="estimator__badge">{designLabels[design - 1]}</span>
              </div>
              <input 
                type="range" 
                min="1" max="3" 
                value={design} 
                onChange={e => setDesign(Number(e.target.value))} 
                className="estimator__slider" 
              />
              <div className="estimator__slider-labels">
                <span>Basic</span>
                <span>Award Winning</span>
              </div>
            </div>

            {/* Pages Slider */}
            <div className="estimator__group">
              <div className="estimator__group-header">
                <label>Number of Screens / Pages</label>
                <span className="estimator__badge">{pages} Screens</span>
              </div>
              <input 
                type="range" 
                min="1" max="30" 
                value={pages} 
                onChange={e => setPages(Number(e.target.value))} 
                className="estimator__slider" 
              />
              <div className="estimator__slider-labels">
                <span>1</span>
                <span>30+</span>
              </div>
            </div>

          </div>

          <div className="estimator__result">
            <h3>Estimated Investment</h3>
            <div className="estimator__price">
              <span className="min">{formatCurrency(estimate.min)}</span>
              <span className="divider">-</span>
              <span className="max">{formatCurrency(estimate.max)}</span>
            </div>
            <p className="estimator__disclaimer">
              *This is a rough automated estimate. Factors like integrations, animations, and backend complexity will affect the final price.
            </p>
            <a href="#contact" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Get a Detailed Proposal
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
