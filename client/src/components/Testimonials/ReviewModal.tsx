import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './ReviewModal.css'

interface ReviewModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export default function ReviewModal({ isOpen, onClose, onSuccess }: ReviewModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    text: '',
    rating: 5,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    try {
      const apiUrl = import.meta.env.PROD
        ? 'https://api.wintegtechnologies.com/api/reviews'
        : '/api/reviews'

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to submit review. Please try again.')
      }

      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
        setFormData({ name: '', email: '', text: '', rating: 5 })
        onSuccess()
      }, 2000)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="review-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            <motion.div
              className="review-modal"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
            <button className="review-modal-close" onClick={onClose}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <h2>Leave a Review</h2>
            <p>Share your experience with Winteg Technologies.</p>

            {success ? (
              <div className="review-modal-success">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--clr-accent-green)" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <h3>Thank You!</h3>
                <p>Your review has been submitted successfully.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="review-modal-form">
                {error && <div className="review-modal-error">{error}</div>}
                
                <div className="form-group">
                  <label>Name / Company Name</label>
                  <input
                    type="text"
                    required
                    minLength={2}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Name"
                  />
                </div>

                <div className="form-group">
                  <label>Email <span>(Will not be published)</span></label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com / company@example.com"
                  />
                </div>

                <div className="form-group">
                  <label>Rating</label>
                  <div className="rating-select">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        className={`star-btn ${formData.rating >= star ? 'active' : ''}`}
                        onClick={() => setFormData({ ...formData, rating: star })}
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label>Your Review</label>
                  <textarea
                    required
                    minLength={10}
                    rows={4}
                    value={formData.text}
                    onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                    placeholder="Tell us about your project..."
                  />
                </div>

                <button type="submit" className="btn btn-primary submit-btn" disabled={loading}>
                  {loading ? 'Submitting...' : 'Submit Review'}
                </button>
              </form>
            )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
