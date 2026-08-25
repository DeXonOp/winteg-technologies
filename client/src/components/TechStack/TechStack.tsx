import { useMemo } from 'react'
import { motion, type Variants } from 'framer-motion'
import './TechStack.css'

interface Tech {
  name: string
  color: string
}

const categories: { title: string; techs: Tech[] }[] = [
  {
    title: 'Frontend',
    techs: [
      { name: 'HTML5', color: '#E34F26' },
      { name: 'CSS3', color: '#1572B6' },
      { name: 'JavaScript', color: '#F7DF1E' },
      { name: 'TypeScript', color: '#3178C6' },
      { name: 'React', color: '#61DAFB' },
      { name: 'Next.js', color: '#ffffff' },
      { name: 'Vue.js', color: '#4FC08D' },
      { name: 'Angular', color: '#DD0031' },
      { name: 'TailwindCSS', color: '#38B2AC' },
      { name: 'Flutter', color: '#02569B' },
    ],
  },
  {
    title: 'Backend',
    techs: [
      { name: 'Node.js', color: '#339933' },
      { name: 'Python', color: '#3776AB' },
      { name: 'Django', color: '#092E20' },
      { name: 'Express', color: '#ffffff' },
      { name: 'FastAPI', color: '#009688' },
      { name: 'Java', color: '#ED8B00' },
      { name: 'Ruby', color: '#CC342D' },
      { name: 'Go', color: '#00ADD8' },
      { name: 'Rust', color: '#DEA584' },
      { name: 'C#', color: '#239120' },
    ],
  },
  {
    title: 'AI / ML',
    techs: [
      { name: 'TensorFlow', color: '#FF6F00' },
      { name: 'PyTorch', color: '#EE4C2C' },
      { name: 'OpenAI', color: '#10B981' },
      { name: 'Scikit-learn', color: '#F7931E' },
      { name: 'LangChain', color: '#06B6D4' },
      { name: 'Hugging Face', color: '#FFD21E' },
      { name: 'Pandas', color: '#150458' },
      { name: 'NumPy', color: '#013243' },
    ],
  },
  {
    title: 'Database & Cloud',
    techs: [
      { name: 'MongoDB', color: '#47A248' },
      { name: 'PostgreSQL', color: '#336791' },
      { name: 'MySQL', color: '#4479A1' },
      { name: 'Redis', color: '#DC382D' },
      { name: 'Firebase', color: '#FFCA28' },
      { name: 'AWS', color: '#FF9900' },
      { name: 'GCP', color: '#4285F4' },
      { name: 'Docker', color: '#2496ED' },
      { name: 'Kubernetes', color: '#326CE5' },
      { name: 'Git', color: '#F05032' },
    ],
  },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

const categoryVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 80, damping: 15 },
  },
}

const pillVariants: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 200, damping: 15 },
  },
}

export default function TechStack() {
  // Pre-compute particle positions to avoid Math.random during render
  const particleStyles = useMemo(() =>
    Array.from({ length: 20 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 8}s`,
      animationDuration: `${6 + Math.random() * 8}s`,
      width: `${2 + Math.random() * 4}px`,
      height: `${2 + Math.random() * 4}px`,
    })), []
  )

  return (
    <section className="techstack section" id="tech-stack">
      <div className="container">
        <motion.div
          className="techstack__header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Technologies</span>
          <h2 className="section-title">
            Our Tech <span className="gradient-text">Arsenal</span>
          </h2>
          <p className="section-subtitle">
            We leverage cutting-edge technologies to build robust, scalable, and future-proof solutions.
          </p>
        </motion.div>

        <motion.div
          className="techstack__categories"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {categories.map((cat, ci) => (
            <motion.div
              className="techstack__category glass-card"
              key={ci}
              variants={categoryVariants}
            >
              <h3 className="techstack__category-title">{cat.title}</h3>
              <motion.div
                className="techstack__pills"
                variants={containerVariants}
              >
                {cat.techs.map((tech, ti) => (
                  <motion.div
                    className="techstack__pill"
                    key={ti}
                    variants={pillVariants}
                    whileHover={{
                      scale: 1.1,
                      y: -3,
                      boxShadow: `0 0 20px ${tech.color}40`,
                      transition: { duration: 0.2 },
                    }}
                    style={{ '--tech-color': tech.color } as React.CSSProperties}
                  >
                    <span
                      className="techstack__pill-dot"
                      style={{ background: tech.color }}
                    ></span>
                    {tech.name}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Animated floating particles */}
        <div className="techstack__particles">
          {particleStyles.map((style, i) => (
            <div
              className="techstack__particle"
              key={i}
              style={style}
            ></div>
          ))}
        </div>
      </div>
    </section>
  )
}
