import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, X } from 'lucide-react'
import './NotificationBanner.css'

interface NotificationBannerProps {
  isVisible: boolean
  title?: string
  message?: string
  onClose: () => void
  duration?: number
}

export default function NotificationBanner({
  isVisible,
  title = "Message Sent Successfully!",
  message = "Thank you for reaching out. Our team will review your inquiry and get back to you shortly.",
  onClose,
  duration = 5000
}: NotificationBannerProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [isVisible, duration, onClose])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="notification-banner"
          initial={{ opacity: 0, x: 120, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 120, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
        >
          <div className="notification-banner__glow"></div>
          
          <div className="notification-banner__icon">
            <CheckCircle2 size={22} />
          </div>

          <div className="notification-banner__content">
            <h4 className="notification-banner__title">{title}</h4>
            <p className="notification-banner__message">{message}</p>
          </div>

          <button 
            className="notification-banner__close" 
            onClick={onClose}
            aria-label="Close notification"
          >
            <X size={18} />
          </button>

          <motion.div 
            className="notification-banner__progress"
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: duration / 1000, ease: "linear" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
