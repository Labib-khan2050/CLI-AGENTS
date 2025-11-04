'use client';

import { useRef, useEffect, useState } from 'react';

interface DotLoaderProps {
  frames: number[][];
  dotClassName?: string;
  isPlaying?: boolean;
  duration?: number;
  repeatCount?: number;
  onComplete?: () => void;
  className?: string;
}

export default function DotLoader({
  frames,
  dotClassName = '',
  isPlaying = true,
  duration = 100,
  repeatCount = -1,
  onComplete,
  className = ''
}: DotLoaderProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [repeats, setRepeats] = useState(0);

  const applyFrameToDots = (dots: HTMLDivElement[], frameIndex: number) => {
    const frame = frames[frameIndex];
    if (!frame) return;

    dots.forEach((dot, index) => {
      dot.classList.toggle('active', frame.includes(index));
    });
  };

  useEffect(() => {
    setCurrentIndex(0);
    setRepeats(0);
  }, [frames]);

  useEffect(() => {
    if (!isPlaying || !gridRef.current || !frames) return;

    if (currentIndex >= frames.length) {
      setCurrentIndex(0);
    }

    const dotElements = gridRef.current.children;
    if (!dotElements) return;

    const dots = Array.from(dotElements) as HTMLDivElement[];
    
    const intervalId = setInterval(() => {
      applyFrameToDots(dots, currentIndex);
      
      if (currentIndex + 1 >= frames.length) {
        if (repeatCount !== -1 && repeats + 1 >= repeatCount) {
          clearInterval(intervalId);
          onComplete?.();
          return;
        }
        setRepeats(prev => prev + 1);
      }
      
      setCurrentIndex(prev => (prev + 1) % frames.length);
    }, duration);

    return () => clearInterval(intervalId);
  }, [frames, isPlaying, duration, repeatCount, onComplete, currentIndex, repeats]);

  return (
    <div ref={gridRef} className={`grid w-fit grid-cols-7 gap-0.5 ${className}`}>
      {Array.from({ length: 49 }).map((_, i) => (
        <div key={i} className={`h-1.5 w-1.5 rounded-sm ${dotClassName}`} />
      ))}
    </div>
  );
}
