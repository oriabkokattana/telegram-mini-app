import { useEffect, useState } from 'react';
import { useThemeStore } from '@/store/theme-store';

interface CircularTimer {
  interval: number;
  onComplete(): void;
}

const CircularTimer = ({ interval, onComplete }: CircularTimer) => {
  const [timeLeft, setTimeLeft] = useState(interval);
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => window.clearInterval(timer);
    } else {
      onComplete();
    }
  }, [timeLeft]);

  const radius = 20; // Adjusted for a 48x48px viewbox
  const circumference = 2 * Math.PI * radius;
  const progress = ((interval - timeLeft) / (interval - 1)) * circumference;

  return (
    <svg width='48' height='48' viewBox='0 0 48 48'>
      {/* Background Circle */}
      <circle
        cx='24'
        cy='24'
        r={radius}
        stroke={theme === 'dark' ? '#221D2E' : 'rgba(117, 120, 139, 0.10)'}
        strokeWidth='4'
        fill='none'
      />
      {/* Progress Circle */}
      <circle
        cx='24'
        cy='24'
        r={radius}
        stroke='#583BE8'
        strokeWidth='4'
        fill='none'
        strokeDasharray={circumference}
        strokeDashoffset={circumference - progress}
        strokeLinecap='round'
        style={{ transition: 'stroke-dashoffset 1s linear' }}
        transform='rotate(-90 24 24)' // Rotate to start from the top
      />
      {/* Timer Text */}
      <text
        x='50%'
        y='50%'
        fill='var(--brown-a11)'
        textAnchor='middle'
        dy='.3em'
        fontSize='12px'
        fontFamily='var(--default-font-family)'
        letterSpacing='var(--letter-spacing-1)'
        fontWeight='var(--font-weight-bold)'
      >
        {timeLeft}
      </text>
    </svg>
  );
};

export default CircularTimer;
