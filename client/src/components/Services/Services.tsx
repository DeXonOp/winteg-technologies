import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, type Variants } from 'framer-motion'
import {
  Code2, Monitor, Cpu, Brain, Smartphone, Share2,
  MapPin, Activity, Camera, Building2, HeartPulse, CreditCard
} from 'lucide-react'
import './Services.css'

interface Service {
  icon: React.ReactNode
  title: string
  description: string
  detailedInfo: string
  features: string[]
  techStack: string[]
  metrics: { label: string; value: string }[]
  gradient: string
  color: string
  size?: 'large' | 'normal'
}

const services: Service[] = [
  {
    icon: <Activity size={28} />,
    title: 'Telemetrics & IoT Monitoring',
    description: 'Advanced telemetry data collection, real-time sensor monitoring, and IoT device management systems.',
    detailedInfo: 'Ingesting heavy MQTT traffic streams from remote hardware sensors into Time-Series databases (InfluxDB). We provide visual dashboards capable of predictive maintenance alerts via anomaly detection algorithms.',
    features: ['Real-time Dashboards', 'Sensor Integration', 'Predictive Maintenance', 'Data Pipelines'],
    techStack: ['MQTT', 'InfluxDB', 'Grafana', 'Kafka'],
    metrics: [{ label: 'Ingestion', value: '10GB/hr' }, { label: 'Uptime', value: '99.999%' }],
    gradient: 'linear-gradient(135deg, #EAB308, #FACC15)',
    color: '#EAB308',
  },
  {
    icon: <Brain size={28} />,
    title: 'AI-Powered Solutions',
    description: 'Intelligent automation, chatbots, and machine learning models to supercharge your operations.',
    detailedInfo: 'Custom LLM fine-tuning and RAG (Retrieval-Augmented Generation) architectures. We plug proprietary data into Hugging Face and OpenAI frameworks to build autonomous agents capable of complex reasoning and internal process execution.',
    features: ['Custom Chatbots', 'ML Models', 'Data Analytics', 'Process Automation'],
    techStack: ['Python', 'PyTorch', 'OpenAI', 'LangChain'],
    metrics: [{ label: 'Inference', value: '< 200ms' }, { label: 'Accuracy', value: '98.4%' }],
    gradient: 'linear-gradient(135deg, #F59E0B, #FBBF24)',
    color: '#F59E0B',
  },
  {
    icon: <MapPin size={28} />,
    title: 'GPS Integration & Tracking',
    description: 'Real-time GPS tracking systems for fleet management, asset monitoring, and location-based services.',
    detailedInfo: 'Handling millions of websocket pub/sub events per second. Our geospatial architectures map live fleet telemetry via Mapbox and Google Earth APIs, enabling real-time geofence alerting and historic route playback.',
    features: ['Fleet Tracking', 'Geofencing', 'Route Optimization', 'Live Maps'],
    techStack: ['Mapbox GL', 'WebSockets', 'PostGIS', 'Redis'],
    metrics: [{ label: 'Event Vol', value: '5M/sec' }, { label: 'Precision', value: 'Sub-meter' }],
    gradient: 'linear-gradient(135deg, #14B8A6, #2DD4BF)',
    color: '#14B8A6',
  },
  {
    icon: <Camera size={28} />,
    title: 'AI Camera & Computer Vision',
    description: 'Cutting-edge computer vision for smart surveillance, quality inspection, and automated visual analysis.',
    detailedInfo: 'Deploying lightweight YOLO architectures directly onto Edge devices (NVIDIA Jetson). This enables real-time facial recognition, bounding-box tracking, and defect detection directly on factory floors without cloud latency.',
    features: ['Object Detection', 'Facial Recognition', 'Behavior Analysis', 'Edge AI'],
    techStack: ['YOLOv8', 'OpenCV', 'TensorRT', 'CUDA'],
    metrics: [{ label: 'Processing', value: 'Edge-local' }, { label: 'Latency', value: '12ms' }],
    gradient: 'linear-gradient(135deg, #06B6D4, #67E8F9)',
    color: '#06B6D4',
  },
  {
    icon: <Building2 size={28} />,
    title: 'ERP & CRM Systems',
    description: 'Enterprise resource planning and customer relationship management tailored to your business workflows.',
    detailedInfo: 'Monolithic refactoring into headless ERP architectures. We map your specific supply-chain and human resource structures into custom PostgreSQL schemas, connecting them to secure web portals protected by SSO (Single Sign-On).',
    features: ['Inventory Mgmt', 'Sales Pipeline', 'HR Module', 'Custom Workflows'],
    techStack: ['PostgreSQL', 'Prisma', 'NestJS', 'Redis'],
    metrics: [{ label: 'ACID', value: 'Strict' }, { label: 'Queries', value: '< 10ms' }],
    gradient: 'linear-gradient(135deg, #8B5CF6, #A78BFA)',
    color: '#8B5CF6',
  },
  {
    icon: <HeartPulse size={28} />,
    title: 'Healthcare Management Systems',
    description: 'Digital healthcare platforms for hospitals, clinics, and telemedicine with patient management and EMR.',
    detailedInfo: 'HIPAA and SOC2 compliant architectures. We manage Electronic Medical Records (EMR) with strict end-to-end encryption (AES-256) while offering low-latency WebRTC pipelines for highly secure telemedicine video consultations.',
    features: ['Patient Records', 'Appointment System', 'Telemedicine', 'Pharmacy Mgmt'],
    techStack: ['WebRTC', 'AES-256', 'HL7/FHIR', 'AWS'],
    metrics: [{ label: 'Compliance', value: 'HIPAA/SOC2' }, { label: 'Encryption', value: 'End-to-End' }],
    gradient: 'linear-gradient(135deg, #EF4444, #F87171)',
    color: '#EF4444',
  },
  {
    icon: <CreditCard size={28} />,
    title: 'Fintech & Payment Solutions',
    description: 'Secure financial technology solutions including payment gateways, digital wallets, and banking integrations.',
    detailedInfo: 'PCI-DSS Level 1 compliant infrastructure. We integrate Stripe, Plaid, and internal ledger databases using ACID-compliant transactions to ensure zero data-loss during high-volume financial ledger transfers.',
    features: ['Payment Gateway', 'Digital Wallet', 'KYC Integration', 'Transaction Analytics'],
    techStack: ['Stripe API', 'Plaid', 'Go', 'CockroachDB'],
    metrics: [{ label: 'Compliance', value: 'PCI-DSS L1' }, { label: 'Data Loss', value: '0%' }],
    gradient: 'linear-gradient(135deg, #0EA5E9, #38BDF8)',
    color: '#0EA5E9',
  },
  {
    icon: <Cpu size={28} />,
    title: 'Software Development',
    description: 'Robust desktop software for Windows and Linux — from utilities to enterprise-grade applications.',
    detailedInfo: 'Native binary compilation using Rust and C++ for ultimate performance. We integrate deeply with OS-level APIs for hardware acceleration, creating desktop software that executes heavy localized compute tasks effortlessly.',
    features: ['Windows Apps', 'Linux Apps', 'Cross-Platform', 'System Integration'],
    techStack: ['Rust', 'C++', 'Tauri', 'Qt'],
    metrics: [{ label: 'Memory', value: '< 50MB' }, { label: 'Thread Sync', value: 'Zero-lock' }],
    gradient: 'linear-gradient(135deg, #10B981, #34D399)',
    color: '#10B981',
  },
  {
    icon: <Share2 size={28} />,
    title: 'Social Media Management',
    description: 'Strategic social media marketing to boost your brand presence, engagement, and business growth.',
    detailedInfo: 'Data-driven brand engineering. We utilize sentiment analysis tools and programmatic ad-bidding APIs to dynamically allocate budget toward high-converting creatives, maximizing ROAS across Meta, TikTok, and LinkedIn networks.',
    features: ['Content Strategy', 'Brand Growth', 'Paid Campaigns', 'Analytics & Reports'],
    techStack: ['Meta API', 'TikTok Ads', 'Looker', 'Python'],
    metrics: [{ label: 'ROAS', value: '3.4x Avg' }, { label: 'Data Sync', value: 'Real-time' }],
    gradient: 'linear-gradient(135deg, #EC4899, #F472B6)',
    color: '#EC4899',
  },
  {
    icon: <Monitor size={28} />,
    title: 'Web Applications',
    description: 'Scalable full-stack web applications built with modern frameworks for complex business workflows.',
    detailedInfo: 'Deploying React and Next.js within containerized Kubernetes clusters. We architect micro-frontend scalable workflows backed by GraphQL APIs, ensuring your enterprise tools can handle thousands of concurrent transactions.',
    features: ['React / Next.js', 'Real-time Features', 'API Development', 'Cloud Deployment'],
    techStack: ['Node.js', 'GraphQL', 'Docker', 'Kubernetes'],
    metrics: [{ label: 'Throughput', value: '10k req/s' }, { label: 'Latency', value: '45ms' }],
    gradient: 'linear-gradient(135deg, #06B6D4, #22D3EE)',
    color: '#06B6D4',
  },
  {
    icon: <Smartphone size={28} />,
    title: 'Mobile App Development',
    description: 'Beautiful native and cross-platform applications for Android and iOS that users love.',
    detailedInfo: 'Developing fluid 60fps applications via Flutter and React Native. Our pipelines automate App Store & Play Store publishing (CI/CD) and integrate offline-first databases for seamless UX in low-connectivity areas.',
    features: ['Android Apps', 'iOS Apps', 'Flutter / React Native', 'App Store Launch'],
    techStack: ['Flutter', 'React Native', 'Swift', 'Kotlin'],
    metrics: [{ label: 'FPS', value: '60 steady' }, { label: 'Crash Rate', value: '< 0.01%' }],
    gradient: 'linear-gradient(135deg, #F43F5E, #FB7185)',
    color: '#F43F5E',
  },
  {
    icon: <Code2 size={28} />,
    title: 'Website Development',
    description: 'Custom responsive websites, landing pages, and e-commerce solutions that captivate visitors and drive conversions.',
    detailedInfo: 'We engineer high-performance web platforms utilizing server-side rendering (SSR) and edge caching. Our focus is on passing Core Web Vitals, maintaining sub-second load times, and ensuring absolute accessibility compliance (WCAG 2.1).',
    features: ['Custom Design', 'SEO Optimized', 'Fast Loading', 'CMS Integration'],
    techStack: ['React', 'Next.js', 'Tailwind', 'Vercel'],
    metrics: [{ label: 'LCP', value: '< 1.2s' }, { label: 'Availability', value: '99.99%' }],
    gradient: 'linear-gradient(135deg, #A855F7, #C084FC)',
    color: '#A855F7',
  }
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

const bladeVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 100, damping: 15 },
  },
}

