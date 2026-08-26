import React, { useState } from 'react'
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
    icon: <Code2 size={28} />,
    title: 'Website Development',
    description: 'Custom responsive websites, landing pages, and e-commerce solutions that captivate visitors and drive conversions.',
    detailedInfo: 'We engineer high-performance web platforms utilizing server-side rendering (SSR) and edge caching. Our focus is on passing Core Web Vitals, maintaining sub-second load times, and ensuring absolute accessibility compliance (WCAG 2.1).',
    features: ['Custom Design', 'SEO Optimized', 'Fast Loading', 'CMS Integration'],
    techStack: ['React', 'Next.js', 'Tailwind', 'Vercel'],
    metrics: [{ label: 'LCP', value: '< 1.2s' }, { label: 'Availability', value: '99.99%' }],
    gradient: 'linear-gradient(135deg, #A855F7, #C084FC)',
    color: '#A855F7',
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
    size: 'large',
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
    icon: <Brain size={28} />,
    title: 'AI-Powered Solutions',
    description: 'Intelligent automation, chatbots, and machine learning models to supercharge your operations.',
    detailedInfo: 'Custom LLM fine-tuning and RAG (Retrieval-Augmented Generation) architectures. We plug proprietary data into Hugging Face and OpenAI frameworks to build autonomous agents capable of complex reasoning and internal process execution.',
    features: ['Custom Chatbots', 'ML Models', 'Data Analytics', 'Process Automation'],
    techStack: ['Python', 'PyTorch', 'OpenAI', 'LangChain'],
    metrics: [{ label: 'Inference', value: '< 200ms' }, { label: 'Accuracy', value: '98.4%' }],
    gradient: 'linear-gradient(135deg, #F59E0B, #FBBF24)',
    color: '#F59E0B',
    size: 'large',
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
    icon: <Share2 size={28} />,
    title: 'Social Media Management',
    description: 'Strategic social media marketing to boost your brand presence, engagement, and business growth.',
    detailedInfo: 'Data-driven brand engineering. We utilize sentiment analysis tools and programmatic ad-bidding APIs to dynamically allocate budget toward high-converting creatives, maximizing ROAS across Meta, TikTok, and LinkedIn networks.',
    features: ['Content Strategy', 'Brand Growth', 'Paid Campaigns', 'Analytics & Reports'],
    techStack: ['Meta API', 'TikTok Ads', 'Looker', 'Python'],
    metrics: [{ label: 'ROAS', value: '3.4x Avg' }, { label: 'Data Sync', value: 'Real-time' }],
    gradient: 'linear-gradient(135deg, #EC4899, #F472B6)',
    color: '#EC4899',
    size: 'large',
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
    icon: <Activity size={28} />,
    title: 'Telemetrics & IoT Monitoring',
    description: 'Advanced telemetry data collection, real-time sensor monitoring, and IoT device management systems.',
    detailedInfo: 'Ingesting heavy MQTT traffic streams from remote hardware sensors into Time-Series databases (InfluxDB). We provide visual dashboards capable of predictive maintenance alerts via anomaly detection algorithms.',
    features: ['Real-time Dashboards', 'Sensor Integration', 'Predictive Maintenance', 'Data Pipelines'],
    techStack: ['MQTT', 'InfluxDB', 'Grafana', 'Kafka'],
    metrics: [{ label: 'Ingestion', value: '10GB/hr' }, { label: 'Uptime', value: '99.999%' }],
    gradient: 'linear-gradient(135deg, #EAB308, #FACC15)',
    color: '#EAB308',
    size: 'large',
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
    size: 'large',
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
    size: 'large',
  },
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

const drawerVariants: Variants = {
  closed: {
    z: 0,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 60, damping: 14 }
  },
  open: {
    z: 200,
    y: 120,
    rotateX: -55,
    scale: 1,
    boxShadow: "0 50px 100px rgba(0,0,0,0.8)",
    transition: { type: 'spring' as const, stiffness: 45, damping: 12 }
  }
}

