import { useState, useRef, useEffect } from 'react'
import './BackgroundVideo.css'

// Placeholder videos representing your industries.
// IMPORTANT: Replace these URLs with your actual high-quality industry videos (.mp4 files hosted in your public/ directory or a CDN).
const INDUSTRY_VIDEOS: string[] = [
  '/videos/mining.mp4',
  '/videos/tech.mp4',
  '/videos/ai.mp4',
  '/videos/healthcare.mp4'
]

export default function BackgroundVideo() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleVideoEnded = () => {
    // Crossfade effect
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % INDUSTRY_VIDEOS.length)
      setIsTransitioning(false)
    }, 500) // Half a second fade
  }

  const handleVideoError = () => {
    console.warn(`Failed to load video at index ${currentVideoIndex}, skipping to next.`)
    setCurrentVideoIndex((prev) => (prev + 1) % INDUSTRY_VIDEOS.length)
  }

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(e => console.log('Autoplay prevented by browser', e))
    }
  }, [currentVideoIndex])

  if (INDUSTRY_VIDEOS.length === 0) {
    return null; // Fall back to CSS background if no videos are provided
  }

  return (
    <div className="background-video-container">
      {/* Dark overlay to ensure text remains readable */}
      <div className="background-video-overlay"></div>
      
      <video
        ref={videoRef}
        className={`background-video-player ${isTransitioning ? 'fade-out' : 'fade-in'}`}
        src={INDUSTRY_VIDEOS[currentVideoIndex]}
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnded}
        onError={handleVideoError}
      />
    </div>
  )
}
