import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import CountUp from "../CountUp/CountUp";
import BackgroundVideo from "./BackgroundVideo";
import "./Hero.css";

const phrases = [
  "Telemetrics & IoT",
  "GPS & Fleet Tracking",
  "AI-Powered Solutions",
  "AI & Computer Vision",
  "ERP & CRM Systems",
  "Data Analytics & Insights",
  "Healthcare IT Systems",
  "Fintech & Payment Solutions",
  "Web3 Architectures",
];

const titleWords = ["We", "Build", "The", "Future"];

export default function Hero() {
  const [currentPhrase, setCurrentPhrase] = useState(0);

  const SLIDE_DURATION = 6000; // 6 seconds per slide

  // Master Timer for syncing Video and Text
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrases.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero" id="home">
      <BackgroundVideo currentIndex={currentPhrase} />

      {/* Animated background */}
      <div className="hero__bg">
        <div className="hero__gradient-orb hero__gradient-orb--1"></div>
        <div className="hero__gradient-orb hero__gradient-orb--2"></div>
        <div className="hero__gradient-orb hero__gradient-orb--3"></div>
        <div className="hero__grid"></div>

        {/* Floating geometric shapes */}
        <div className="hero__shape hero__shape--1"></div>
        <div className="hero__shape hero__shape--2"></div>
        <div className="hero__shape hero__shape--3"></div>
      </div>

      <div className="hero__content container">
        <div className="hero__grid-layout">
          {/* Left Column: Headlines, Subtitles, Stats */}
          <motion.div
            className="hero__left-col"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.div
              className="hero__badge"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            >
              <span className="hero__badge-dot"></span>
              <span>Available for New Projects • ISO & Enterprise Ready</span>
            </motion.div>

            <h1 className="hero__title">
              {titleWords.map((word, i) => (
                <motion.span
                  key={i}
                  className="hero__title-word"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.1 + i * 0.12,
                    duration: 0.6,
                    ease: "easeOut",
                  }}
                >
                  {word}{" "}
                </motion.span>
              ))}
              <br />
              <span className="hero__typed-wrapper">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentPhrase}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={{
                      hidden: { opacity: 1 },
                      visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.06 },
                      },
                      exit: {
                        opacity: 0,
                        filter: "blur(4px)",
                        y: -10,
                        transition: { duration: 0.3 },
                      },
                    }}
                    className="gradient-text hero__typed"
                    style={{ display: "inline-block" }}
                  >
                    {phrases[currentPhrase].split("").map((char, index) => (
                      <motion.span
                        key={index}
                        variants={{
                          hidden: { opacity: 0, display: "none" },
                          visible: { opacity: 1, display: "inline-block" },
                        }}
                      >
                        {char === " " ? "\u00A0" : char}
                      </motion.span>
                    ))}
                    <span className="hero__cursor">|</span>
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>

            <motion.p
              className="hero__subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              India’s premier AI & advanced engineering firm. We architect enterprise AI agents, IoT telemetrics, GPS tracking, computer vision pipelines, and high-performance web, mobile & cloud solutions.
            </motion.p>

            <motion.div
              className="hero__actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <a
                href="#quotation"
                className="btn btn-primary btn--lg hero__quote-btn"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById("quotation") || document.getElementById("contact");
                  if (el) {
                    const rect = el.getBoundingClientRect();
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    const targetY = rect.top + scrollTop - 72 - 16;
                    window.scrollTo({ top: targetY, behavior: "smooth" });
                  }
                }}
              >
                Get Free Quotation
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="#services"
                className="btn btn-outline btn--lg hero__process-btn"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById("services") || document.getElementById("portfolio");
                  if (el) {
                    const rect = el.getBoundingClientRect();
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    const targetY = rect.top + scrollTop - 72;
                    window.scrollTo({ top: targetY, behavior: "smooth" });
                  }
                }}
              >
                Explore Solutions ⚡
              </a>
            </motion.div>

            {/* Micro Feature Pills for Visual Richness */}
            <motion.div 
              className="hero__feature-pills"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              <span className="hero__feature-pill">🤖 Custom AI Agents</span>
              <span className="hero__feature-pill">📡 IoT & Telemetrics</span>
              <span className="hero__feature-pill">📍 GPS Tracking</span>
              <span className="hero__feature-pill">⚡ High-Scale Cloud</span>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="hero__stats"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              {[
                {
                  target: 50,
                  suffix: "+",
                  label: "Projects Done",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
                      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-3.05 11a22.35 22.35 0 0 1-3.95 2z"/>
                      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
                      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
                    </svg>
                  ),
                },
                {
                  target: 30,
                  suffix: "+",
                  label: "Happy Clients",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                  ),
                },
                {
                  target: 3,
                  suffix: "+",
                  label: "Years Exp",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m13 2-2 10h8L7 22l2-10H1z"/>
                    </svg>
                  ),
                },
                {
                  target: 99,
                  suffix: "%",
                  label: "Satisfaction",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F43F5E" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ),
                },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="hero__stat"
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  <div className="hero__stat-icon">{stat.icon}</div>
                  <div className="hero__stat-content">
                    <CountUp
                      target={stat.target}
                      suffix={stat.suffix}
                      className="hero__stat-number"
                    />
                    <span className="hero__stat-label">{stat.label}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <div className="hero__scroll-line"></div>
      </motion.div>
    </section>
  );
}
