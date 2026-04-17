import { useState, useEffect } from "react";

interface LiveCountdownTimerProps {
  targetDate: string | Date;
  compact?: boolean;
}

export const LiveCountdownTimer = ({ targetDate, compact = false }: LiveCountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  function calculateTimeLeft(target: string | Date) {
    const difference = +new Date(target) - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    return timeLeft;
  }

  // If time is up, show a specific message
  if (timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0) {
    return (
      <div className={`font-mono font-bold text-[#DC2626] ${compact ? 'text-xs' : 'text-lg'}`}>
        Booking Closed
      </div>
    );
  }

  if (compact) {
    return (
      <div className="flex items-center gap-1.5 text-xs text-white bg-[#1E293B] px-3 py-1.5 rounded-lg border border-white/10 shrink-0">
        <span className="text-[#94A3B8]">Booking closes in</span>
        <span className="font-bold text-[#F59E0B] tracking-wide">
          {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {Object.entries(timeLeft).map(([unit, value], idx) => (
        <div key={unit} className="flex items-center">
          <div className="flex flex-col items-center justify-center w-14 h-16 bg-[#1E293B] rounded-lg shadow-inner border border-white/5">
            <span className="text-white font-bold text-2xl leading-none">{value.toString().padStart(2, '0')}</span>
            <span className="text-[#94A3B8] text-[10px] uppercase font-semibold mt-1 tracking-wider">{unit}</span>
          </div>
          {idx < 3 && <div className="text-[#94A3B8] font-bold text-xl px-1.5 pb-2">:</div>}
        </div>
      ))}
    </div>
  );
};
