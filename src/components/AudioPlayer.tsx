import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause } from 'lucide-react';

interface AudioPlayerProps {
  src: string;
  title: string;
  subtitle?: string;
}

// Pre-generated bar heights for consistent look
const BAR_HEIGHTS = [
  0.3, 0.5, 0.7, 0.4, 0.8, 0.6, 0.9, 0.5, 0.7, 0.3,
  0.6, 0.8, 0.4, 0.7, 0.5, 0.9, 0.6, 0.3, 0.8, 0.5,
  0.7, 0.4, 0.6, 0.9, 0.5, 0.3, 0.7, 0.8, 0.4, 0.6,
  0.5, 0.8, 0.3, 0.7, 0.6, 0.4, 0.9, 0.5, 0.7, 0.3,
  0.6, 0.8, 0.5, 0.4, 0.7, 0.9, 0.3, 0.6, 0.5, 0.8,
];

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function AudioPlayer({ src, title, subtitle }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const animationRef = useRef<number>();

  const updateProgress = useCallback(() => {
    const audio = audioRef.current;
    if (audio && audio.duration) {
      setProgress(audio.currentTime / audio.duration);
      setCurrentTime(audio.currentTime);
    }
    if (isPlaying) {
      animationRef.current = requestAnimationFrame(updateProgress);
    }
  }, [isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      animationRef.current = requestAnimationFrame(updateProgress);
    }
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying, updateProgress]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    audio.currentTime = pct * audio.duration;
    setProgress(pct);
    setCurrentTime(audio.currentTime);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  return (
    <div className="rounded-xl overflow-hidden border border-white/10 bg-[#1a1a2e] p-5">
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onEnded={handleEnded}
        onLoadedMetadata={handleLoadedMetadata}
      />

      {/* Title row */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={togglePlay}
          className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center flex-shrink-0 hover:from-primary-400 hover:to-primary-500 transition-all duration-200 shadow-lg shadow-primary-500/25"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 text-white" fill="white" />
          ) : (
            <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
          )}
        </button>
        <div className="flex-1 min-w-0">
          <h6 className="text-white font-medium text-sm truncate">{title}</h6>
          {subtitle && <p className="text-xs text-gray-400 truncate">{subtitle}</p>}
        </div>
        <div className="text-xs text-gray-500 flex-shrink-0 tabular-nums">
          {formatTime(currentTime)} / {duration ? formatTime(duration) : '0:00'}
        </div>
      </div>

      {/* Waveform bars */}
      <div
        className="flex items-end gap-[2px] h-12 cursor-pointer group"
        onClick={handleBarClick}
      >
        {BAR_HEIGHTS.map((h, i) => {
          const barProgress = i / BAR_HEIGHTS.length;
          const isPast = barProgress < progress;
          return (
            <div
              key={i}
              className="flex-1 rounded-full transition-colors duration-150"
              style={{
                height: `${h * 100}%`,
                backgroundColor: isPast
                  ? 'rgba(139, 92, 246, 0.9)'
                  : 'rgba(255, 255, 255, 0.12)',
                animation: isPlaying && isPast
                  ? `waveform-pulse ${0.4 + (i % 5) * 0.1}s ease-in-out infinite alternate`
                  : 'none',
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