export default function Services() {
  const [selectedId, setSelectedId] = useState<number | null>(null)

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
            From concept to deployment — comprehensive digital solutions running
            on our high-performance infrastructure.
          </p>
        </motion.div>

        {/* Server Rack Chassis */}
        <div className="server-rack">
          <div className="rack-rail rack-rail--left"></div>
          <div className="rack-rail rack-rail--right"></div>
          
          <motion.div
            className="services__bento"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {services.map((service, i) => (
              <ServerBlade
                key={i}
                index={i}
                service={service}
                isSelected={selectedId === i}
                onMouseEnter={() => setSelectedId(i)}
                onMouseLeave={() => setSelectedId(null)}
                onClick={() => setSelectedId(selectedId === i ? null : i)}
              />
            ))}
          </motion.div>
        </div>
      </div>

    </section>
  )
}

function ServerBlade({
  service,
  index,
  isSelected,
  onClick,
  onMouseEnter,
  onMouseLeave
}: {
  service: Service;
  index: number;
  isSelected: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  return (
    <motion.div 
      className={`services__card ${isSelected ? 'is-active' : ''}`}
      custom={index}
      variants={bladeVariants}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ cursor: 'pointer' }}
    >
      {/* The Slot Interior (Dark hole left behind in the rack) */}
      <div className="slot-interior"></div>

      {/* The 3D Sliding Drawer */}
      <motion.div
        className="drawer-chassis"
        variants={drawerVariants}
        initial="closed"
        animate={isSelected ? "open" : "closed"}
      >
        {/* TOP FACE (The Internal Motherboard) */}
        <div 
          className="drawer-motherboard"
          style={{ '--theme-color': service.color, '--theme-gradient': service.gradient } as React.CSSProperties}
        >
          <div className="motherboard-content">
            <div className="drawer-header-action">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div className="services__card-icon" style={{ background: service.gradient, width: 32, height: 32, marginBottom: 0 }}>
                  {React.cloneElement(service.icon as React.ReactElement<any>, { size: 18 })}
                </div>
                <h4>{service.title}</h4>
              </div>
              <button 
                className="drawer-close-btn" 
                onClick={(e) => {
                  e.stopPropagation();
                  onClick();
                }}
              >
                Close Drawer
              </button>
            </div>
            <div className="drawer-details">
              <p className="detailed-info">{service.detailedInfo}</p>
            </div>
            <div className="drawer-sidebar">
              <div className="hardware-stats">
                {service.metrics.map((m, j) => (
                  <div className="stat" key={j}>
                    <span>{m.label}:</span> {m.value}
                  </div>
                ))}
              </div>
              <div className="tech-stack-container">
                <span className="stack-label">CORE STACK:</span>
                <div className="stack-badges">
                  {service.techStack.map((tech, j) => (
                    <span className="tech-badge" key={j}>{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Circuit traces for the motherboard floor */}
          <svg className="motherboard-traces" xmlns="http://www.w3.org/2000/svg">
            <path d="M 0 20 L 50 20 L 100 80 L 400 80" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2"/>
            <path d="M 50 150 L 100 100 L 500 100" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2"/>
          </svg>
        </div>

        {/* FRONT FACE (The Normal Blade Faceplate) */}
        <div className="drawer-faceplate">
          <div className="server-blade__panel">
            <div className="server-blade__label">SYS_0{index + 1}</div>
            
            <div className="services__card-icon" style={{ background: service.gradient, marginRight: '16px' }}>
              {React.cloneElement(service.icon as React.ReactElement<any>, { size: 18 })}
            </div>

            <div 
              className="server-blade__handle" 
              title={isSelected ? "Push drawer in" : "Pull drawer out"}
            >
              <div className="handle-grip"></div>
            </div>
            <div className="server-blade__leds">
              <div className="led led--pwr"></div>
              <div className="led led--net"></div>
              <div className="led led--disk"></div>
            </div>
            <div className="server-blade__ports">
              <div className="port"></div>
              <div className="port"></div>
            </div>
            <div className="server-blade__grill">
              <span></span><span></span><span></span><span></span><span></span><span></span>
            </div>
          </div>

          <div className="server-blade__content">
            <div className="data-stream data-stream-1"></div>
            <div className="data-stream data-stream-2"></div>
            
            <h3 className="services__card-title">{service.title}</h3>
            <p className="services__card-desc">{service.description}</p>

            <div className="services__card-features">
              {service.features.map((f, j) => (
                <span className="services__feature-tag" key={j}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--clr-primary)" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                  {f}
                </span>
              ))}
            </div>
          </div>
          
          <div className="services__card-glow" style={{ background: service.gradient }}></div>
          <div className="services__card-border" style={{ background: service.gradient }}></div>
        </div>

      </motion.div>
    </motion.div>
  )
}
