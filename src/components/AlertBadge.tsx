import { Flame, Key, ShieldCheck, Clock } from "lucide-react";

export type AlertBadgeType = 'seats-filling' | 'exclusive' | 'ilp' | 'day-trip';

interface AlertBadgeProps {
  type: AlertBadgeType;
  seatsLeft?: number;
  className?: string;
}

export const AlertBadge = ({ type, seatsLeft, className = "" }: AlertBadgeProps) => {
  switch (type) {
    case 'seats-filling':
      return (
        <div className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-white font-semibold text-xs tracking-wider animate-pulse transition-all ${className}`} style={{ background: "linear-gradient(135deg, #F59E0B, #D97706)" }}>
          <Flame className="w-4 h-4 fill-white" />
          ⚡ Seats Filling Fast — Only {seatsLeft || 3} Spots Left
        </div>
      );
    case 'exclusive':
      return (
        <div className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-[#F59E0B] bg-[#1E3A5F] font-semibold text-xs tracking-wider ${className}`}>
          <Key className="w-4 h-4 text-[#F59E0B]" />
          ✦ Exclusive Access — Limited Season
        </div>
      );
    case 'ilp':
      return (
        <div className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-white font-semibold text-xs tracking-wider ${className}`} style={{ background: "linear-gradient(135deg, #065F46, #047857)" }}>
          <ShieldCheck className="w-4 h-4 text-white" />
          🛡 Inner Line Permit Included — Indian Nationals Only
        </div>
      );
    case 'day-trip':
      return (
        <div className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-white font-semibold text-xs tracking-wider ${className}`} style={{ background: "linear-gradient(135deg, #DC2626, #B91C1C)" }}>
          <Clock className="w-4 h-4 text-white" />
          ⏰ Day Trip — 9 AM to 5 PM Only
        </div>
      );
    default:
      return null;
  }
};
