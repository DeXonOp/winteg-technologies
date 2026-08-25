import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, type Variants } from 'framer-motion'
import {
  Code2, Monitor, Cpu, Brain, Smartphone, Share2,
  MapPin, Activity, Camera, Building2, HeartPulse, CreditCard
} from 'lucide-react'
import './Services.css'

interface Service {
  icon: React.ReactNode
  title: string
  description: string
  features: string[]
  gradient: string
  size?: 'large' | 'normal'
}

const services: Service[] = [
  {
    icon: <Code2 size={28} />,
    title: 'Website Development',
    description: 'Custom responsive websites, landing pages, and e-commerce solutions that captivate visitors and drive conversions.',
    features: ['Custom Design', 'SEO Optimized', 'Fast Loading', 'CMS Integration'],
    gradient: 'linear-gradient(135deg, #A855F7, #C084FC)',
  },
  {
    icon: <Monitor size={28} />,
    title: 'Web Applications',
    description: 'Scalable full-stack web applications built with modern frameworks for complex business workflows.',
    features: ['React / Next.js', 'Real-time Features', 'API Development', 'Cloud Deployment'],
    gradient: 'linear-gradient(135deg, #06B6D4, #22D3EE)',
    size: 'large',
  },
  {
    icon: <Cpu size={28} />,
    title: 'Software Development',
    description: 'Robust desktop software for Windows and Linux — from utilities to enterprise-grade applications.',
    features: ['Windows Apps', 'Linux Apps', 'Cross-Platform', 'System Integration'],
    gradient: 'linear-gradient(135deg, #10B981, #34D399)',
  },
  {
    icon: <Brain size={28} />,
    title: 'AI-Powered Solutions',
    description: 'Intelligent automation, chatbots, and machine learning models to supercharge your operations.',
    features: ['Custom Chatbots', 'ML Models', 'Data Analytics', 'Process Automation'],
    gradient: 'linear-gradient(135deg, #F59E0B, #FBBF24)',
    size: 'large',
  },
  {
    icon: <Smartphone size={28} />,
    title: 'Mobile App Development',
    description: 'Beautiful native and cross-platform applications for Android and iOS that users love.',
    features: ['Android Apps', 'iOS Apps', 'Flutter / React Native', 'App Store Launch'],
    gradient: 'linear-gradient(135deg, #F43F5E, #FB7185)',
  },
  {
    icon: <Share2 size={28} />,
    title: 'Social Media Management',
    description: 'Strategic social media marketing to boost your brand presence, engagement, and business growth.',
    features: ['Content Strategy', 'Brand Growth', 'Paid Campaigns', 'Analytics & Reports'],
    gradient: 'linear-gradient(135deg, #EC4899, #F472B6)',
    size: 'large',
  },
  {
    icon: <MapPin size={28} />,
    title: 'GPS Integration & Tracking',
    description: 'Real-time GPS tracking systems for fleet management, asset monitoring, and location-based services.',
    features: ['Fleet Tracking', 'Geofencing', 'Route Optimization', 'Live Maps'],
    gradient: 'linear-gradient(135deg, #14B8A6, #2DD4BF)',
  },
  {
    icon: <Activity size={28} />,
    title: 'Telemetrics & IoT Monitoring',
    description: 'Advanced telemetry data collection, real-time sensor monitoring, and IoT device management systems.',
    features: ['Real-time Dashboards', 'Sensor Integration', 'Predictive Maintenance', 'Data Pipelines'],
    gradient: 'linear-gradient(135deg, #EAB308, #FACC15)',
    size: 'large',
  },
  {
    icon: <Camera size={28} />,
    title: 'AI Camera & Computer Vision',
    description: 'Cutting-edge computer vision for smart surveillance, quality inspection, and automated visual analysis.',
    features: ['Object Detection', 'Facial Recognition', 'Behavior Analysis', 'Edge AI'],
    gradient: 'linear-gradient(135deg, #06B6D4, #67E8F9)',
  },
  {
    icon: <Building2 size={28} />,
    title: 'ERP & CRM Systems',
    description: 'Enterprise resource planning and customer relationship management tailored to your business workflows.',
    features: ['Inventory Mgmt', 'Sales Pipeline', 'HR Module', 'Custom Workflows'],
    gradient: 'linear-gradient(135deg, #8B5CF6, #A78BFA)',
    size: 'large',
  },
  {
    icon: <HeartPulse size={28} />,
    title: 'Healthcare Management Systems',
    description: 'Digital healthcare platforms for hospitals, clinics, and telemedicine with patient management and EMR.',
    features: ['Patient Records', 'Appointment System', 'Telemedicine', 'Pharmacy Mgmt'],
    gradient: 'linear-gradient(135deg, #EF4444, #F87171)',
  },
  {
    icon: <CreditCard size={28} />,
    title: 'Fintech & Payment Solutions',
    description: 'Secure financial technology solutions including payment gateways, digital wallets, and banking integrations.',
    features: ['Payment Gateway', 'Digital Wallet', 'KYC Integration', 'Transaction Analytics'],
    gradient: 'linear-gradient(135deg, #0EA5E9, #38BDF8)',
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

// Server blade animation: slide in horizontally from alternating sides
const bladeVariants: Variants = {
  hidden: (custom: number) => ({
    opacity: 0,
    x: custom % 2 === 0 ? 120 : -120,
    scale: 0.95,
  }),
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 60, damping: 12 },
  },
}

function ServerBlade({
  children,
  className,
  gradient,
  index
}: {
  children: React.ReactNode;
  className: string;
  gradient: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Subtle tilt to emphasize the 3D hardware feel
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), { stiffness: 400, damping: 40 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-4, 4]), { stiffness: 400, damping: 40 })

  function handleMouse(e: React.MouseEvent) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  function handleLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      custom={index}
      variants={bladeVariants}
      whileHover={{ scale: 1.02, zIndex: 10, transition: { duration: 0.2 } }}
    >
      {/* Hardware UI: Server Panel on the left edge */}
      <div className="server-blade__panel">
        <div className="server-blade__handle">
          <div className="handle-grip"></div>
        </div>
        <div className="server-blade__leds">
          <div className="led led--pwr" title="Power"></div>
          <div className="led led--net" title="Network"></div>
          <div className="led led--disk" title="Disk Activity"></div>
        </div>
        <div className="server-blade__grill">
          <span></span><span></span><span></span><span></span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="server-blade__content">
        {children}
      </div>

      <div className="services__card-glow" style={{ background: gradient }}></div>
      <div className="services__card-border" style={{ background: gradient }}></div>
    </motion.div>
  )
}

export default function Services() {
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
                className={`services__card glass-card ${service.size === 'large' ? 'services__card--large' : ''}`}
                gradient={service.gradient}
              >
                <div className="services__card-icon" style={{ background: service.gradient }}>
                  {service.icon}
                </div>
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
              </ServerBlade>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
