import { useMemo, useState } from 'react'
import { motion, type Variants } from 'framer-motion'
import './TechStack.css'

interface Tech {
  name: string
  color: string
  icon: string
}

const TechIcon = ({ name, color, icon }: { name: string; color: string; icon: string }) => {
  const [error, setError] = useState(false)

  if (error || !icon) {
    return <span className="techstack__pill-dot" style={{ background: color }}></span>
  }

  return (
    <img
      src={icon}
      alt={`${name} logo`}
      className="techstack__pill-icon"
      width="16"
      height="16"
      loading="lazy"
      onError={() => setError(true)}
    />
  )
}

const categories: { title: string; techs: Tech[] }[] = [
  {
    title: 'Frontend',
    techs: [
      { name: 'HTML5', color: '#E34F26', icon: 'https://cdn.simpleicons.org/html5/E34F26' },
      { name: 'CSS3', color: '#1572B6', icon: 'https://cdn.simpleicons.org/css3/1572B6' },
      { name: 'JavaScript', color: '#F7DF1E', icon: 'https://cdn.simpleicons.org/javascript/F7DF1E' },
      { name: 'TypeScript', color: '#3178C6', icon: 'https://cdn.simpleicons.org/typescript/3178C6' },
      { name: 'React', color: '#61DAFB', icon: 'https://cdn.simpleicons.org/react/61DAFB' },
      { name: 'Next.js', color: '#000000', icon: 'https://cdn.simpleicons.org/nextdotjs/000000' },
      { name: 'Vue.js', color: '#4FC08D', icon: 'https://cdn.simpleicons.org/vuedotjs/4FC08D' },
      { name: 'Angular', color: '#DD0031', icon: 'https://cdn.simpleicons.org/angular/DD0031' },
      { name: 'TailwindCSS', color: '#38B2AC', icon: 'https://cdn.simpleicons.org/tailwindcss/38B2AC' },
      { name: 'Flutter', color: '#02569B', icon: 'https://cdn.simpleicons.org/flutter/02569B' },
    ],
  },
  {
    title: 'Backend',
    techs: [
      { name: 'Node.js', color: '#339933', icon: 'https://cdn.simpleicons.org/nodedotjs/339933' },
      { name: 'Python', color: '#3776AB', icon: 'https://cdn.simpleicons.org/python/3776AB' },
      { name: 'Django', color: '#092E20', icon: 'https://cdn.simpleicons.org/django/092E20' },
      { name: 'Express', color: '#000000', icon: 'https://cdn.simpleicons.org/express/000000' },
      { name: 'FastAPI', color: '#009688', icon: 'https://cdn.simpleicons.org/fastapi/009688' },
      { name: 'Java', color: '#ED8B00', icon: 'https://cdn.simpleicons.org/openjdk/ED8B00' },
      { name: 'Ruby', color: '#CC342D', icon: 'https://cdn.simpleicons.org/ruby/CC342D' },
      { name: 'Go', color: '#00ADD8', icon: 'https://cdn.simpleicons.org/go/00ADD8' },
      { name: 'Rust', color: '#DEA584', icon: 'https://cdn.simpleicons.org/rust/000000' },
      { name: 'C#', color: '#239120', icon: 'https://cdn.simpleicons.org/csharp/239120' },
    ],
  },
  {
    title: 'AI / ML',
    techs: [
      { name: 'TensorFlow', color: '#FF6F00', icon: 'https://cdn.simpleicons.org/tensorflow/FF6F00' },
      { name: 'PyTorch', color: '#EE4C2C', icon: 'https://cdn.simpleicons.org/pytorch/EE4C2C' },
      { name: 'OpenAI', color: '#10B981', icon: 'https://cdn.simpleicons.org/openai/10B981' },
      { name: 'Scikit-learn', color: '#F7931E', icon: 'https://cdn.simpleicons.org/scikitlearn/F7931E' },
      { name: 'LangChain', color: '#06B6D4', icon: 'https://cdn.simpleicons.org/langchain/06B6D4' },
      { name: 'Hugging Face', color: '#FFD21E', icon: 'https://cdn.simpleicons.org/huggingface/FFD21E' },
      { name: 'Pandas', color: '#150458', icon: 'https://cdn.simpleicons.org/pandas/150458' },
      { name: 'NumPy', color: '#013243', icon: 'https://cdn.simpleicons.org/numpy/013243' },
    ],
  },
  {
    title: 'Database & Cloud',
    techs: [
      { name: 'MongoDB', color: '#47A248', icon: 'https://cdn.simpleicons.org/mongodb/47A248' },
      { name: 'PostgreSQL', color: '#336791', icon: 'https://cdn.simpleicons.org/postgresql/336791' },
      { name: 'MySQL', color: '#4479A1', icon: 'https://cdn.simpleicons.org/mysql/4479A1' },
      { name: 'Redis', color: '#DC382D', icon: 'https://cdn.simpleicons.org/redis/DC382D' },
      { name: 'Firebase', color: '#FFCA28', icon: 'https://cdn.simpleicons.org/firebase/FFCA28' },
      { name: 'AWS', color: '#FF9900', icon: 'https://cdn.simpleicons.org/amazonwebservices/FF9900' },
      { name: 'GCP', color: '#4285F4', icon: 'https://cdn.simpleicons.org/googlecloud/4285F4' },
      { name: 'Docker', color: '#2496ED', icon: 'https://cdn.simpleicons.org/docker/2496ED' },
      { name: 'Kubernetes', color: '#326CE5', icon: 'https://cdn.simpleicons.org/kubernetes/326CE5' },
      { name: 'Git', color: '#F05032', icon: 'https://cdn.simpleicons.org/git/F05032' },
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
                    <TechIcon name={tech.name} color={tech.color} icon={tech.icon} />
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
