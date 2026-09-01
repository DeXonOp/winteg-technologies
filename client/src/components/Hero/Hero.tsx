import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import CountUp from "../CountUp/CountUp";
import BackgroundVideo from "./BackgroundVideo";
import "./Hero.css";

const phrases = [
  "Telemetrics & IoT",
  "GPS Integration & Tracking",
  "AI-Powered Solutions",
  "AI Cameras & Computer Vision",
  "ERP & CRM Architectures",
  "Data Analytics & Insights",
  "Healthcare IT Solutions",
  "Healthcare Management Systems",
  "Fintech & Payment Solutions",
  "Blockchain & Web3 Architectures",
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
              Available for New Projects
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
              Winteg Technologies is a leading advanced engineering and AI
              solutions company from India. We architect enterprise-grade
              telemetrics systems, custom AI agents, GPS tracking
              infrastructure, computer vision pipelines, and highly scalable
              cloud solutions.
            </motion.p>

            <motion.div
              className="hero__actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <a
                href="#contact"
                className="btn btn-primary btn--lg hero__quote-btn"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById("contact");
                  if (el) {
                    const rect = el.getBoundingClientRect();
                    const scrollTop =
                      window.pageYOffset || document.documentElement.scrollTop;
                    const targetY = rect.top + scrollTop - 72 - 16;
                    window.scrollTo({ top: targetY, behavior: "smooth" });
                  }
                }}
              >
                Contact Us
                <svg
                  width="16"
                  height="16"
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
                href="#portfolio"
                className="btn btn-outline btn--lg"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById("portfolio");
                  if (el) {
                    const rect = el.getBoundingClientRect();
                    const scrollTop =
                      window.pageYOffset || document.documentElement.scrollTop;
                    const targetY = rect.top + scrollTop - 72;
                    window.scrollTo({ top: targetY, behavior: "smooth" });
                  }
                }}
              >
                Our Process
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="hero__stats"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              {[
                { target: 50, suffix: "+", label: "Projects Done" },
                { target: 30, suffix: "+", label: "Happy Clients" },
                { target: 3, suffix: "+", label: "Years Exp" },
                { target: 99, suffix: "%", label: "Satisfaction" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="hero__stat"
                  whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                >
                  <CountUp
                    target={stat.target}
                    suffix={stat.suffix}
                    className="hero__stat-number"
                  />
                  <span className="hero__stat-label">{stat.label}</span>
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
