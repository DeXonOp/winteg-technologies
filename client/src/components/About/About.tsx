import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import "./About.css";

const milestones = [
  {
    year: "2022",
    text: "Winteg Technologies Founded by Aritra Dutta & Ayon Pal",
  },
  { year: "2023", text: "Expanded into AI, Software & Mobile Development" },
  {
    year: "2024",
    text: "Served 30+ clients worldwide via wintegtechnologies.com",
  },
  { year: "2025", text: "Launched Social Media & Digital Marketing Division" },
];

const stats = [
  { number: "50+", label: "Projects Delivered" },
  { number: "30+", label: "Happy Clients" },
  { number: "3+", label: "Years Experience" },
  { number: "12", label: "Service Categories" },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section className="about section" id="about" ref={sectionRef}>
      <div className="container">
        <div className="about__grid">
          {/* Left — Visual with parallax */}
          <motion.div className="about__visual" style={{ y: y1 }}>
            <div className="about__image-container">
              <div className="about__image-glow"></div>
              <div className="about__image-card glass-card">
                <div className="about__icon-grid">
                  <div className="about__icon-item">
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--clr-primary)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5" />
                      <path d="M2 12l10 5 10-5" />
                    </svg>
                    <span>Full Stack</span>
                  </div>
                  <div className="about__icon-item">
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--clr-secondary)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16v-4M12 8h.01" />
                    </svg>
                    <span>AI Driven</span>
                  </div>
                  <div className="about__icon-item">
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--clr-accent-green)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                      <path d="M12 18h.01" />
                    </svg>
                    <span>Mobile First</span>
                  </div>
                  <div className="about__icon-item">
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--clr-accent-orange)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    <span>Team Work</span>
                  </div>
                </div>
              </div>

              {/* Floating badges with parallax */}
              <motion.div
                className="about__float-badge about__float-badge--1 glass-card"
                style={{ y: y2 }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--clr-accent-green)"
                  strokeWidth="2.5"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <span>99% Uptime</span>
              </motion.div>

              <motion.div
                className="about__float-badge about__float-badge--2 glass-card"
                style={{ y: useTransform(scrollYProgress, [0, 1], [-20, 20]) }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--clr-accent-orange)"
                  strokeWidth="2.5"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                <span>4.8-Star Rated</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Right — Content */}
          <motion.div
            className="about__content"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <span className="section-label">About Us</span>
            <h2 className="section-title">
              Crafting Digital Excellence <br />
              <span className="gradient-text">Since 2022</span>
            </h2>
            <p className="about__text">
              Winteg Technologies is a passionate team of developers, designers,
              and strategists dedicated to helping businesses thrive in the
              digital world. Founded by Aritra Dutta & Ayon Pal, Winteg
              (wintegtechnologies.com) combines cutting-edge technology with
              creative thinking to deliver web development, software
              engineering, and AI solutions that make an impact.
            </p>
            <p className="about__text">
              From sleek websites and robust software to intelligent AI
              solutions and mobile apps, Winteg Technologies offers end-to-end
              digital services tailored to your unique needs. As a trusted
              digital agency from India, we have served 30+ clients worldwide
              with 50+ successful projects since 2022.
            </p>

            {/* Stats Grid */}
            <div className="about__stats">
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  className="about__stat-item"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <span className="about__stat-number gradient-text">
                    {s.number}
                  </span>
                  <span className="about__stat-label">{s.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Timeline */}
            <div className="about__timeline">
              {milestones.map((m, i) => (
                <motion.div
                  className="about__timeline-item"
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                >
                  <div className="about__timeline-dot"></div>
                  <div className="about__timeline-content">
                    <span className="about__timeline-year">{m.year}</span>
                    <span className="about__timeline-text">{m.text}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
