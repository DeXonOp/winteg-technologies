import { useEffect, useRef, useState } from 'react';
import './BackgroundVideo.css'

// IMPORTANT: Ensure this matches the `phrases` array in Hero.tsx exactly 1-to-1!
const INDUSTRY_VIDEOS: string[] = [
  '/videos/Telemetrics.mp4',
  '/videos/gps-map.mp4',
  '/videos/artificial-intelligence.mp4',
  '/videos/facial-recognition.mp4',
  '/videos/office-meeting.mp4',
  '/videos/data-analytics-graph.mp4',
  '/videos/doctor-tablet.mp4',
  '/videos/healthcare-management-systems.mp4',
  '/videos/stock market ticker.mp4',
  '/videos/blockchain network.mp4'
]

interface BackgroundVideoProps {
  currentIndex: number;
}

export default function BackgroundVideo({ currentIndex }: BackgroundVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // Initially preload the first two videos
  const [preloadedIndexes, setPreloadedIndexes] = useState<Set<number>>(new Set([0, 1]));

  useEffect(() => {
    // 2.5 seconds AFTER a slide changes, silently preload the NEXT video in line.
    // This staggers network allocation so it doesn't freeze the main thread during the CSS transition!
    const timer = setTimeout(() => {
      const nextIndex = (currentIndex + 2) % INDUSTRY_VIDEOS.length;
      setPreloadedIndexes(prev => {
        if (prev.has(nextIndex)) return prev;
        const newSet = new Set(prev);
        newSet.add(nextIndex);
        return newSet;
      });
    }, 2500);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  useEffect(() => {
    if (!containerRef.current) return;
    const videos = containerRef.current.querySelectorAll('video');
    
    videos.forEach((video, index) => {
      if (index === currentIndex) {
        // Just play without seeking to 0, as seeking blocks the main thread and causes micro-stutters
        video.play().catch(e => console.error("Video play blocked:", e));
      } else {
        // Pause inactive videos to save CPU/GPU, but delay by 1.2s so the CSS crossfade can finish smoothly!
        setTimeout(() => {
          video.pause();
        }, 1200);
      }
    });
  }, [currentIndex]);

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
          className={`background-video-player ${currentIndex === index ? 'fade-in' : 'fade-out'}`}
          src={src}
          muted
          playsInline
          loop
          preload={preloadedIndexes.has(index) ? "auto" : "none"}
          controlsList="nodownload nofullscreen noremoteplayback"
          disablePictureInPicture
          disableRemotePlayback
          // Prevent IDM and other extensions from showing download popups
          onContextMenu={(e) => e.preventDefault()}
        />
      ))}
    </div>
  )
}
