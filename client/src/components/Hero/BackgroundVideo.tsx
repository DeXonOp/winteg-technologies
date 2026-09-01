import { useEffect, useRef, useState } from "react";
import "./BackgroundVideo.css";

// IMPORTANT: Ensure this matches the `phrases` array in Hero.tsx exactly 1-to-1!
const INDUSTRY_VIDEOS: string[] = [
  "/videos/Telemetrics.mp4",
  "/videos/gps-map.mp4",
  "/videos/artificial-intelligence.mp4",
  "/videos/facial-recognition.mp4",
  "/videos/office-meeting.mp4",
  "/videos/data-analytics-graph.mp4",
  "/videos/healthcare-management-systems.mp4",
  "/videos/stock market ticker.mp4",
  "/videos/blockchain network.mp4",
];

interface BackgroundVideoProps {
  currentIndex: number;
}

export default function BackgroundVideo({
  currentIndex,
}: BackgroundVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  // IntersectionObserver: Pause video playback when Hero section is out of viewport
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Manage video playback & smooth crossfading without main-thread jank
  useEffect(() => {
    if (!containerRef.current) return;
    const videos = Array.from(containerRef.current.querySelectorAll("video"));

    if (!isVisible) {
      // Pause all videos when hero is scrolled out of view to free up 100% CPU/GPU for smooth page scrolling
      videos.forEach((v) => v.pause());
      return;
    }

    const activeVideo = videos[currentIndex];
    if (!activeVideo) return;

    // Use requestAnimationFrame to defer play call to browser idle paint cycle
    const rafId = requestAnimationFrame(() => {
      // Play active video
      if (activeVideo.paused) {
        activeVideo.play().catch(() => {
          /* Autoplay fallback */
        });
      }

      // Pause inactive videos after crossfade completes (600ms)
      const pauseTimer = setTimeout(() => {
        videos.forEach((v, idx) => {
          if (idx !== currentIndex && !v.paused) {
            v.pause();
          }
        });
      }, 600);

      return () => clearTimeout(pauseTimer);
    });

    return () => cancelAnimationFrame(rafId);
  }, [currentIndex, isVisible]);

  if (INDUSTRY_VIDEOS.length === 0) {
    return null;
  }

  return (
    <div className="background-video-container" ref={containerRef}>
      {/* Dark overlay to ensure text remains readable */}
      <div className="background-video-overlay"></div>

      {INDUSTRY_VIDEOS.map((src, index) => (
        <video
          key={src}
          className={`background-video-player ${currentIndex === index ? "fade-in" : "fade-out"}`}
          src={src}
          muted
          playsInline
          loop
          preload={index < 3 ? "auto" : "metadata"}
          controlsList="nodownload nofullscreen noremoteplayback"
          disablePictureInPicture
          disableRemotePlayback
          data-no-idm="true"
          data-idm-members="none"
          aria-hidden="true"
          tabIndex={-1}
          onContextMenu={(e) => e.preventDefault()}
        />
      ))}
    </div>
  );
}
