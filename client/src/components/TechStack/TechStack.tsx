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
    ],
  },
  {
    title: 'AI / ML',
    techs: [
      { name: 'TensorFlow', color: '#FF6F00' },
      { name: 'PyTorch', color: '#EE4C2C' },
      { name: 'OpenAI', color: '#10B981' },
      { name: 'Scikit-learn', color: '#F7931E' },
      { name: 'LangChain', color: '#00D9FF' },
    ],
  },
  {
    title: 'Database & Cloud',
    techs: [
      { name: 'MongoDB', color: '#47A248' },
      { name: 'PostgreSQL', color: '#336791' },
      { name: 'Firebase', color: '#FFCA28' },
      { name: 'AWS', color: '#FF9900' },
      { name: 'Docker', color: '#2496ED' },
      { name: 'Git', color: '#F05032' },
    ],
  },
]

export default function TechStack() {
  return (
    <section className="techstack section" id="tech-stack">
      <div className="container">
        <div className="techstack__header fade-in">
          <span className="section-label">Technologies</span>
          <h2 className="section-title">
            Our Tech <span className="gradient-text">Arsenal</span>
          </h2>
          <p className="section-subtitle">
            We leverage cutting-edge technologies to build robust, scalable, and future-proof solutions.
          </p>
        </div>

        <div className="techstack__categories">
          {categories.map((cat, ci) => (
            <div className="techstack__category fade-in" key={ci} style={{ transitionDelay: `${ci * 100}ms` }}>
              <h3 className="techstack__category-title">{cat.title}</h3>
              <div className="techstack__pills">
                {cat.techs.map((tech, ti) => (
                  <div
                    className="techstack__pill"
                    key={ti}
                    style={{ '--tech-color': tech.color, animationDelay: `${(ci * 5 + ti) * 0.15}s` } as React.CSSProperties}
                  >
                    <span
                      className="techstack__pill-dot"
                      style={{ background: tech.color }}
                    ></span>
                    {tech.name}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Animated floating particles */}
        <div className="techstack__particles">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              className="techstack__particle"
              key={i}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${6 + Math.random() * 8}s`,
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`,
              }}
            ></div>
          ))}
        </div>
      </div>
    </section>
  )
}