export default function Services() {
  const [selectedService, setSelectedService] = useState<Service | null>(null)

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [selectedService])

  const handleNavClick = (href: string) => {
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) {
      const rect = el.getBoundingClientRect()
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const targetY = rect.top + scrollTop - 88
      window.scrollTo({
        top: targetY,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section className="services section" id="services">
      <div className="container">
        <motion.div
          className="services__header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">What We Do</span>
          <h2 className="section-title">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="section-subtitle">
            From concept to deployment — comprehensive, high-performance digital solutions architected for modern enterprise scale.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          className="services__bento"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service, i) => (
            <motion.div
              key={i}
              className="services__card"
              variants={bladeVariants}
              onClick={() => setSelectedService(service)}
              style={{ '--theme-color': service.color, '--theme-gradient': service.gradient } as React.CSSProperties}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
            >
              <div className="services__card-inner">
                <div className="services__card-top">
                  <div className="services__card-icon" style={{ background: service.gradient }}>
                    {React.cloneElement(service.icon as React.ReactElement<any>, { size: 22 })}
                  </div>
                  <div className="services__card-metrics">
                    {service.metrics.map((m, j) => (
                      <span key={j} className="metric-pill">
                        <span className="metric-label">{m.label}:</span> {m.value}
                      </span>
                    ))}
                  </div>
                </div>

                <h3 className="services__card-title">{service.title}</h3>
                <p className="services__card-desc">{service.description}</p>

                <div className="services__card-features">
                  {service.features.map((f, j) => (
                    <span className="services__feature-tag" key={j}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={service.color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                      {f}
                    </span>
                  ))}
                </div>

                <div className="services__card-footer">
                  <span className="services__learn-more">
                    View Technical Architecture 
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                  </span>
                </div>
              </div>
              <div className="services__card-glow"></div>
              <div className="services__card-border" style={{ background: service.gradient }}></div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Detailed Service Modal / Drawer */}
      {selectedService && createPortal(
        <div className="service-modal-overlay" onClick={() => setSelectedService(null)}>
          <motion.div
            className="service-modal-content glass-card"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            style={{ '--theme-color': selectedService.color, '--theme-gradient': selectedService.gradient } as React.CSSProperties}
          >
            <button className="service-modal-close" onClick={() => setSelectedService(null)} aria-label="Close modal">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>

            <div className="service-modal-header">
              <div className="services__card-icon" style={{ background: selectedService.gradient, width: 48, height: 48 }}>
                {React.cloneElement(selectedService.icon as React.ReactElement<any>, { size: 26 })}
              </div>
              <div>
                <span className="section-label" style={{ color: selectedService.color }}>Architecture Blueprint</span>
                <h3>{selectedService.title}</h3>
              </div>
            </div>

            <div className="service-modal-body">
              <div className="modal-section">
                <h4>System Overview & Deep-Dive</h4>
                <p className="detailed-info">{selectedService.detailedInfo}</p>
              </div>

              <div className="modal-grid">
                <div className="modal-section">
                  <h4>Core Technology Stack</h4>
                  <div className="stack-badges">
                    {selectedService.techStack.map((tech, j) => (
                      <span className="tech-badge" key={j}>{tech}</span>
                    ))}
                  </div>
                </div>

                <div className="modal-section">
                  <h4>Performance Benchmarks</h4>
                  <div className="modal-metrics">
                    {selectedService.metrics.map((m, j) => (
                      <div className="modal-metric-card" key={j}>
                        <span className="modal-metric-val" style={{ color: selectedService.color }}>{m.value}</span>
                        <span className="modal-metric-lbl">{m.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="service-modal-footer">
              <button
                className="btn btn-primary"
                onClick={() => {
                  setSelectedService(null)
                  handleNavClick('#contact')
                }}
              >
                Discuss This Architecture
              </button>
            </div>
          </motion.div>
        </div>,
        document.body
      )}
    </section>
  )
}
